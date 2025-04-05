import { ObjectId } from "mongodb"
import { getDb, getGridFS } from "./mongodb"
import { Readable } from "stream"

// Define types
export interface Teacher {
  _id?: string | ObjectId
  name: string
  subject: string
  imageId?: string | ObjectId
}

export interface Principal {
  _id?: string | ObjectId
  name: string
  message: string
  imageId?: string | ObjectId
}

export interface Exam {
  _id?: string | ObjectId
  subject: string
  date: string
  time: string
}

export interface GalleryImage {
  _id?: string | ObjectId
  alt: string
  imageId?: string | ObjectId
}

// Faculty data functions
export async function getFaculty(): Promise<Teacher[]> {
  const db = await getDb()
  const faculty = await db.collection("faculty").find().toArray()
  return faculty.map((teacher) => ({
    ...teacher,
    _id: teacher._id.toString(),
  }))
}

export async function getTeacher(id: string): Promise<Teacher | null> {
  const db = await getDb()
  const teacher = await db.collection("faculty").findOne({ _id: new ObjectId(id) })
  if (!teacher) return null
  return {
    ...teacher,
    _id: teacher._id.toString(),
  }
}

export async function updateTeacher(teacher: Teacher): Promise<Teacher> {
  const db = await getDb()

  if (teacher._id) {
    // Update existing teacher
    const { _id, ...teacherData } = teacher
    await db.collection("faculty").updateOne({ _id: new ObjectId(_id.toString()) }, { $set: teacherData })
    return teacher
  } else {
    // Add new teacher
    const result = await db.collection("faculty").insertOne(teacher)
    return {
      ...teacher,
      _id: result.insertedId.toString(),
    }
  }
}

export async function deleteTeacher(id: string): Promise<void> {
  const db = await getDb()
  const gridFS = await getGridFS()

  // Get the teacher to find the image ID
  const teacher = await db.collection("faculty").findOne({ _id: new ObjectId(id) })

  // Delete the teacher's image if it exists
  if (teacher && teacher.imageId) {
    try {
      await gridFS.delete(new ObjectId(teacher.imageId))
    } catch (error) {
      console.error("Failed to delete image:", error)
    }
  }

  // Delete the teacher
  await db.collection("faculty").deleteOne({ _id: new ObjectId(id) })
}

// Principal data functions
export async function getPrincipal(): Promise<Principal> {
  const db = await getDb()
  const principal = await db.collection("principal").findOne({})

  if (!principal) {
    // Create default principal if none exists
    const defaultPrincipal: Principal = {
      name: "Dr. Rajesh Sharma, M.Pharm, Ph.D.",
      message:
        "Welcome to Deshmukh College Of Pharmacy. Our institution is committed to excellence in pharmaceutical education. We strive to provide our students with the knowledge, skills, and values necessary to excel in the field of pharmacy.",
      imageId: "",
    }

    await db.collection("principal").insertOne(defaultPrincipal)
    return defaultPrincipal
  }

  return {
    ...principal,
    _id: principal._id.toString(),
  }
}

export async function updatePrincipal(principal: Principal): Promise<Principal> {
  const db = await getDb()

  if (principal._id) {
    // Update existing principal
    const { _id, ...principalData } = principal
    await db.collection("principal").updateOne({ _id: new ObjectId(_id.toString()) }, { $set: principalData })
  } else {
    // Insert new principal
    await db.collection("principal").insertOne(principal)
  }

  return principal
}

// Exam data functions
export async function getExams(): Promise<Exam[]> {
  const db = await getDb()
  const exams = await db.collection("exams").find().toArray()
  return exams.map((exam) => ({
    ...exam,
    _id: exam._id.toString(),
  }))
}

export async function addExam(exam: Omit<Exam, "_id">): Promise<Exam> {
  const db = await getDb()
  const result = await db.collection("exams").insertOne(exam)
  return {
    ...exam,
    _id: result.insertedId.toString(),
  }
}

export async function updateExam(exam: Exam): Promise<Exam> {
  const db = await getDb()
  const { _id, ...examData } = exam
  await db.collection("exams").updateOne({ _id: new ObjectId(_id!.toString()) }, { $set: examData })
  return exam
}

export async function deleteExam(id: string): Promise<void> {
  const db = await getDb()
  await db.collection("exams").deleteOne({ _id: new ObjectId(id) })
}

// Gallery data functions
export async function getGallery(): Promise<GalleryImage[]> {
  const db = await getDb()
  const gallery = await db.collection("gallery").find().toArray()
  return gallery.map((image) => ({
    ...image,
    _id: image._id.toString(),
  }))
}

export async function addGalleryImage(image: Omit<GalleryImage, "_id">): Promise<GalleryImage> {
  const db = await getDb()
  const result = await db.collection("gallery").insertOne(image)
  return {
    ...image,
    _id: result.insertedId.toString(),
  }
}

export async function deleteGalleryImage(id: string): Promise<void> {
  const db = await getDb()
  const gridFS = await getGridFS()

  // Get the image to find the image ID
  const image = await db.collection("gallery").findOne({ _id: new ObjectId(id) })

  // Delete the image file if it exists
  if (image && image.imageId) {
    try {
      await gridFS.delete(new ObjectId(image.imageId))
    } catch (error) {
      console.error("Failed to delete image:", error)
    }
  }

  // Delete the gallery entry
  await db.collection("gallery").deleteOne({ _id: new ObjectId(id) })
}

