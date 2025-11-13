"use client"

import { useState, useId } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const activitySchema = z.object({
  type: z.enum(["nap", "night_sleep", "nursing", "formula", "diaper", "custom"]),
  startTime: z.date(),
  endTime: z.date().optional(),
  duration: z.number().min(1, "Duration is required").optional(),
  amount: z.number().min(1, "Amount is required").optional(),
  unit: z.string().optional(),
  diaperType: z.enum(["wet", "dirty", "both"]).optional(),
  notes: z.string().optional(),
  activityName: z.string().optional(),
})

type ActivityFormValues = z.infer<typeof activitySchema>

export function ActivityForm({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dialogId = useId() // Generates a stable unique ID for Dialog
  const supabase = createClient()

  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      type: "nap",
      startTime: new Date(),
    },
  })

  const activityType = form.watch("type")

  const onSubmit = async (formData: ActivityFormValues) => {
    try {
      setIsLoading(true)
      
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        throw new Error("User not authenticated")
      }

      // Prepare the activity data
      const activityData = {
        type: formData.type,
        start_time: formData.startTime.toISOString(),
        end_time: formData.endTime?.toISOString(),
        duration: formData.duration,
        amount: formData.amount,
        unit: formData.unit,
        diaper_type: formData.diaperType,
        notes: formData.notes,
        activity_name: formData.activityName,
        user_id: user.id,
      }

      // Insert the activity into the database
      const { error } = await supabase
        .from('activities')
        .insert(activityData)
        .single()

      if (error) {
        console.error('Error details:', error)
        throw error
      }

      toast.success("Activity logged successfully!")
      form.reset({
        type: "nap",
        startTime: new Date(),
        endTime: undefined,
        duration: undefined,
        amount: undefined,
        unit: undefined,
        diaperType: undefined,
        notes: "",
        activityName: "",
      })
      setOpen(false)
    } catch (error) {
      console.error('Error saving activity:', error)
      toast.error("Failed to log activity. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} id={dialogId}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant="outline"
            className="w-full bg-[#5555FF] hover:bg-[#4444DD] text-white fixed bottom-4 right-4"
          >
            <Plus className="mr-2 h-4 w-4" /> Log Activity
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log New Activity</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nap">Nap</SelectItem>
                      <SelectItem value="night_sleep">Night Sleep</SelectItem>
                      <SelectItem value="nursing">Nursing</SelectItem>
                      <SelectItem value="formula">Formula</SelectItem>
                      <SelectItem value="diaper">Diaper Change</SelectItem>
                      <SelectItem value="custom">Custom Activity</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {activityType === "custom" && (
              <FormField
                control={form.control}
                name="activityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Tummy Time, Bath, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPPp")
                            ) : (
                              <span>Pick a date and time</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(activityType === "nap" || activityType === "night_sleep") && (
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 45"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {(activityType === "nursing" || activityType === "formula") && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 120"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ml">ml</SelectItem>
                          <SelectItem value="oz">oz</SelectItem>
                          <SelectItem value="min">minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {activityType === "diaper" && (
              <FormField
                control={form.control}
                name="diaperType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diaper Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select diaper type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="wet">Wet</SelectItem>
                        <SelectItem value="dirty">Dirty</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional notes..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Activity"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}