import { type NextRequest, NextResponse } from "next/server"
import { getFaculty, updateTeacher, deleteTeacher, type Teacher } from "@/lib/models"
import { initializeDatabase } from "@/lib/models"

export async function GET() {
  try {
    await initializeDatabase()
    const faculty = await getFaculty()
    return NextResponse.json(faculty)
  } catch (error) {
    console.error("Error fetching faculty:", error)
    return NextResponse.json({ error: "Failed to fetch faculty data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const teacher = (await request.json()) as Teacher
    const updatedTeacher = await updateTeacher(teacher)
    return NextResponse.json(updatedTeacher)
  } catch (error) {
    console.error("Error updating teacher:", error)
    return NextResponse.json({ error: "Failed to update teacher" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await deleteTeacher(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting teacher:", error)
    return NextResponse.json({ error: "Failed to delete teacher" }, { status: 500 })
  }
}