// Image handling functions
export async function uploadImage(file: Buffer, filename: string, contentType: string): Promise<string> {
  const gridFS = await getGridFS()

  // Create a readable stream from the buffer
  const readableStream = new Readable()
  readableStream.push(file)
  readableStream.push(null) // Signal the end of the stream

  // Upload the file to GridFS
  const uploadStream = gridFS.openUploadStream(filename, {
    contentType,
  })

  return new Promise((resolve, reject) => {
    readableStream
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", function () {
        resolve(this.id.toString())
      })
  })
}

export async function getImageById(id: string): Promise<{ data: Buffer; contentType: string } | null> {
  const gridFS = await getGridFS()

  try {
    // Find the file info
    const db = await getDb()
    const file = await db.collection("fs.files").findOne({ _id: new ObjectId(id) })

    if (!file) {
      return null
    }

    // Download the file
    const chunks: Buffer[] = []
    const downloadStream = gridFS.openDownloadStream(new ObjectId(id))

    return new Promise((resolve, reject) => {
      downloadStream.on("data", (chunk) => {
        chunks.push(Buffer.from(chunk))
      })

      downloadStream.on("error", (err) => {
        reject(err)
      })

      downloadStream.on("end", () => {
        resolve({
          data: Buffer.concat(chunks),
          contentType: file.contentType,
        })
      })
    })
  } catch (error) {
    console.error("Error getting image:", error)
    return null
  }
}

export async function deleteImage(id: string): Promise<void> {
  const gridFS = await getGridFS()
  await gridFS.delete(new ObjectId(id))
}

// Add College Building Image functions
export async function getCollegeBuildingImage(): Promise<{ imageId?: string } | null> {
  const db = await getDb();
  let record = await db.collection("collegeBuilding").findOne({});
  if (!record) {
    const defaultRecord = { imageId: "" };
    await db.collection("collegeBuilding").insertOne(defaultRecord);
    return defaultRecord;
  }
  return record;
}

export async function updateCollegeBuildingImage(imageId: string): Promise<void> {
  const db = await getDb();
  const record = await db.collection("collegeBuilding").findOne({});
  if (record) {
    await db.collection("collegeBuilding").updateOne({ _id: record._id }, { $set: { imageId } });
  } else {
    await db.collection("collegeBuilding").insertOne({ imageId });
  }
}

// Initialize database with default data if needed
export async function initializeDatabase() {
  const db = await getDb()

  // Check if principal exists
  const principalCount = await db.collection("principal").countDocuments()
  if (principalCount === 0) {
    await db.collection("principal").insertOne({
      name: "Dr. Rajesh Sharma, M.Pharm, Ph.D.",
      message:
        "Welcome to Deshmukh College Of Pharmacy. Our institution is committed to excellence in pharmaceutical education. We strive to provide our students with the knowledge, skills, and values necessary to excel in the field of pharmacy.",
      imageId: "",
    })
  }

  // Check if faculty exists
  const facultyCount = await db.collection("faculty").countDocuments()
  if (facultyCount === 0) {
    await db.collection("faculty").insertMany([
      {
        name: "Dr. Rajesh Sharma",
        subject: "Pharmaceutics",
        imageId: "",
      },
      {
        name: "Dr. Priya Patel",
        subject: "Pharmacology",
        imageId: "",
      },
      {
        name: "Prof. Amit Desai",
        subject: "Pharmaceutical Chemistry",
        imageId: "",
      },
      {
        name: "Dr. Sunita Joshi",
        subject: "Pharmacognosy",
        imageId: "",
      },
      {
        name: "Prof. Rahul Verma",
        subject: "Biochemistry",
        imageId: "",
      },
      {
        name: "Dr. Neha Singh",
        subject: "Human Anatomy & Physiology",
        imageId: "",
      },
    ])
  }

  // Check if exams exists
  const examsCount = await db.collection("exams").countDocuments()
  if (examsCount === 0) {
    await db.collection("exams").insertMany([
      {
        subject: "Pharmaceutics - I",
        date: "2025-05-10",
        time: "10:00 AM - 1:00 PM",
      },
      {
        subject: "Pharmaceutical Chemistry - I",
        date: "2025-05-12",
        time: "10:00 AM - 1:00 PM",
      },
      {
        subject: "Pharmacognosy",
        date: "2025-05-14",
        time: "10:00 AM - 1:00 PM",
      },
      {
        subject: "Biochemistry & Clinical Pathology",
        date: "2025-05-16",
        time: "10:00 AM - 1:00 PM",
      },
      {
        subject: "Human Anatomy & Physiology",
        date: "2025-05-18",
        time: "10:00 AM - 1:00 PM",
      },
      {
        subject: "Health Education & Community Pharmacy",
        date: "2025-05-20",
        time: "10:00 AM - 1:00 PM",
      },
    ])
  }

  // Initialize college building image record if absent
  const buildingCount = await db.collection("collegeBuilding").countDocuments();
  if (buildingCount === 0) {
    await db.collection("collegeBuilding").insertOne({ imageId: "" });
  }
}

