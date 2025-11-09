'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Bell, Mail, CheckCircle2, AlertCircle } from 'lucide-react'

export function NotificationSettings({ userId }: { userId: string }) {
  const [settings, setSettings] = useState({
    emailOnTaskAssigned: true,
    emailOnTaskCompleted: true,
    emailOnPRCreated: true,
    emailOnPRMerged: true,
    emailOnCreditsPurchased: true,
    emailOnLowCredits: true,
  })

  const handleToggle = async (key: keyof typeof settings) => {
    const newValue = !settings[key]
    setSettings((prev) => ({ ...prev, [key]: newValue }))

    // In a real app, this would save to the database
    // await fetch('/api/user/notifications', {
    //   method: 'PATCH',
    //   body: JSON.stringify({ [key]: newValue })
    // })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <Bell className="w-5 h-5 text-blue-600" />
        <p className="text-sm text-blue-900">
          Configure how you want to receive notifications about your projects and tasks
        </p>
      </div>

      <div className="space-y-4">
        {/* Task Notifications */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Task Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <Label htmlFor="task-assigned" className="font-medium cursor-pointer">
                    Task Assigned
                  </Label>
                  <p className="text-sm text-gray-500">Get notified when a task is assigned to an executor</p>
                </div>
              </div>
              <Switch
                id="task-assigned"
                checked={settings.emailOnTaskAssigned}
                onCheckedChange={() => handleToggle('emailOnTaskAssigned')}
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <Label htmlFor="task-completed" className="font-medium cursor-pointer">
                    Task Completed
                  </Label>
                  <p className="text-sm text-gray-500">Get notified when a task is completed</p>
                </div>
              </div>
              <Switch
                id="task-completed"
                checked={settings.emailOnTaskCompleted}
                onCheckedChange={() => handleToggle('emailOnTaskCompleted')}
              />
            </div>
          </div>
        </div>

        {/* Pull Request Notifications */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Pull Request Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <Label htmlFor="pr-created" className="font-medium cursor-pointer">
                    PR Created
                  </Label>
                  <p className="text-sm text-gray-500">Get notified when a pull request is created</p>
                </div>
              </div>
              <Switch
                id="pr-created"
                checked={settings.emailOnPRCreated}
                onCheckedChange={() => handleToggle('emailOnPRCreated')}
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <Label htmlFor="pr-merged" className="font-medium cursor-pointer">
                    PR Merged
                  </Label>
                  <p className="text-sm text-gray-500">Get notified when a pull request is merged</p>
                </div>
              </div>
              <Switch
                id="pr-merged"
                checked={settings.emailOnPRMerged}
                onCheckedChange={() => handleToggle('emailOnPRMerged')}
              />
            </div>
          </div>
        </div>

        {/* Billing Notifications */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Billing Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <Label htmlFor="credits-purchased" className="font-medium cursor-pointer">
                    Credits Purchased
                  </Label>
                  <p className="text-sm text-gray-500">Get notified when credits are added to your wallet</p>
                </div>
              </div>
              <Switch
                id="credits-purchased"
                checked={settings.emailOnCreditsPurchased}
                onCheckedChange={() => handleToggle('emailOnCreditsPurchased')}
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <Label htmlFor="low-credits" className="font-medium cursor-pointer">
                    Low Credits Alert
                  </Label>
                  <p className="text-sm text-gray-500">Get notified when your credit balance is low</p>
                </div>
              </div>
              <Switch
                id="low-credits"
                checked={settings.emailOnLowCredits}
                onCheckedChange={() => handleToggle('emailOnLowCredits')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
