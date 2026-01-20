
import { storage } from "./storage";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function seed() {
  const existingUsers = await storage.getUsers();
  if (existingUsers.length > 0) {
    console.log("Database already seeded");
    return;
  }

  const password = await hashPassword("password123");

  // Admin
  await storage.createUser({
    name: "Sensei Admin",
    email: "admin@hajime.com",
    password,
    role: "admin",
    acceptedTerms: true,
    phone: "1234567890"
  });

  // Students
  const students = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Alice Johnson", email: "alice@example.com" },
    { name: "Bob Brown", email: "bob@example.com" },
    { name: "Charlie Davis", email: "charlie@example.com" },
    { name: "Diana Evans", email: "diana@example.com" },
  ];

  for (const student of students) {
    await storage.createUser({
      ...student,
      password,
      role: "student",
      acceptedTerms: true,
      phone: "0987654321"
    });
  }

  // Sessions
  const sessions = [
    { title: "Basics of Judo", date: new Date("2024-01-01T18:00:00"), startTime: "18:00", endTime: "20:00", instructor: "Sensei Admin", capacity: 20, description: "Introduction to Judo techniques." },
    { title: "Self Defense 101", date: new Date("2024-01-03T18:00:00"), startTime: "18:00", endTime: "20:00", instructor: "Sensei Admin", capacity: 20, description: "Basic self defense moves." },
    { title: "Advanced Throwing", date: new Date("2024-01-05T18:00:00"), startTime: "18:00", endTime: "20:00", instructor: "Sensei Admin", capacity: 15, description: "Advanced throwing techniques." },
    { title: "Sparring Session", date: new Date("2024-01-08T18:00:00"), startTime: "18:00", endTime: "20:00", instructor: "Sensei Admin", capacity: 10, description: "Practice sparring." },
  ];

  for (const session of sessions) {
    await storage.createSession(session);
  }

  // Announcements
  const announcements = [
    { title: "Welcome to Hajime Club!", body: "We are excited to start our new batch. Please be on time.", authorId: 1 },
    { title: "Gear Requirements", body: "Please bring your Gi to every session.", authorId: 1 },
    { title: "Holiday Schedule", body: "No classes on public holidays.", authorId: 1 },
  ];

  for (const announcement of announcements) {
    await storage.createAnnouncement(announcement);
  }

  console.log("Database seeded successfully");
}

seed().catch(console.error);
