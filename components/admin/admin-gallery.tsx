"use client"

import type React from "react"

import { useState, useEffect, type ChangeEvent } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { GalleryImage } from "@/lib/models"

export default function AdminGallery() {
  const { toast } = useToast()
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageAlt, setImageAlt] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string>("")

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery")
      if (response.ok) {
        const data = await response.json()
        setGallery(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch gallery data",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAltChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageAlt(e.target.value)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select an image to upload",
        variant: "destructive",
      })
      return
    }

    if (!imageAlt) {
      toast({
        title: "Error",
        description: "Please provide a description for the image",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      // Upload the image
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("type", "gallery")

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image")
      }

      const uploadData = await uploadResponse.json()

      // Add to gallery
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageId: uploadData.imageId,
          alt: imageAlt,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add image to gallery")
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })

      // Refresh gallery
      fetchGallery()

      // Reset form
      setSelectedFile(null)
      setImageAlt("")
      setPreviewUrl("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return
    }

    try {
      const response = await fetch("/api/gallery", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete image")
      }

      toast({
        title: "Success",
        description: "Image deleted successfully",
      })

      // Refresh gallery
      fetchGallery()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading gallery data...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Image</CardTitle>
          <CardDescription>Add a new image to the gallery</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                {previewUrl && (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      width={400}
                      height={300}
                      className="h-64 w-full object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="gallery-image">Select Image</Label>
                  <Input id="gallery-image" type="file" accept="image/*" onChange={handleFileChange} required />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-alt">Image Description</Label>
                  <Input
                    id="image-alt"
                    value={imageAlt}
                    onChange={handleAltChange}
                    placeholder="e.g., College Building, Laboratory, etc."
                    required
                  />
                </div>
                <Button type="submit" disabled={uploading || !selectedFile}>
                  {uploading ? "Uploading..." : "Upload Image"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Management</CardTitle>
          <CardDescription>Manage existing gallery images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {gallery.map((image) => (
              <div key={image._id} className="overflow-hidden rounded-lg border">
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={`/api/images/${image.imageId}`}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-2">
                  <p className="mb-2 text-sm font-medium">{image.alt}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => handleDelete(image._id as string)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

