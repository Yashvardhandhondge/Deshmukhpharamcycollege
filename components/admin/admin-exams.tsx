"use client"

import type React from "react"

import { useState, useEffect, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import type { Exam } from "@/lib/models"
import { formatDate } from "@/lib/utils"

export default function AdminExams() {
  const { toast } = useToast()
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Exam>({
    subject: "",
    date: "",
    time: "",
  })

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      const response = await fetch("/api/exams")
      if (response.ok) {
        const data = await response.json()
        setExams(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch exam data",
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddNew = () => {
    setFormData({
      subject: "",
      date: "",
      time: "",
    })
    setIsEditing(true)
  }

  const handleEdit = (exam: Exam) => {
    setFormData(exam)
    setIsEditing(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch("/api/exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save exam data")
      }

      toast({
        title: "Success",
        description: formData._id ? "Exam updated successfully" : "Exam added successfully",
      })

      // Refresh exams list
      fetchExams()

      // Reset form
      setIsEditing(false)
      setFormData({
        subject: "",
        date: "",
        time: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save exam information",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exam?")) {
      return
    }

    try {
      const response = await fetch("/api/exams", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete exam")
      }

      toast({
        title: "Success",
        description: "Exam deleted successfully",
      })

      // Refresh exams list
      fetchExams()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete exam",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      subject: "",
      date: "",
      time: "",
    })
  }

  if (loading) {
    return <div>Loading exam data...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Examination Schedule</CardTitle>
          <CardDescription>Manage upcoming examination dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button onClick={handleAddNew} disabled={isEditing}>
              Add New Exam
            </Button>
          </div>

          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>{formData._id ? "Edit Exam" : "Add New Exam"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      name="time"
                      placeholder="e.g., 10:00 AM - 1:00 PM"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
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
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam._id}>
                      <TableCell className="font-medium">{exam.subject}</TableCell>
                      <TableCell>{formatDate(exam.date)}</TableCell>
                      <TableCell>{exam.time}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(exam)}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(exam._id as string)}>
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

