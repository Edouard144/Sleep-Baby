"use client"

import { useEffect, useState } from "react"
import { format, formatDistanceToNow } from "date-fns"
import { Clock, Droplet, GlassWater, Moon, Baby, Activity } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "./ui/skeleton"
import { toast } from "sonner"

type ActivityType = {
  id: string
  type: string
  start_time: string
  end_time?: string
  duration?: number
  amount?: number
  unit?: string
  diaper_type?: string
  notes?: string
  activity_name?: string
  created_at: string
}

type ActivityListProps = {
  type: "all" | "sleep" | "feeding" | "diaper"
}

export function ActivityList({ type }: ActivityListProps) {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        
        // Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          console.error('User not authenticated')
          return
        }

        console.log('Fetching activities for user:', user.id)
        
        // Build the base query
        let query = supabase
          .from("activities")
          .select("*")
          .eq("user_id", user.id)
          .order("start_time", { ascending: false })

        // Apply type filter if needed
        if (type === "sleep") {
          query = query.in("type", ["nap", "night_sleep"])
        } else if (type === "feeding") {
          query = query.in("type", ["nursing", "formula"])
        } else if (type === "diaper") {
          query = query.eq("type", "diaper")
        }

        // Execute the query
        const { data, error } = await query

        if (error) {
          console.error('Error fetching activities:', error)
          throw error
        }

        console.log('Fetched activities:', data)
        setActivities(data || [])
      } catch (error) {
        console.error("Error in fetchActivities:", error)
        toast.error("Failed to load activities")
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()

    // Set up real-time subscription
    const channel = supabase
      .channel('activities_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'activities',
          filter: `user_id=eq.${(async () => {
            const { data: { user } } = await supabase.auth.getUser()
            return user?.id || ''
          })()}`
        },
        (payload) => {
          console.log('Change received!', payload)
          fetchActivities()
        }
      )
      .subscribe()

    // Cleanup function
    return () => {
      supabase.removeChannel(channel)
    }
  }, [type, supabase])

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case "nap":
        return <Moon className="h-5 w-5 text-amber-500" />
      case "night_sleep":
        return <Moon className="h-5 w-5 text-indigo-500" />
      case "nursing":
        return <GlassWater className="h-5 w-5 text-pink-500" />
      case "formula":
        return <GlassWater className="h-5 w-5 text-blue-500" />
      case "diaper":
        return <Droplet className="h-5 w-5 text-amber-700" />
      default:
        return <Activity className="h-5 w-5 text-gray-500" />
    }
  }

  const getActivityTitle = (activity: ActivityType) => {
    switch (activity.type) {
      case "nap":
        return "Nap"
      case "night_sleep":
        return "Night Sleep"
      case "nursing":
        return "Nursing"
      case "formula":
        return "Formula"
      case "diaper":
        return `Diaper: ${activity.diaper_type ? activity.diaper_type.charAt(0).toUpperCase() + activity.diaper_type.slice(1) : ''}`
      case "custom":
        return activity.activity_name || "Custom Activity"
      default:
        return "Activity"
    }
  }

  const getActivityDetails = (activity: ActivityType) => {
    const details: string[] = []

    if (activity.duration) {
      const hours = Math.floor(activity.duration / 60)
      const minutes = activity.duration % 60
      details.push(
        `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m` : ""}`.trim()
      )
    }

    if (activity.amount && activity.unit) {
      details.push(`${activity.amount} ${activity.unit}`)
    }

    if (activity.notes) {
      details.push(activity.notes)
    }

    return details.join(" • ")
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Baby className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No activities yet</h3>
        <p className="text-gray-500 mt-1">
          {type === "all"
            ? "Log your first activity to get started!"
            : `No ${type} activities found.`}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-4 rounded-lg border bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
        >
          <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{getActivityTitle(activity)}</h3>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(activity.start_time), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-3.5 w-3.5" />
              <span>
                {format(new Date(activity.start_time), "h:mm a")}
                {activity.end_time &&
                  ` - ${format(new Date(activity.end_time), "h:mm a")}`}
              </span>
            </div>
            {getActivityDetails(activity) && (
              <p className="mt-2 text-sm text-gray-600">
                {getActivityDetails(activity)}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
