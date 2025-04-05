import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold">Deshmukh College Of Pharmacy</h3>
            <p className="text-sm text-slate-300">Approved by PCI, Affiliated to MSBTE</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-white">
                  Faculty
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/examination" className="hover:text-white">
                  Examination
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="rounded-full bg-slate-800 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-slate-800 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-slate-800 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-slate-800 p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Deshmukh College Of Pharmacy. All rights reserved.</p>

        </div>
      </div>
    </footer>
  )
}

