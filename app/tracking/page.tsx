import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ActivityList } from "@/components/activity-list"
import { ActivityForm } from "@/components/activity-form"

export default async function TrackingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold text-[#5555FF]">Baby Activity Tracker</h1>
          <ActivityForm>
            <Button size="sm" className="bg-[#5555FF] hover:bg-[#4444DD] text-white">
              <Plus className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Log Activity</span>
            </Button>
          </ActivityForm>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="feeding">Feeding</TabsTrigger>
          <TabsTrigger value="diapers">Diapers</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <ActivityList type="all" />
        </TabsContent>
        <TabsContent value="sleep">
          <ActivityList type="sleep" />
        </TabsContent>
        <TabsContent value="feeding">
          <ActivityList type="feeding" />
        </TabsContent>
        <TabsContent value="diapers">
          <ActivityList type="diaper" />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}
