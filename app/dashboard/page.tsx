import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-[#5555FF] mb-2">Welcome to SleepBaby</h1>
            <p className="text-gray-600">Hello, {data.user.email}! </p>
          </div>
          <Link href="/api/auth/logout">
            <Button className="bg--500 hover:bg-red-600 text-white">Logout</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Track Everything */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#5555FF]/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-[#5555FF] mb-3">Track Everything</h3>
            <p className="text-gray-600 mb-4">Log sleep times, wake times, feeding, and diaper changes in one place.</p>
            <Link href="/tracking" className="w-full">
              <Button className="w-full bg-[#5555FF] hover:bg-[#4444DD] text-white">Start Tracking</Button>
            </Link>
          </div>

          {/* Personalized Sleep Schedules */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#5555FF]/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🕐</span>
            </div>
            <h3 className="text-xl font-bold text-[#5555FF] mb-3">Sleep Schedules</h3>
            <p className="text-gray-600 mb-4">
              Get personalized recommendations based on your baby's age and patterns.
            </p>
            <Button className="w-full bg-[#5555FF] hover:bg-[#4444DD] text-white">View Schedules</Button>
          </div>

          {/* Sounds & Guides */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#5555FF]/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎵</span>
            </div>
            <h3 className="text-xl font-bold text-[#5555FF] mb-3">Sounds & Guides</h3>
            <p className="text-gray-600 mb-4">Access a library of soothing sounds and expert sleep guides.</p>
            <Button className="w-full bg-[#5555FF] hover:bg-[#4444DD] text-white">Explore Sounds</Button>
          </div>

          {/* Multi-Caregiver Support */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#5555FF]/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">👨‍👩‍👧</span>
            </div>
            <h3 className="text-xl font-bold text-[#5555FF] mb-3">Multi-Caregiver</h3>
            <p className="text-gray-600 mb-4">Invite partners, grandparents, and nannies to help track sleep.</p>
            <Button className="w-full bg-[#5555FF] hover:bg-[#4444DD] text-white">Invite Caregivers</Button>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#5555FF]/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-bold text-[#5555FF] mb-3">Analytics</h3>
            <p className="text-gray-600 mb-4">View detailed insights and trends to understand your baby's sleep.</p>
            <Button className="w-full bg-[#5555FF] hover:bg-[#4444DD] text-white">View Analytics</Button>
          </div>

          {/* Smart Notifications */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#5555FF]/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔔</span>
            </div>
            <h3 className="text-xl font-bold text-[#5555FF] mb-3">Notifications</h3>
            <p className="text-gray-600 mb-4">Get gentle reminders and alerts for upcoming sleep times.</p>
            <Button className="w-full bg-[#5555FF] hover:bg-[#4444DD] text-white">Manage Alerts</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
