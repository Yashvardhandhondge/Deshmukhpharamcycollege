import { type NextRequest, NextResponse } from "next/server"
import { getImageById } from "@/lib/models"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id =await  params.id
    const image = await getImageById(id)

    if (!image) {
      return new NextResponse(null, { status: 404 })
    }

    return new NextResponse(image.data, {
      headers: {
        "Content-Type": image.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error fetching image:", error)
    return new NextResponse(null, { status: 500 })
  }
}

