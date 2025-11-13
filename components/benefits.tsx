"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const benefits = [
  {
    title: "For Tired Parents",
    points: [
      "Understand why your baby wakes up at night",
      "Reduce guesswork with data-driven insights",
      "Get expert advice when you need it most",
      "Connect with a supportive community",
    ],
  },
  {
    title: "For Your Baby",
    points: [
      "Healthier sleep patterns from day one",
      "Personalized approach to their unique needs",
      "Consistent routines that feel natural",
      "Better daytime mood and development",
    ],
  },
  {
    title: "For Your Family",
    points: [
      "Everyone stays coordinated and informed",
      "Reduces confusion about what's working",
      "Builds confidence in caregiving choices",
      "More restful nights for the whole family",
    ],
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Parents Love SleepBaby</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join thousands of families getting better sleep and more peace of mind.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefit.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
