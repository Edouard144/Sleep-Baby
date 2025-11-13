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
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#5555FF]">Baby Activity Tracker</h1>
        <ActivityForm>
          <Button className="bg-[#5555FF] hover:bg-[#4444DD] text-white">
            <Plus className="mr-2 h-4 w-4" /> Log Activity
          </Button>
        </ActivityForm>
      </div>

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
  )
}
