import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from 'lib'
import { refundCredits } from 'lib'
import { prisma } from 'db'

/**
 * POST /api/github/webhook
 * Handle GitHub webhook events
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-hub-signature-256')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature header' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(body, signature)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    const event = JSON.parse(body)
    const eventType = request.headers.get('x-github-event')

    console.log(`Received GitHub webhook: ${eventType}`)

    // Handle pull_request events
    if (eventType === 'pull_request') {
      const { action, pull_request } = event

      // Find task by PR URL
      const task = await prisma.task.findFirst({
        where: { githubPrUrl: pull_request.html_url },
        include: {
          project: true,
        },
      })

      if (task) {
        switch (action) {
          case 'opened':
            // Update task status to in_progress
            await prisma.task.update({
              where: { id: task.id },
              data: { status: 'in_progress' },
            })

            await prisma.notification.create({
              data: {
                userId: task.project.ownerId,
                kind: 'task_started',
                payload: {
                  taskId: task.id,
                  taskTitle: task.title,
                  prUrl: pull_request.html_url,
                },
              },
            })
            break

          case 'ready_for_review':
          case 'review_requested':
            // Update task status to awaiting_review
            await prisma.task.update({
              where: { id: task.id },
              data: { status: 'awaiting_review' },
            })

            await prisma.notification.create({
              data: {
                userId: task.project.ownerId,
                kind: 'task_review_requested',
                payload: {
                  taskId: task.id,
                  taskTitle: task.title,
                  prUrl: pull_request.html_url,
                },
              },
            })
            break

          case 'closed':
            if (pull_request.merged) {
              // PR was merged - task is done
              await prisma.task.update({
                where: { id: task.id },
                data: { status: 'done' },
              })

              await prisma.notification.create({
                data: {
                  userId: task.project.ownerId,
                  kind: 'task_completed',
                  payload: {
                    taskId: task.id,
                    taskTitle: task.title,
                    cost: task.reservedCredits,
                  },
                },
              })
            } else {
              // PR was closed without merging - cancel task and refund
              if (task.reservedCredits > 0) {
                await refundCredits(
                  task.project.ownerId,
                  task.reservedCredits,
                  'task_pr_closed',
                  task.id
                )
              }

              await prisma.task.update({
                where: { id: task.id },
                data: {
                  status: 'canceled',
                  reservedCredits: 0,
                },
              })

              await prisma.notification.create({
                data: {
                  userId: task.project.ownerId,
                  kind: 'task_canceled',
                  payload: {
                    taskId: task.id,
                    taskTitle: task.title,
                    refundedCredits: task.reservedCredits,
                    reason: 'PR closed without merging',
                  },
                },
              })
            }
            break
        }
      } else {
        // Check if this is an MVP PR
        const aiRun = await prisma.aIRun.findFirst({
          where: { prUrl: pull_request.html_url },
          include: {
            project: true,
          },
        })

        if (aiRun && action === 'closed' && pull_request.merged) {
          // MVP PR merged - update project status
          await prisma.project.update({
            where: { id: aiRun.projectId },
            data: { status: 'active' },
          })

          await prisma.notification.create({
            data: {
              userId: aiRun.project.ownerId,
              kind: 'mvp_merged',
              payload: {
                projectId: aiRun.projectId,
                projectName: aiRun.project.name,
                prUrl: pull_request.html_url,
              },
            },
          })
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('GitHub webhook error:', error)
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
