import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean up existing data
  await prisma.notification.deleteMany()
  await prisma.creditLedger.deleteMany()
  await prisma.creditGrant.deleteMany()
  await prisma.wallet.deleteMany()
  await prisma.task.deleteMany()
  await prisma.aIRun.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@accelerator.dev',
      name: 'Admin User',
      role: 'admin',
    },
  })

  const regularUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'John Doe',
      role: 'user',
    },
  })

  const executorUser = await prisma.user.create({
    data: {
      email: 'executor@accelerator.dev',
      name: 'Jane Developer',
      role: 'executor',
    },
  })

  console.log('✅ Created users')

  // Create wallets with initial credits
  await prisma.wallet.create({
    data: {
      userId: regularUser.id,
      balance: 1000, // 1000 credits
    },
  })

  await prisma.wallet.create({
    data: {
      userId: adminUser.id,
      balance: 10000,
    },
  })

  console.log('✅ Created wallets')

  // Create credit grants
  await prisma.creditGrant.create({
    data: {
      userId: regularUser.id,
      amount: 1000,
      source: 'signup_bonus',
    },
  })

  await prisma.creditLedger.create({
    data: {
      userId: regularUser.id,
      delta: 1000,
      reason: 'signup_bonus',
    },
  })

  console.log('✅ Created credit grants')

  // Create a sample project
  const project = await prisma.project.create({
    data: {
      ownerId: regularUser.id,
      name: 'My Awesome SaaS',
      repoFullName: 'johndoe/awesome-saas',
      status: 'mvp_pending',
    },
  })

  console.log('✅ Created project')

  // Create an AI run for MVP
  await prisma.aIRun.create({
    data: {
      projectId: project.id,
      kind: 'mvp',
      status: 'completed',
      costCredits: 100,
      branch: `mvp/${project.id}`,
      prUrl: 'https://github.com/johndoe/awesome-saas/pull/1',
      previewUrl: 'https://awesome-saas-preview.vercel.app',
    },
  })

  console.log('✅ Created AI run')

  // Create sample tasks
  const task1 = await prisma.task.create({
    data: {
      projectId: project.id,
      title: 'Add user authentication',
      description: 'Implement OAuth login with Google and GitHub',
      type: 'feature',
      complexity: 'L',
      status: 'open',
    },
  })

  const task2 = await prisma.task.create({
    data: {
      projectId: project.id,
      title: 'Fix navigation bug on mobile',
      description: 'The hamburger menu does not close on mobile devices',
      type: 'bug',
      complexity: 'S',
      status: 'assigned',
      assigneeId: executorUser.id,
      githubBranch: `task/${project.id}-fix-mobile-nav`,
      githubPrUrl: 'https://github.com/johndoe/awesome-saas/pull/2',
      reservedCredits: 15, // bug * S = 15 * 1 = 15
    },
  })

  await prisma.task.create({
    data: {
      projectId: project.id,
      title: 'Write landing page copy',
      description: 'Create compelling copy for the hero section and features',
      type: 'content',
      complexity: 'M',
      status: 'done',
      assigneeId: executorUser.id,
      reservedCredits: 20, // content * M = 10 * 2 = 20
    },
  })

  console.log('✅ Created tasks')

  // Create notification
  await prisma.notification.create({
    data: {
      userId: regularUser.id,
      kind: 'task_assigned',
      payload: {
        taskId: task2.id,
        taskTitle: task2.title,
        assigneeName: executorUser.name,
      },
    },
  })

  console.log('✅ Created notifications')

  console.log('🎉 Seeding complete!')
  console.log(`
    Admin: ${adminUser.email}
    User: ${regularUser.email}
    Executor: ${executorUser.email}
  `)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
