import { type NextRequest, NextResponse } from "next/server"
import { getGallery, addGalleryImage, deleteGalleryImage } from "@/lib/models"
import { initializeDatabase } from "@/lib/models"

export async function GET() {
  try {
    await initializeDatabase()
    const gallery = await getGallery()
    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ error: "Failed to fetch gallery data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const image = await request.json()
    const newImage = await addGalleryImage(image)
    return NextResponse.json(newImage)
  } catch (error) {
    console.error("Error adding gallery image:", error)
    return NextResponse.json({ error: "Failed to add gallery image" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await deleteGalleryImage(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting gallery image:", error)
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 })
  }
}

