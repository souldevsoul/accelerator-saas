import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from 'db'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ProfileSettings } from '@/components/settings/ProfileSettings'
import { NotificationSettings } from '@/components/settings/NotificationSettings'
import { DangerZone } from '@/components/settings/DangerZone'

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
  })

  if (!dbUser) {
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
            <ProfileSettings user={dbUser} />
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
            <NotificationSettings userId={dbUser.id} />
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl border border-red-200 p-6">
            <h2 className="text-xl font-bold text-red-600 mb-6">Danger Zone</h2>
            <DangerZone userId={dbUser.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
