"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/90"
      }`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image src="/logo.svg" alt="College Logo" width={48} height={48} className="object-cover" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold leading-tight">Deshmukh College Of Pharmacy</h1>
              <p className="text-xs text-muted-foreground">Approved by PCI, Affiliated to MSBTE</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="text-sm font-medium transition-colors hover:text-primary">
                  Faculty
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm font-medium transition-colors hover:text-primary">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/examination" className="text-sm font-medium transition-colors hover:text-primary">
                  Examination
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary">
                  Admin
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button className="block md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 block md:hidden">
            <ul className="flex flex-col space-y-4 pb-4">
              <li>
                <Link
                  href="/"
                  className="block text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/faculty"
                  className="block text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Faculty
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="block text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/examination"
                  className="block text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Examination
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="block text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

