"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { Teacher } from "@/lib/models"

export default function FacultyPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch("/api/faculty")
        if (response.ok) {
          const data = await response.json()
          setTeachers(data)
        } else {
          console.error("Failed to fetch faculty data")
        }
      } catch (error) {
        console.error("Error fetching faculty data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFaculty()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p>Loading faculty data...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Our Faculty</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Meet our experienced and dedicated teaching staff
          </p>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <Card key={teacher._id} className="overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={teacher.imageId ? `/api/images/${teacher.imageId}` : "/placeholder.svg?height=400&width=400"}
                    alt={teacher.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    unoptimized
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold">{teacher.name}</h3>
                  <p className="text-muted-foreground">{teacher.subject}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

