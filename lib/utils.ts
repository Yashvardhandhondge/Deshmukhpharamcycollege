import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export function generateUniqueFilename(originalFilename: string): string {
  const extension = originalFilename.split(".").pop() || ""
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  return `${timestamp}-${randomString}.${extension}`
}

