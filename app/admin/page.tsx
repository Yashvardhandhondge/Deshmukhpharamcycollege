"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

// Dynamically import admin components
const AdminPrincipal = dynamic(() => import("@/components/admin/admin-principal"))
const AdminFaculty = dynamic(() => import("@/components/admin/admin-faculty"))
const AdminExams = dynamic(() => import("@/components/admin/admin-exams"))
const AdminGallery = dynamic(() => import("@/components/admin/admin-gallery"))

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        sessionStorage.setItem("adminAuthenticated", "true")
        setIsAuthenticated(true)
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel",
        })
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setPassword("")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated")
    setIsAuthenticated(false)
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    })
  }

  if (!isAuthenticated) {
    return (
      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Admin Login</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              Please enter your password to access the admin panel
            </p>
          </div>
        </section>

        <div className="flex min-h-[50vh] items-center justify-center py-12">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Enter your password to access the admin panel</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Admin Panel</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">Manage college content and information</p>
          <Button variant="outline" className="mt-4" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </section>

      {/* Admin Panel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="principal">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="principal">Principal</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="exams">Examinations</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="principal">
              <AdminPrincipal />
            </TabsContent>

            <TabsContent value="faculty">
              <AdminFaculty />
            </TabsContent>

            <TabsContent value="exams">
              <AdminExams />
            </TabsContent>

            <TabsContent value="gallery">
              <AdminGallery />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

