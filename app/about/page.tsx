import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">About Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Learn about our history, mission, and commitment to pharmaceutical education
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold">Our College</h2>
              <p className="mb-4 text-muted-foreground">
                Deshmukh College Of Pharmacy (D.Pharm) was established in 2005 with the vision of providing quality
                education in pharmaceutical sciences. Located in the heart of Maharashtra, our institution has grown to
                become one of the leading pharmacy colleges in the region.
              </p>
              <p className="mb-4 text-muted-foreground">
                We are approved by the Pharmacy Council of India (PCI) and affiliated to Maharashtra State Board of
                Technical Education (MSBTE), ensuring that our curriculum meets the highest standards of pharmaceutical
                education.
              </p>
              <p className="text-muted-foreground">
                Our college is equipped with state-of-the-art laboratories, library, and other facilities to provide
                students with a conducive learning environment. We focus on both theoretical knowledge and practical
                skills to prepare our students for successful careers in the pharmaceutical industry.
              </p>
            </div>
            <div>
              <h2 className="mb-6 text-2xl font-bold">History & Establishment</h2>
              <p className="mb-4 text-muted-foreground">
                Founded by a group of visionary pharmacists and educators, our college began with a small batch of
                students and has now grown to accommodate hundreds of aspiring pharmacists each year.
              </p>
              <p className="mb-4 text-muted-foreground">
                Over the years, we have continuously upgraded our facilities and curriculum to keep pace with the
                evolving pharmaceutical industry. Our alumni are working in various prestigious organizations across
                India and abroad, a testament to the quality of education we provide.
              </p>
              <p className="text-muted-foreground">
                We take pride in our contribution to the pharmaceutical sector and remain committed to our founding
                principles of excellence, ethics, and innovation in pharmaceutical education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliation Details */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Affiliation & Approvals</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Pharmacy Council of India (PCI)</h3>
                <p className="text-muted-foreground">
                  Our D.Pharm program is approved by the Pharmacy Council of India, the statutory body governing
                  pharmacy education in India. This approval ensures that our curriculum and facilities meet the
                  national standards for pharmaceutical education.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">Maharashtra State Board of Technical Education (MSBTE)</h3>
                <p className="text-muted-foreground">
                  We are affiliated to the Maharashtra State Board of Technical Education, which oversees the technical
                  education in the state. This affiliation allows our students to receive recognized diplomas and
                  ensures that our teaching methodology aligns with state educational policies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Campus Photos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Campus Gallery</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src="/images/campus-building.jpg"
                alt="Campus Building"
                width={400}
                height={300}
                className="h-64 w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src="/images/laboratory.jpg"
                alt="Laboratory"
                width={400}
                height={300}
                className="h-64 w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src="/images/library.jpg"
                alt="Library"
                width={400}
                height={300}
                className="h-64 w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
              <Image
                src="/images/classroom.jpg"
                alt="Classroom"
                width={400}
                height={300}
                className="h-64 w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

