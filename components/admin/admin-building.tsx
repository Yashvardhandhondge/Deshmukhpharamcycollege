"use client"

import React, { useState, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function AdminBuilding() {
  const { toast } = useToast()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = () => { setPreviewUrl(reader.result as string) }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const res = await fetch("/api/uploadBuilding", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        toast({
          title: "Upload Successful",
          description: "College building image updated.",
        })
        setPreviewUrl("")
        setSelectedFile(null)
      } else {
        throw new Error(data.error || "Upload failed")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update College Building Image</CardTitle>
        <CardDescription>Select a new image for the building</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {previewUrl ? (
              <div className="relative h-64 w-full mb-4">
                <Image src={previewUrl} alt="Preview" fill className="object-cover" />
              </div>
            ) : (
              <div className="mb-4 text-center text-slate-500">No image selected</div>
            )}
          </div>
          <div className="space-y-2">
            <Input type="file" accept="image/*" onChange={handleFileChange} required />
          </div>
          <Button type="submit" disabled={uploading}>{uploading ? "Uploading..." : "Update Image"}</Button>
        </form>
      </CardContent>
    </Card>
  )
}
