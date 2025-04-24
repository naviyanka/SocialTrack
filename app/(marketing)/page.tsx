import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, Shield, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Track Your Instagram Growth Like Never Before
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  InstaTrack helps you monitor followers, analyze engagement, and grow your Instagram presence with
                  powerful analytics.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/signup">
                  <Button size="lg" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Dashboard Preview"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                src="/placeholder.svg?height=550&width=750"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to understand and grow your Instagram audience
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Follower Tracking</h3>
              <p className="text-center text-muted-foreground">
                Monitor who follows and unfollows your account in real-time with detailed insights.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BarChart2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Advanced Analytics</h3>
              <p className="text-center text-muted-foreground">
                Visualize your growth with beautiful charts and metrics that help you understand your audience.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Suspicious Activity</h3>
              <p className="text-center text-muted-foreground">
                Get alerted when unusual patterns are detected, like mass unfollows or engagement drops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trusted by Creators</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our users are saying about InstaTrack
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col justify-between space-y-4 rounded-lg border p-6">
                <p className="text-muted-foreground">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-4">
                  <img
                    alt={testimonial.name}
                    className="rounded-full"
                    height="40"
                    src={testimonial.avatar || "/placeholder.svg"}
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to grow your Instagram?</h2>
              <p className="max-w-[600px] text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of creators who use InstaTrack to understand their audience and grow their presence.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary" className="gap-1">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 md:py-12 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold">InstaTrack</h3>
              <p className="text-sm text-muted-foreground">
                Powerful Instagram analytics to help you grow your audience and engagement.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <h4 className="font-medium">Links</h4>
                <nav className="flex flex-col gap-2 text-sm">
                  <Link href="/pricing" className="hover:underline">
                    Pricing
                  </Link>
                  <Link href="/features" className="hover:underline">
                    Features
                  </Link>
                  <Link href="/about" className="hover:underline">
                    About
                  </Link>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </nav>
              </div>
              <div className="grid gap-2">
                <h4 className="font-medium">Legal</h4>
                <nav className="flex flex-col gap-2 text-sm">
                  <Link href="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} InstaTrack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

const testimonials = [
  {
    quote: "InstaTrack has been a game-changer for my business. I can now see exactly who's engaging with my content.",
    name: "Sarah Johnson",
    title: "Fashion Influencer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote: "The suspicious activity alerts saved me from a mass unfollow campaign. Worth every penny!",
    name: "Michael Chen",
    title: "Travel Photographer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote: "I've tried many analytics tools, but InstaTrack gives me insights I can't find anywhere else.",
    name: "Priya Patel",
    title: "Food Blogger",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]
