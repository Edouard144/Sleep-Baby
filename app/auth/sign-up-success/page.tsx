import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-white to-blue-50">
      <div className="w-full max-w-sm">
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#5555FF]/10 rounded-full">
                <Mail className="w-8 h-8 text-[#5555FF]" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#5555FF] mb-4">Check Your Email</h2>
            <p className="text-gray-600 mb-8">
              We&apos;ve sent you a confirmation link. Please check your email to verify your account.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Once confirmed, you can start tracking your baby's sleep patterns!
            </p>
            <Link href="/auth/login">
              <Button className="w-full bg-[#5555FF] hover:bg-[#4444DD] text-white">Back to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
