# Room Service – Backend API

This is the backend service for the **Room Booking System**.
It is built using **Node.js, Express, MongoDB, and Mongoose** and provides APIs for:

* User authentication
* Property management
* Room management
* Bed management
* Booking workflow
* Image uploads
* Role-based access control

This backend follows a **RESTful API architecture** and uses **JWT authentication**.

---

# 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (Authentication)
* bcryptjs (Password hashing)
* multer (Image upload)
* dotenv (Environment variables)
* nodemon (Development server)

---

# 📁 Project Structure

```
room-service/
├── public/
│   └── uploads/              # Uploaded images
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── property.controller.js
│   │   ├── room.controller.js
│   │   ├── bed.controller.js
│   │   └── booking.controller.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Property.js
│   │   ├── Room.js
│   │   ├── Bed.js
│   │   └── Booking.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── property.routes.js
│   │   ├── room.routes.js
│   │   ├── bed.routes.js
│   │   └── booking.routes.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── upload.middleware.js
│   │
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
MONGO_URL=mongodb://localhost:27017/room-service
JWT_SECRET=supersecret
```

---

# 📦 Install Dependencies

Inside the project folder:

```
npm install
```

If packages are missing:

```
npm install express mongoose bcryptjs jsonwebtoken multer cors dotenv
```

---

# ▶️ Run the Server

### Development Mode

```
npm run dev
```

### Production Mode

```
npm start
```

Expected output:

```
MongoDB connected
Server running on port 3000
```

---

# 🔐 Authentication APIs

## Register User

POST `/api/auth/register`

Request Body:

```
{
 "firstName": "John",
 "lastName": "Doe",
 "email": "john@gmail.com",
 "phone": "0771234567",
 "address": "Jaffna",
 "identityNumber": "123456789V",
 "role": "student",
 "password": "123456"
}
```

---

## Login

POST `/api/auth/login`

```
{
 "email": "john@gmail.com",
 "password": "123456"
}
```

Response:

```
{
 "token": "JWT_TOKEN",
 "user": {
   "id": "USER_ID",
   "role": "student"
 }
}
```

---

# 🏠 Property APIs

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| POST   | `/api/property/create` | Create property    |
| GET    | `/api/property`        | Get all properties |
| GET    | `/api/property/:id`    | Get property by ID |
| PUT    | `/api/property/:id`    | Update property    |
| DELETE | `/api/property/:id`    | Delete property    |

Property includes:

* title
* location
* propertyType (FULL / ROOM / BED)
* genderAllowed
* price
* images

---

# 🚪 Room APIs

| Method | Endpoint                       |
| ------ | ------------------------------ |
| POST   | `/api/room/create/:propertyId` |
| GET    | `/api/room`                    |
| GET    | `/api/room/:id`                |
| PUT    | `/api/room/:id`                |
| DELETE | `/api/room/:id`                |
| GET    | `/api/room/search`             |
| GET    | `/api/room/available`          |

---

# 🛏 Bed APIs

| Method | Endpoint                  |
| ------ | ------------------------- |
| POST   | `/api/bed/create/:roomId` |
| GET    | `/api/bed`                |
| GET    | `/api/bed/:id`            |
| PUT    | `/api/bed/:id`            |
| DELETE | `/api/bed/:id`            |
| GET    | `/api/bed/search`         |
| GET    | `/api/bed/available`      |

---

# 📅 Booking APIs

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| POST   | `/api/booking/create`        | Create booking request |
| GET    | `/api/booking/my`            | User bookings          |
| GET    | `/api/booking/owner/pending` | Owner pending bookings |
| PUT    | `/api/booking/confirm/:id`   | Confirm booking        |
| PUT    | `/api/booking/reject/:id`    | Reject booking         |
| PUT    | `/api/booking/cancel/:id`    | Cancel booking         |

---

# 🔄 Booking Workflow

User booking process:

```
User books room/bed
        ↓
Status = PENDING
        ↓
Owner reviews booking
        ↓
Owner CONFIRM or REJECT
```

If confirmed:

```
Room / Bed becomes unavailable
```

If rejected:

```
Room / Bed remains available
```

If cancelled:

```
Availability restored
```

---

# 📷 Image Upload

Images are uploaded using **multer** and stored in:

```
public/uploads
```

Image types:

| Model    | Images          |
| -------- | --------------- |
| Property | Multiple images |
| Room     | 2–3 images      |
| Bed      | 1–2 images      |

Access image:

```
http://localhost:3000/uploads/image.jpg
```

---

# 🔎 Search APIs

Users can search by:

* Location
* Price range
* Gender
* Room capacity
* Availability

Example:

```
GET /api/room/search?location=jaffna&minPrice=2000&maxPrice=5000
```

---

# 🗄 Database

Database: `room-service`

Collections:

* users
* properties
* rooms
* beds
* bookings

Relationships:

```
Property
   └── Rooms
        └── Beds
```

---

# 🧪 Testing

You can test APIs using:

* Postman
* Thunder Client
* cURL

---

# 📈 Future Improvements

* Payment integration
* Notification system
* Reviews & ratings
* Admin dashboard
* Docker deployment
* Cloud image storage (AWS S3 / Cloudinary)

---

# 👨‍💻 Author

Developed as a **University Project** for learning full-stack web development.

---

✔ RESTful API
✔ JWT Authentication
✔ Role-based authorization
✔ Booking workflow
✔ Image upload support
