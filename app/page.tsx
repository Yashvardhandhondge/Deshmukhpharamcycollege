import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, Calendar, Users, MapPin } from "lucide-react"
import { getPrincipal } from "@/lib/models"
import { initializeDatabase } from "@/lib/models"

export default async function Home() {
  await initializeDatabase()
  const principal = await getPrincipal()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Maharashtra College of Pharmacy (D.Pharm)
              </h1>
              <p className="mt-4 text-lg text-slate-300">Approved by PCI, Affiliated to MSBTE</p>
              <div className="mt-8 flex justify-center gap-4 md:justify-start">
                <Button asChild>
                  <Link href="/about">About Us</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white/20 md:h-80 md:w-80">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="College Building"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Principal&apos;s Message</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex justify-center md:justify-end">
              <div className="relative h-64 w-64 overflow-hidden rounded-lg shadow-lg md:h-80 md:w-80">
                <Image
                  src={principal.imageId ? `/api/images/${principal.imageId}` : "/placeholder.svg?height=320&width=320"}
                  alt="Principal"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="mb-4 text-xl font-semibold">{principal.name}</h3>
              <p className="text-muted-foreground">{principal.message}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Mission & Vision</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide quality education in pharmaceutical sciences and to develop skilled professionals who can
                  contribute to the healthcare sector with knowledge, ethics, and innovation.
                </p>
                <p className="mt-4 text-muted-foreground">
                  We are committed to creating an environment that fosters learning, research, and community service,
                  preparing our students to be leaders in the field of pharmacy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be recognized as a center of excellence in pharmaceutical education, producing graduates who are
                  competent, ethical, and ready to meet the evolving needs of the healthcare industry.
                </p>
                <p className="mt-4 text-muted-foreground">
                  We aspire to be at the forefront of pharmaceutical education, research, and innovation, making
                  significant contributions to the advancement of healthcare in India and beyond.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Quick Links</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/about">
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="flex h-full flex-col items-center p-6 text-center">
                  <BookOpen className="mb-4 h-10 w-10 text-slate-700" />
                  <h3 className="mb-2 text-xl font-semibold">About Us</h3>
                  <p className="mb-4 flex-1 text-muted-foreground">
                    Learn about our history, affiliations, and facilities.
                  </p>
                  <span className="flex items-center text-sm font-medium text-primary">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/gallery">
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="flex h-full flex-col items-center p-6 text-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Gallery Icon"
                    width={40}
                    height={40}
                    className="mb-4"
                  />
                  <h3 className="mb-2 text-xl font-semibold">Gallery</h3>
                  <p className="mb-4 flex-1 text-muted-foreground">
                    View photos of our campus, events, and activities.
                  </p>
                  <span className="flex items-center text-sm font-medium text-primary">
                    View Gallery <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/faculty">
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="flex h-full flex-col items-center p-6 text-center">
                  <Users className="mb-4 h-10 w-10 text-slate-700" />
                  <h3 className="mb-2 text-xl font-semibold">Faculty</h3>
                  <p className="mb-4 flex-1 text-muted-foreground">
                    Meet our experienced and dedicated teaching staff.
                  </p>
                  <span className="flex items-center text-sm font-medium text-primary">
                    Meet Faculty <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/examination">
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="flex h-full flex-col items-center p-6 text-center">
                  <Calendar className="mb-4 h-10 w-10 text-slate-700" />
                  <h3 className="mb-2 text-xl font-semibold">Exam Dates</h3>
                  <p className="mb-4 flex-1 text-muted-foreground">Stay updated with upcoming examination schedules.</p>
                  <span className="flex items-center text-sm font-medium text-primary">
                    View Schedule <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/contact">
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="flex h-full flex-col items-center p-6 text-center">
                  <MapPin className="mb-4 h-10 w-10 text-slate-700" />
                  <h3 className="mb-2 text-xl font-semibold">Contact</h3>
                  <p className="mb-4 flex-1 text-muted-foreground">
                    Get in touch with us for inquiries and admissions.
                  </p>
                  <span className="flex items-center text-sm font-medium text-primary">
                    Contact Us <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/admin">
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="flex h-full flex-col items-center p-6 text-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Admin Icon"
                    width={40}
                    height={40}
                    className="mb-4"
                  />
                  <h3 className="mb-2 text-xl font-semibold">Admin</h3>
                  <p className="mb-4 flex-1 text-muted-foreground">Administrative portal for authorized personnel.</p>
                  <span className="flex items-center text-sm font-medium text-primary">
                    Admin Portal <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

