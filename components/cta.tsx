"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section
      id="cta"
      className="py-20 md:py-32 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight text-pretty">
          Ready to Transform Your Baby's Sleep?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Start your free 7-day trial today. No credit card needed. Discover what better sleep looks like for your
          family.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base h-12">
            Start Tracking Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="text-base h-12 bg-transparent">
            Schedule Demo
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Join 50,000+ families already getting better sleep with SleepBaby
        </p>
      </div>
    </section>
  )
}
