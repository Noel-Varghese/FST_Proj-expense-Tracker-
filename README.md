# Expense Tracker

A mini full stack web application to record, view, edit and delete personal expenses.
Built for the Full Stack Technologies course (AAT-1: Portfolio-Driven Assessment).

## Objective
To demonstrate frontend, backend and database connectivity with all four CRUD operations (Create, Read, Update, Delete) through a REST API.

## Description
Users add expenses with a title, amount, category and date. The app lists them, shows a live total, and lets users filter by category, edit an entry or delete it. Data is stored permanently in MongoDB.

## Technologies
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- API: REST (JSON)
- Version control: Git and GitHub

## Project Structure
```
server.js            entry point and database connection
models/Expense.js    Mongoose schema
routes/expenses.js   CRUD REST endpoints
public/              frontend (index.html, style.css, app.js)
screenshots/         output screenshots
```

## Execution Steps
1. Install Node.js and have a MongoDB server running (local, a container, or MongoDB Atlas).
2. Clone the repository and open the folder.
3. Run `npm install`
4. Copy `.env.example` to `.env` and set `MONGO_URI` if it is not the local default.
5. Run `npm start`
6. Open http://localhost:5000 in a browser.

Quick local MongoDB using Podman:
```
podman run -d --name mongo -p 27017:27017 -v mongo-data:/data/db docker.io/library/mongo:8
```

## REST API
| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/expenses | Create an expense |
| GET | /api/expenses?category=Food | Read all expenses (optional filter) |
| PUT | /api/expenses/:id | Update an expense |
| DELETE | /api/expenses/:id | Delete an expense |

## Output
| Home page | Add expense |
|---|---|
| ![Home](screenshots/1-home.png) | ![Add](screenshots/2-add.png) |

| Edit mode | Category filter |
|---|---|
| ![Edit](screenshots/3-edit.png) | ![Filter](screenshots/4-filter.png) |

![Database](screenshots/5-database.png)
