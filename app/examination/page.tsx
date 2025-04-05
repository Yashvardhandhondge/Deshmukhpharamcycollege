"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Exam } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export default function ExaminationPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("/api/exams")
        if (response.ok) {
          const data = await response.json()
          setExams(data)
        } else {
          console.error("Failed to fetch exam data")
        }
      } catch (error) {
        console.error("Error fetching exam data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExams()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p>Loading examination schedule...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Examination Schedule</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">Stay updated with upcoming examination dates</p>
        </div>
      </section>

      {/* Exam Schedule */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.subject}</TableCell>
                    <TableCell>{formatDate(exam.date)}</TableCell>
                    <TableCell>{exam.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Exam Instructions */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Examination Instructions</h2>
          <div className="mx-auto max-w-3xl space-y-4 text-muted-foreground">
            <p>
              <strong>1. Timing:</strong> Students should arrive at the examination hall at least 30 minutes before the
              scheduled time.
            </p>
            <p>
              <strong>2. Required Documents:</strong> Students must bring their college ID card and examination hall
              ticket.
            </p>
            <p>
              <strong>3. Materials:</strong> Only blue or black pens are allowed. No electronic devices, including
              mobile phones, are permitted in the examination hall.
            </p>
            <p>
              <strong>4. Conduct:</strong> Any form of malpractice will result in disqualification from the examination.
            </p>
            <p>
              <strong>5. Absence:</strong> Students unable to attend an examination due to illness must submit a medical
              certificate within three days of the examination.
            </p>
            <p>
              <strong>6. Results:</strong> Examination results will be announced within four weeks of the completion of
              all examinations.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

