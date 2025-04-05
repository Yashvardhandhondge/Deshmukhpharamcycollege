import { type NextRequest, NextResponse } from "next/server"
import { getExams, addExam, updateExam, deleteExam, type Exam } from "@/lib/models"
import { initializeDatabase } from "@/lib/models"

export async function GET() {
  try {
    await initializeDatabase()
    const exams = await getExams()
    return NextResponse.json(exams)
  } catch (error) {
    console.error("Error fetching exams:", error)
    return NextResponse.json({ error: "Failed to fetch exam data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const exam = await request.json()

    if (exam._id) {
      // Update existing exam
      const updatedExam = await updateExam(exam as Exam)
      return NextResponse.json(updatedExam)
    } else {
      // Add new exam
      const newExam = await addExam(exam)
      return NextResponse.json(newExam)
    }
  } catch (error) {
    console.error("Error saving exam:", error)
    return NextResponse.json({ error: "Failed to save exam" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await deleteExam(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting exam:", error)
    return NextResponse.json({ error: "Failed to delete exam" }, { status: 500 })
  }
}

