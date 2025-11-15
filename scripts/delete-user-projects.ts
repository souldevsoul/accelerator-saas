import { prisma } from '../lib/db'

async function deleteUserProjects() {
  const userEmail = 'test@tester.com'

  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true, email: true }
    })

    if (!user) {
      console.log(`❌ User ${userEmail} not found`)
      return
    }

    console.log(`✅ Found user: ${user.email} (ID: ${user.id})`)

    // Find all projects for this user
    const projects = await prisma.project.findMany({
      where: { ownerId: user.id },
      select: { id: true, name: true }
    })

    console.log(`📊 Found ${projects.length} projects for user ${userEmail}`)

    if (projects.length === 0) {
      console.log('ℹ️  No projects to delete')
      return
    }

    // List projects to be deleted
    projects.forEach((project, index) => {
      console.log(`  ${index + 1}. ${project.name} (ID: ${project.id})`)
    })

    // Delete all projects for this user
    const deleteResult = await prisma.project.deleteMany({
      where: { ownerId: user.id }
    })

    console.log(`✅ Successfully deleted ${deleteResult.count} projects`)

  } catch (error) {
    console.error('❌ Error deleting projects:', error)
  } finally {
    await prisma.$disconnect()
  }
}

deleteUserProjects()
