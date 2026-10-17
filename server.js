require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const Project = mongoose.model('Project', new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  highlights: [String],
  tech: [String],
  category: String,
  link: String,
  order: { type: Number, default: 0 }
}));

const Message = mongoose.model('Message', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}));

const seed = [
  {
    "title": "Nexus Remote — Remote Control Application",
    "category": "Mobile",
    "tech": [
      "Flutter",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "WebSocket"
    ],
    "description": "Mobile-to-computer remote-control application with a Flutter mobile client and Spring Boot backend.",
    "highlights": [
      "Device pairing, REST APIs, real-time WebSocket communication, client registration, mouse movement and remote command handling.",
      "PostgreSQL for device and pairing data; tested on iPhone with a LAN-based backend."
    ],
    "order": 1
  },
  {
    "title": "Task Management System",
    "category": "Full-Stack",
    "tech": [
      "React",
      "Spring Boot",
      "PostgreSQL",
      "REST API"
    ],
    "description": "Full-stack task management application with authentication, task creation, status, priority, due dates and user-specific task data.",
    "highlights": [
      "REST APIs in Spring Boot, connected to the React frontend through Axios with token-based request handling.",
      "PostgreSQL persistence, prepared for cloud deployment."
    ],
    "order": 2
  },
  {
    "title": "Expense Tracker",
    "category": "Python",
    "tech": [
      "Python"
    ],
    "description": "Expense tracking application to record, organize and manage personal expense information.",
    "highlights": [
      "Data entry and tracking workflows that make spending records easier to maintain and review.",
      "Designed as a practical application for managing day-to-day financial records."
    ],
    "order": 3
  },
  {
    "title": "Fitness Tracker",
    "category": "Web",
    "tech": [
      "Next.js",
      "TypeScript"
    ],
    "description": "Fitness-tracking web application built with Next.js and TypeScript and a structured modern frontend.",
    "highlights": [
      "Reusable components and pages supporting fitness-related tracking workflows.",
      "Maintained with Git/GitHub and deployed on Vercel."
    ],
    "order": 4
  },
  {
    "title": "CourseSys — Course Registration System",
    "category": "Web",
    "tech": [
      "Web Development",
      "Authentication",
      "Database"
    ],
    "description": "Course registration application supporting student authentication, course enrollment and course management.",
    "highlights": [
      "Workflows for students and course data, focused on usability and efficient record management."
    ],
    "order": 5
  },
  {
    "title": "Student Management System",
    "category": "Application",
    "tech": [
      "Application Development",
      "Database"
    ],
    "description": "Application to manage student records, attendance and academic information efficiently.",
    "highlights": [
      "Structured data management workflows for maintaining student information."
    ],
    "order": 6
  },
  {
    "title": "Hotel Management System",
    "category": "C++",
    "tech": [
      "C++"
    ],
    "description": "C++ application for hotel bookings, customer records, room allocation and billing.",
    "highlights": [
      "Menu-driven workflows that simplify common hotel management operations."
    ],
    "order": 7
  },
  {
    "title": "Calculator",
    "category": "Web",
    "tech": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "description": "Responsive calculator interface, deployed through Vercel.",
    "highlights": [],
    "order": 8
  },
  {
    "title": "Music Player",
    "category": "Web",
    "tech": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "description": "Browser-based music player projects demonstrating frontend UI and JavaScript interaction.",
    "highlights": [],
    "order": 9
  },
  {
    "title": "Banking Management System",
    "category": "Application",
    "tech": [
      "Database"
    ],
    "description": "Banking management project focused on handling banking-related records and operations.",
    "highlights": [],
    "order": 10
  }
];

app.get('/api/projects', async (req, res) => {
  try { res.json(await Project.find().sort('order')); }
  catch { res.status(500).json({ error: 'Could not load projects.' }); }
});

// Add a project: send header x-admin-key matching ADMIN_KEY in .env
app.post('/api/projects', async (req, res) => {
  if (!process.env.ADMIN_KEY || req.get('x-admin-key') !== process.env.ADMIN_KEY)
    return res.status(401).json({ error: 'Invalid admin key.' });
  const { title, description, highlights, tech, category, link } = req.body || {};
  if (!title) return res.status(400).json({ error: 'Title is required.' });
  try {
    const order = (await Project.countDocuments()) + 1;
    res.status(201).json(await Project.create({ title, description, highlights, tech, category, link, order }));
  } catch { res.status(500).json({ error: 'Could not add the project.' }); }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email and message are required.' });
  try { await Message.create({ name, email, message }); res.status(201).json({ ok: true }); }
  catch { res.status(500).json({ error: 'Could not send your message.' }); }
});

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  if (!(await Project.countDocuments())) await Project.insertMany(seed);
  app.listen(process.env.PORT || 3000, () => console.log('Portfolio running'));
})();
