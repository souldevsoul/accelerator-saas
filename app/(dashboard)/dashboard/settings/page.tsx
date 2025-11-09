import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from 'db'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { ProfileSettings } from '@/components/settings/ProfileSettings'
import { NotificationSettings } from '@/components/settings/NotificationSettings'
import { DangerZone } from '@/components/settings/DangerZone'

// Force dynamic rendering to avoid DB access during build
export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const supabase = await createClient()

  // Beta: Skip auth check if Supabase not configured
  let user = null
  let dbUser = null

  if (supabase) {
    const { data } = await supabase.auth.getUser()
    user = data.user

    if (!user) {
      redirect('/login')
    }

    dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
    })

    if (!dbUser) {
      redirect('/login')
    }
  } else {
    // For beta without auth, show message
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
            <p className="text-gray-600">
              Settings page requires authentication. We're currently in beta mode.
            </p>
          </div>
        </div>
      </div>
    )
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
