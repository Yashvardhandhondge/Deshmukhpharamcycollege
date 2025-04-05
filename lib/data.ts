import fs from "fs"
import path from "path"

// Define types
export interface Teacher {
  id: string
  name: string
  subject: string
  image: string
}

export interface Principal {
  name: string
  message: string
  image: string
}

export interface Exam {
  id: string
  subject: string
  date: string
  time: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
}

// Define paths
const dataDirectory = path.join(process.cwd(), "data")
const facultyFilePath = path.join(dataDirectory, "faculty.json")
const principalFilePath = path.join(dataDirectory, "principal.json")
const examsFilePath = path.join(dataDirectory, "exams.json")
const galleryFilePath = path.join(dataDirectory, "gallery.json")

// Ensure data directory exists
export function ensureDataDirectoryExists() {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true })
  }

  // Ensure public image directories exist
  const imageDirectories = [
    path.join(process.cwd(), "public", "images"),
    path.join(process.cwd(), "public", "images", "faculty"),
    path.join(process.cwd(), "public", "images", "gallery"),
  ]

  imageDirectories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })

  // Create default data files if they don't exist
  if (!fs.existsSync(facultyFilePath)) {
    fs.writeFileSync(
      facultyFilePath,
      JSON.stringify(
        [
          {
            id: "1",
            name: "Dr. Rajesh Sharma",
            subject: "Pharmaceutics",
            image: "/images/faculty/default.png",
          },
          {
            id: "2",
            name: "Dr. Priya Patel",
            subject: "Pharmacology",
            image: "/images/faculty/default.png",
          },
          {
            id: "3",
            name: "Prof. Amit Desai",
            subject: "Pharmaceutical Chemistry",
            image: "/images/faculty/default.png",
          },
          {
            id: "4",
            name: "Dr. Sunita Joshi",
            subject: "Pharmacognosy",
            image: "/images/faculty/default.png",
          },
          {
            id: "5",
            name: "Prof. Rahul Verma",
            subject: "Biochemistry",
            image: "/images/faculty/default.png",
          },
          {
            id: "6",
            name: "Dr. Neha Singh",
            subject: "Human Anatomy & Physiology",
            image: "/images/faculty/default.png",
          },
        ],
        null,
        2,
      ),
    )
  }

  if (!fs.existsSync(principalFilePath)) {
    fs.writeFileSync(
      principalFilePath,
      JSON.stringify(
        {
          name: "Dr. Rajesh Sharma, M.Pharm, Ph.D.",
          message:
            "Welcome to Deshmukh College Of Pharmacy. Our institution is committed to excellence in pharmaceutical education. We strive to provide our students with the knowledge, skills, and values necessary to excel in the field of pharmacy.",
          image: "/images/principal.png",
        },
        null,
        2,
      ),
    )
  }

  if (!fs.existsSync(examsFilePath)) {
    fs.writeFileSync(
      examsFilePath,
      JSON.stringify(
        [
          {
            id: "1",
            subject: "Pharmaceutics - I",
            date: "2025-05-10",
            time: "10:00 AM - 1:00 PM",
          },
          {
            id: "2",
            subject: "Pharmaceutical Chemistry - I",
            date: "2025-05-12",
            time: "10:00 AM - 1:00 PM",
          },
          {
            id: "3",
            subject: "Pharmacognosy",
            date: "2025-05-14",
            time: "10:00 AM - 1:00 PM",
          },
          {
            id: "4",
            subject: "Biochemistry & Clinical Pathology",
            date: "2025-05-16",
            time: "10:00 AM - 1:00 PM",
          },
          {
            id: "5",
            subject: "Human Anatomy & Physiology",
            date: "2025-05-18",
            time: "10:00 AM - 1:00 PM",
          },
          {
            id: "6",
            subject: "Health Education & Community Pharmacy",
            date: "2025-05-20",
            time: "10:00 AM - 1:00 PM",
          },
        ],
        null,
        2,
      ),
    )
  }

  if (!fs.existsSync(galleryFilePath)) {
    fs.writeFileSync(
      galleryFilePath,
      JSON.stringify(
        [
          {
            id: "1",
            src: "/images/gallery/campus.jpg",
            alt: "College Building",
          },
          {
            id: "2",
            src: "/images/gallery/lab.jpg",
            alt: "Laboratory",
          },
          {
            id: "3",
            src: "/images/gallery/library.jpg",
            alt: "Library",
          },
          {
            id: "4",
            src: "/images/gallery/classroom.jpg",
            alt: "Classroom",
          },
        ],
        null,
        2,
      ),
    )
  }
}

