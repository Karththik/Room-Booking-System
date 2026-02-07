# Room Service – Backend API

This is the backend service for the **Room Booking / Room Service System**.
It is built using **Node.js, Express, MongoDB, and Mongoose** and provides user authentication (Register & Login).

---

## 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB (Local / Atlas)
* Mongoose
* bcryptjs (password hashing)
* dotenv (environment variables)
* nodemon (development)

---

## 📁 Project Structure

```
room-service/
├── src/
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.routes.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGO_URL=mongodb://localhost:27017/room-service
JWT_SECRET=supersecret
```

---

## 📦 Install Dependencies

Run the following command inside the project folder:

```
npm install
```

If bcryptjs is missing:

```
npm install bcryptjs
```

---

## ▶️ Run the Server

### Development mode

```
npm run dev
```

### Production mode

```
npm start
```

Expected output:

```
✅ MongoDB connected
🚀 Server running on port 3000
```

---

## 🔐 Authentication APIs

### 1️⃣ Register User

**POST** `/api/auth/register`

**Request Body (JSON):**

```
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Response:**

```
{
  "message": "User registered successfully",
  "userId": "65fxxxx"
}
```

---

### 2️⃣ Login User

**POST** `/api/auth/login`

**Request Body (JSON):**

```
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Response:**

```
{
  "message": "Login successful",
  "userId": "65fxxxx"
}
```

---

## 🗄️ Database

* Database Name: `room-service`
* Collection: `users`

Passwords are stored **hashed** using bcryptjs.

---

## 🧪 Testing

You can test APIs using:

* Postman
* Thunder Client (VS Code)

---

## 📌 Notes

* MongoDB connection is handled in `server.js`
* Controllers only contain business logic
* Routes connect APIs to controllers
* This project follows MVC architecture

---

## 📈 Future Improvements

* JWT authentication
* Role-based access control
* Room booking APIs
* Docker support
* API validation (Joi / Zod)

---

## 👨‍💻 Author

Developed as a **University Project** for learning full‑stack web development.

---

✅ Ready for academic submission and real‑world extension.
