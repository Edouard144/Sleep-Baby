"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Clock, Music, Users, BarChart3, Zap } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "Track Everything",
    description:
      "Log sleep duration, wake times, feeding patterns, and mood. Get a complete picture of your baby's sleep journey with our intuitive tracking.",
  },
  {
    icon: Clock,
    title: "Personalized Sleep Schedules",
    description:
      "AI-powered recommendations tailored to your baby's age, sleep patterns, and unique needs. Find the schedule that works for your family.",
  },
  {
    icon: Music,
    title: "Sounds & Guides",
    description:
      "Access a library of white noise, lullabies, and sleep stories. Plus expert-backed guides for every sleep challenge you might face.",
  },
  {
    icon: Users,
    title: "Multi-Caregiver Support",
    description:
      "Let grandparents, nannies, and partners track sleep too. Real-time syncing keeps everyone on the same page.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Beautiful charts and reports show sleep trends over time. Identify patterns and celebrate the progress you're making.",
  },
  {
    icon: Zap,
    title: "Smart Notifications",
    description:
      "Gentle reminders for bedtime routines and alerts for unusual sleep patterns. Stay informed without feeling overwhelmed.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#0066ff] mb-4"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
          >
            Everything You Need
          </h2>
          <p
            className="text-lg text-gray-700 max-w-2xl mx-auto text-pretty"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Powerful features designed to help you understand and support your baby's sleep development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="bg-white border border-gray-200 hover:shadow-lg transition-shadow rounded-[20px]"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-[#0066ff]/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#0066ff]" />
                  </div>
                  <CardTitle className="text-black" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
