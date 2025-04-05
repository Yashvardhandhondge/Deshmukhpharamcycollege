"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import type { GalleryImage } from "@/lib/models"

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/gallery")
        if (response.ok) {
          const data = await response.json()
          setImages(data)
        } else {
          console.error("Failed to fetch gallery data")
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p>Loading gallery...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Gallery</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Explore our campus and activities through images
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <div key={image._id} className="group overflow-hidden rounded-lg shadow-md">
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.imageId ? `/api/images/${image.imageId}` : "/placeholder.svg?height=400&width=600"}
                    alt={image.alt}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    unoptimized
                  />
                </div>
                <div className="bg-white p-2 text-center">
                  <p className="text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

