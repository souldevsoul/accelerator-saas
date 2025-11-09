import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent, CREDIT_PACKAGES } from 'lib'
import { addCredits } from 'lib'
import { prisma } from 'db'

/**
 * POST /api/stripe/webhook
 * Handle Stripe webhook events
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    // Verify webhook signature and construct event
    const event = constructWebhookEvent(body, signature)

    console.log(`Received Stripe webhook: ${event.type}`)

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object

        // Get metadata
        const userId = session.metadata?.userId
        const credits = session.metadata?.credits
        const packageKey = session.metadata?.packageKey

        if (!userId || !credits) {
          console.error('Missing userId or credits in session metadata')
          return NextResponse.json({ error: 'Invalid metadata' }, { status: 400 })
        }

        // Verify user exists
        const user = await prisma.user.findUnique({
          where: { id: userId },
        })

        if (!user) {
          console.error(`User not found: ${userId}`)
          return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // Add credits to user's wallet
        await addCredits(
          userId,
          parseInt(credits),
          'stripe_payment',
          session.id
        )

        // Create notification
        await prisma.notification.create({
          data: {
            userId,
            kind: 'credits_purchased',
            payload: {
              credits: parseInt(credits),
              amount: session.amount_total,
              currency: session.currency,
              packageKey,
            },
          },
        })

        console.log(`Added ${credits} credits to user ${userId}`)
        break
      }

      case 'invoice.paid': {
        // Handle subscription payments if you add subscriptions later
        console.log('Invoice paid:', event.data.object.id)
        break
      }

      case 'invoice.payment_failed': {
        // Handle failed payments
        console.log('Payment failed:', event.data.object.id)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
