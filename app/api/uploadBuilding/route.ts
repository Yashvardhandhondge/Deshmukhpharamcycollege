import { NextResponse } from "next/server"
import { updateCollegeBuildingImage, uploadImage } from "@/lib/models"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }
    
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = file.name
    const contentType = file.type

    // Upload image via GridFS
    const imageId = await uploadImage(buffer, filename, contentType)
    // Update college building record
    await updateCollegeBuildingImage(imageId)

    return NextResponse.json({ success: true, imageId })
  } catch (error: any) {
    console.error("UploadBuilding error:", error)
    return NextResponse.json({ error: "Failed to upload building image" }, { status: 500 })
  }
}
