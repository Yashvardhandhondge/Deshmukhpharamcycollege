import { type NextRequest, NextResponse } from "next/server"
import { uploadImage, deleteImage } from "@/lib/models"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string
    const oldImageId = formData.get("oldImageId") as string | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate a unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const filename = `${type}_${timestamp}_${randomString}_${file.name}`

    // Upload the file to GridFS
    const imageId = await uploadImage(buffer, filename, file.type)

    // Delete the old image if it exists
    if (oldImageId) {
      try {
        await deleteImage(oldImageId)
      } catch (error) {
        console.error("Failed to delete old image:", error)
        // Continue even if old image deletion fails
      }
    }

    // Return the ID of the uploaded file
    return NextResponse.json({ success: true, imageId })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

