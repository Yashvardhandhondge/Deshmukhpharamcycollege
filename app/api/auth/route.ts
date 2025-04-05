import { type NextRequest, NextResponse } from "next/server"

// Simple authentication for admin access
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    // Simple password check (hardcoded as per requirements)
    if (password === "admin123") {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 500 })
  }
}

