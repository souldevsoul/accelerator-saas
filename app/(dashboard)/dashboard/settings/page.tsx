import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from 'db'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ProfileSettings } from '@/components/settings/ProfileSettings'
import { NotificationSettings } from '@/components/settings/NotificationSettings'
import { ApiKeyManagement } from '@/components/settings/ApiKeyManagement'
import { SubscriptionManagement } from '@/components/settings/SubscriptionManagement'
import { DangerZone } from '@/components/settings/DangerZone'

// Force dynamic rendering to avoid DB access during build
export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      wallet: true,
      apiKeys: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <DashboardHeader
          title="Settings"
          description="Manage your account settings and preferences"
        />

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
            <ProfileSettings user={user} />
          </div>

          {/* API Keys */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">API Keys</h2>
            <ApiKeyManagement apiKeys={user.apiKeys} />
          </div>

          {/* Subscription/Credits */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Credits & Billing</h2>
            <SubscriptionManagement userId={user.id} wallet={user.wallet} />
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
            <NotificationSettings userId={user.id} />
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl border border-red-200 p-6">
            <h2 className="text-xl font-bold text-red-600 mb-6">Danger Zone</h2>
            <DangerZone userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
