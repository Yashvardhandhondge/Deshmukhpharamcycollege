import { type NextRequest, NextResponse } from "next/server"
import { getPrincipal, updatePrincipal, type Principal } from "@/lib/models"
import { initializeDatabase } from "@/lib/models"

export async function GET() {
  try {
    await initializeDatabase()
    const principal = await getPrincipal()
    return NextResponse.json(principal)
  } catch (error) {
    console.error("Error fetching principal:", error)
    return NextResponse.json({ error: "Failed to fetch principal data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const principal = (await request.json()) as Principal
    const updatedPrincipal = await updatePrincipal(principal)
    return NextResponse.json(updatedPrincipal)
  } catch (error) {
    console.error("Error updating principal:", error)
    return NextResponse.json({ error: "Failed to update principal" }, { status: 500 })
  }
}

