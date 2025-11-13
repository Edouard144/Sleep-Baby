"use client"

import { useEffect, useState } from "react"
import { Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and app name */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center flex-shrink-0">
              <Moon className="w-5 h-5 text-[#0066ff]" />
            </div>
            <span className="text-lg font-semibold text-[#0066ff] -ml-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              SleepBaby
            </span>
          </div>

          {/* Right-aligned content */}
          <div className="flex items-center gap-8">
            {/* Navigation menu */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm text-gray-600 hover:text-black transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-gray-600 hover:text-black transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-sm text-gray-600 hover:text-black transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Testimonials
              </a>
            </nav>

            {/* CTA buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="text-sm text-black hover:bg-gray-100 hover:text-black rounded-full px-6 font-semibold transition-all"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Sign In
              </Button>
              <Button
                variant="outline"
                className="border-[#0066ff] text-[#0066ff] hover:bg-[#0066ff] hover:text-white text-sm font-semibold rounded-full px-6 transition-all h-auto py-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
