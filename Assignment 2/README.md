# Assignment 2 – Student Management REST API

## Description
A simple REST API built with **Express.js** to manage student records using CRUD operations.  
Data is stored in an **in-memory array** (no database).

## Tech Stack
- Node.js
- Express.js
- Postman (for testing)

## Project Structure
```
Assignment 2/
├── app.js                  # Main server file
├── routes/
│   └── studentRoutes.js    # All student CRUD routes
├── middleware/
│   └── logger.js           # Custom logger middleware
├── data/
│   └── students.js         # In-memory student data
├── package.json
└── README.md
```

## How to Run
```bash
npm install
npm start
```
Server runs on `http://localhost:3000`

## API Endpoints

| Method | Endpoint         | Description           | Status Code |
|--------|------------------|-----------------------|-------------|
| GET    | /students        | Get all students      | 200         |
| GET    | /students/:id    | Get student by ID     | 200 / 404   |
| POST   | /students        | Add a new student     | 201 / 400   |
| PUT    | /students/:id    | Update student by ID  | 200 / 400 / 404 |
| DELETE | /students/:id    | Delete student by ID  | 200 / 404   |

## Sample POST Body (JSON)
```json
{
  "name": "Rahul Kumar",
  "age": 21,
  "course": "BCA"
}
```

## Host Link
NA
