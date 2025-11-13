"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter()

  return (
    <section className="relative pt-12 pb-12 md:pt-20 md:pb-20 bg-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Placeholder for background image - will be inserted by user */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl font-bold text-[#5555FF] mb-6 leading-tight text-pretty"
            style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700 }}
          >
            Every Baby Deserves Better Sleep
          </h1>
          <p
            className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto text-pretty"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Track sleep patterns, get personalized recommendations, and discover what works best for your little one.
            Designed by parents, built for peace of mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#5555FF] hover:bg-[#4444DD] text-white text-base font-semibold h-12 rounded-3xl transition-all"
              style={{ fontFamily: "Nunito, sans-serif", padding: "14px 28px" }}
              onClick={() => router.push("/auth/sign-up")}
            >
              Start Tracking
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              className="border-2 border-[#5555FF] text-[#5555FF] bg-transparent hover:bg-[#5555FF] hover:text-white text-base font-semibold h-12 rounded-3xl transition-all"
              style={{ fontFamily: "Nunito, sans-serif", padding: "14px 28px" }}
              onClick={() => router.push("/auth/login")}
            >
              Explore Features
            </Button>
          </div>

          <div className="mt-12 text-sm text-gray-600" style={{ fontFamily: "Nunito, sans-serif" }}>
            ✓ Free 7-day trial • ✓ No credit card required • ✓ Cancel anytime
          </div>
        </div>
      </div>
    </section>
  )
}