// Faculty data functions
export async function getFaculty(): Promise<Teacher[]> {
  ensureDataDirectoryExists()
  const fileContents = fs.readFileSync(facultyFilePath, "utf8")
  return JSON.parse(fileContents)
}

export async function updateFaculty(faculty: Teacher[]): Promise<void> {
  ensureDataDirectoryExists()
  fs.writeFileSync(facultyFilePath, JSON.stringify(faculty, null, 2))
}

export async function updateTeacher(teacher: Teacher): Promise<void> {
  const faculty = await getFaculty()
  const index = faculty.findIndex((t) => t.id === teacher.id)

  if (index !== -1) {
    faculty[index] = teacher
  } else {
    faculty.push(teacher)
  }

  await updateFaculty(faculty)
}

export async function deleteTeacher(id: string): Promise<void> {
  const faculty = await getFaculty()
  const teacher = faculty.find((t) => t.id === id)

  if (teacher && teacher.image !== "/images/faculty/default.png") {
    const imagePath = path.join(process.cwd(), "public", teacher.image)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }
  }

  await updateFaculty(faculty.filter((t) => t.id !== id))
}

// Principal data functions
export async function getPrincipal(): Promise<Principal> {
  ensureDataDirectoryExists()
  const fileContents = fs.readFileSync(principalFilePath, "utf8")
  return JSON.parse(fileContents)
}

export async function updatePrincipal(principal: Principal): Promise<void> {
  ensureDataDirectoryExists()
  fs.writeFileSync(principalFilePath, JSON.stringify(principal, null, 2))
}

// Exam data functions
export async function getExams(): Promise<Exam[]> {
  ensureDataDirectoryExists()
  const fileContents = fs.readFileSync(examsFilePath, "utf8")
  return JSON.parse(fileContents)
}

export async function updateExams(exams: Exam[]): Promise<void> {
  ensureDataDirectoryExists()
  fs.writeFileSync(examsFilePath, JSON.stringify(exams, null, 2))
}

export async function addExam(exam: Omit<Exam, "id">): Promise<Exam> {
  const exams = await getExams()
  const newExam = {
    ...exam,
    id: Date.now().toString(),
  }

  exams.push(newExam)
  await updateExams(exams)
  return newExam
}

export async function updateExam(exam: Exam): Promise<void> {
  const exams = await getExams()
  const index = exams.findIndex((e) => e.id === exam.id)

  if (index !== -1) {
    exams[index] = exam
    await updateExams(exams)
  }
}

export async function deleteExam(id: string): Promise<void> {
  const exams = await getExams()
  await updateExams(exams.filter((e) => e.id !== id))
}

// Gallery data functions
export async function getGallery(): Promise<GalleryImage[]> {
  ensureDataDirectoryExists()
  const fileContents = fs.readFileSync(galleryFilePath, "utf8")
  return JSON.parse(fileContents)
}

export async function updateGallery(gallery: GalleryImage[]): Promise<void> {
  ensureDataDirectoryExists()
  fs.writeFileSync(galleryFilePath, JSON.stringify(gallery, null, 2))
}

export async function addGalleryImage(image: Omit<GalleryImage, "id">): Promise<GalleryImage> {
  const gallery = await getGallery()
  const newImage = {
    ...image,
    id: Date.now().toString(),
  }

  gallery.push(newImage)
  await updateGallery(gallery)
  return newImage
}

export async function deleteGalleryImage(id: string): Promise<void> {
  const gallery = await getGallery()
  const image = gallery.find((img) => img.id === id)

  if (image) {
    const imagePath = path.join(process.cwd(), "public", image.src)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }
  }

  await updateGallery(gallery.filter((img) => img.id !== id))
}

