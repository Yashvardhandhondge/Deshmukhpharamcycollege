"use client"

import type React from "react"

import { useState, useEffect, type ChangeEvent } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { Principal } from "@/lib/models"

export default function AdminPrincipal() {
  const { toast } = useToast()
  const [principal, setPrincipal] = useState<Principal>({
    name: "",
    message: "",
    imageId: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  useEffect(() => {
    const fetchPrincipal = async () => {
      try {
        const response = await fetch("/api/principal")
        if (response.ok) {
          const data = await response.json()
          setPrincipal(data)
          if (data.imageId) {
            setPreviewUrl(`/api/images/${data.imageId}`)
          } else {
            setPreviewUrl("/placeholder.svg?height=320&width=320")
          }
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch principal data",
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

    fetchPrincipal()
  }, [toast])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPrincipal((prev) => ({ ...prev, [name]: value }))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // If there's a new image, upload it first
      if (selectedFile) {
        const formData = new FormData()
        formData.append("file", selectedFile)
        formData.append("type", "principal")
        if (principal.imageId) {
          formData.append("oldImageId", principal.imageId.toString())
        }

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image")
        }

        const uploadData = await uploadResponse.json()
        principal.imageId = uploadData.imageId
      }

      // Update principal data
      const response = await fetch("/api/principal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(principal),
      })

      if (!response.ok) {
        throw new Error("Failed to update principal data")
      }

      toast({
        title: "Success",
        description: "Principal information updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update principal information",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
      setSelectedFile(null)
    }
  }

  if (loading) {
    return <div>Loading principal data...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Principal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-4 overflow-hidden rounded-lg">
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Principal"
                  width={320}
                  height={320}
                  className="h-64 w-full object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="principal-photo">Upload New Photo</Label>
                <Input id="principal-photo" type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Recommended image size: 320x320 pixels</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Principal Name</Label>
                <Input id="name" name="name" value={principal.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Principal's Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={8}
                  value={principal.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

