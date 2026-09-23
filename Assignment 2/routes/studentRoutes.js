const express = require("express");
const router = express.Router();
const students = require("../data/students");

// GET /students - Get all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id - Get student by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

// POST /students - Add a new student
router.post("/", (req, res) => {
  const { name, age, course } = req.body;

  // Check if all fields are provided
  if (!name || !age || !course) {
    return res.status(400).json({ message: "All fields (name, age, course) are required" });
  }

  // Create new student with auto-generated ID
  const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;

  const newStudent = { id: newId, name, age, course };
  students.push(newStudent);

  res.status(201).json(newStudent);
});

// PUT /students/:id - Update a student by ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({ message: "All fields (name, age, course) are required" });
  }

  // Update the student details
  student.name = name;
  student.age = age;
  student.course = course;

  res.status(200).json(student);
});

// DELETE /students/:id - Delete a student by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deleted = students.splice(index, 1);
  res.status(200).json({ message: "Student deleted", student: deleted[0] });
});

module.exports = router;
