"use client"

import type React from "react"

import { useState, useEffect, type ChangeEvent } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { Teacher } from "@/lib/models"

export default function AdminFaculty() {
  const { toast } = useToast()
  const [faculty, setFaculty] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [formData, setFormData] = useState<Teacher>({
    name: "",
    subject: "",
    imageId: "",
  })

  useEffect(() => {
    fetchFaculty()
  }, [])

  const fetchFaculty = async () => {
    try {
      const response = await fetch("/api/faculty")
      if (response.ok) {
        const data = await response.json()
        setFaculty(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch faculty data",
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

  const handleSelectTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setFormData(teacher)
    if (teacher.imageId) {
      setPreviewUrl(`/api/images/${teacher.imageId}`)
    } else {
      setPreviewUrl("/placeholder.svg?height=200&width=200")
    }
    setIsEditing(true)
    setIsAdding(false)
  }

  const handleAddNew = () => {
    setSelectedTeacher(null)
    setFormData({
      name: "",
      subject: "",
      imageId: "",
    })
    setPreviewUrl("/placeholder.svg?height=200&width=200")
    setIsAdding(true)
    setIsEditing(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
        formData.append("type", "faculty")
        if (isEditing && selectedTeacher?.imageId) {
          formData.append("oldImageId", selectedTeacher.imageId.toString())
        }

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image")
        }

        const uploadData = await uploadResponse.json()
        setFormData((prev) => ({ ...prev, imageId: uploadData.imageId }))
      }

      // Update or add teacher
      const response = await fetch("/api/faculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save teacher data")
      }

      toast({
        title: "Success",
        description: isAdding ? "Teacher added successfully" : "Teacher updated successfully",
      })

      // Refresh faculty list
      fetchFaculty()

      // Reset form
      setIsEditing(false)
      setIsAdding(false)
      setSelectedTeacher(null)
      setSelectedFile(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save teacher information",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) {
      return
    }

    try {
      const response = await fetch("/api/faculty", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete teacher")
      }

      toast({
        title: "Success",
        description: "Teacher deleted successfully",
      })

      // Refresh faculty list
      fetchFaculty()

      // Reset form if the deleted teacher was selected
      if (selectedTeacher?._id === id) {
        setIsEditing(false)
        setSelectedTeacher(null)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete teacher",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setIsAdding(false)
    setSelectedTeacher(null)
    setSelectedFile(null)
  }

  if (loading) {
    return <div>Loading faculty data...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Faculty Management</CardTitle>
          <CardDescription>Add, edit, or remove faculty members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button onClick={handleAddNew} disabled={isEditing || isAdding}>
              Add New Teacher
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faculty.map((teacher) => (
                  <TableRow key={teacher._id}>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleSelectTeacher(teacher)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(teacher._id as string)}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {(isEditing || isAdding) && (
        <Card>
          <CardHeader>
            <CardTitle>{isAdding ? "Add New Teacher" : "Edit Teacher"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={previewUrl || "/placeholder.svg"}
                      alt="Teacher"
                      width={320}
                      height={320}
                      className="h-64 w-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-photo">Upload Photo</Label>
                    <Input id="teacher-photo" type="file" accept="image/*" onChange={handleFileChange} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Teacher Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

