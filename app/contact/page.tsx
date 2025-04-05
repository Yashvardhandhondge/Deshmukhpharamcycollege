"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would send the data to a server
    // For this frontend-only demo, we'll just show a success message
    setFormSubmitted(true)
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We will get back to you shortly.",
    })
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Get in touch with us for inquiries and admissions
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <MapPin className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-muted-foreground">
                      DESHMUKH COLLEGE OF PHARMACY KASAR SIRSI Tq. Nilanga 
                      <br/>Dist. Latur - 413607
                     
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <Phone className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">
                        +91 9975469123
                        <br />
                        +91 8411888688
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <Mail className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">
                        deshmukhpharmacy2022@gmail.com
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map */}
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold">Find Us</h3>
                <div className="h-[300px] overflow-hidden rounded-lg bg-slate-200">
                  {/* Google Maps Embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12065.675010355693!2d76.7555342!3d17.9266993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf4166f8287605%3A0xec1001da3d0dfc40!2sDESHMUKH%20COLLEGE%20OF%20PHARMACY%20KASAR%20SIRSI!5e0!3m2!1sen!2sin!4v1687802217623!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
              {formSubmitted ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="mb-2 text-xl font-semibold text-primary">Thank You!</h3>
                      <p className="text-muted-foreground">
                        Your message has been received. We will get back to you shortly.
                      </p>
                      <Button className="mt-4" onClick={() => setFormSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Admission Information */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Admission Information</h2>
          <div className="mx-auto max-w-3xl space-y-4 text-muted-foreground">
            <p>
              <strong>Eligibility:</strong> Candidates must have passed 10+2 examination with Physics, Chemistry, and
              Biology/Mathematics.
            </p>
            <p>
              <strong>Application Process:</strong> Applications for the D.Pharm program are accepted from May to July
              each year. Application forms can be obtained from the college office or downloaded from our website.
            </p>
            <p>
              <strong>Required Documents:</strong>
            </p>
            <ul className="list-inside list-disc space-y-1 pl-4">
              <li>10th and 12th mark sheets (original and photocopy)</li>
              <li>Transfer certificate</li>
              <li>Character certificate</li>
              <li>Migration certificate (if applicable)</li>
              <li>Caste certificate (if applicable)</li>
              <li>Four passport-sized photographs</li>
            </ul>
            <p>
              <strong>Admission Helpline:</strong> For any queries regarding admissions, please contact our admission
              helpline at +91 98765 43210 or email at admissions@maharashtrapharmacy.edu.in.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

