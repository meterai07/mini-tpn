# 📦 mini-tpn

An Express.js application with MongoDB that allows users to create partnerships and upload attachments, which are stored in the `uploads` folder. The project is containerized using Docker for easy deployment.

---

## 🚀 **Features**
- User can register and log in
- CRUD operations for partnerships
- Upload attachments using Multer (stored in `uploads` folder)
- MongoDB as the database
- Dockerized with `Dockerfile` and `docker-compose`
- Environment variables managed using `.env` and `env.example`

---

## 🗂 **Project Structure**
```plaintext
mini-tpn
├── Dockerfile
├── docker-compose.yml
├── env.example
├── uploads/          # Directory for uploaded files
├── src
│   ├── controllers   # Business logic
│   ├── database
│   │   └── schemas   # Database schemas
│   ├── middlewares   # Middleware functions
│   ├── repositories  # Data access layer
│   ├── routes        # API routes
│   └── utils         # Utility functions
├── server.js         # Application entry point
└── README.md
```

---

## 📝 **Prerequisites**
- Node.js
- Docker & Docker Compose

---

## ⚙️ **Environment Variables**
Create a `.env` file based on `env.example` and set the following variables:
```env
PORT=3000
SECRET_KEY=secret
MONGODB_URI=mongodb://mongo:27017/mini-tpn
JWT_SECRET=secret
UPLOAD_DIR=uploads
```

---

## 💾 **Installation and Usage**

### **1. Local Development (without Docker)**
```bash
# Install dependencies
npm install

# Start the application
npm run dev
```

---

### **2. Using Docker**
```bash
# Build and run containers
docker compose up --build

# Stop containers
docker compose down
```

---

## ✅ **API Endpoints**
### **User Routes**
| Method | Endpoint                | Description               |
|--------|-------------------------|---------------------------|
| POST  | `/api/users/register`   | Register a new user       |
| POST  | `/api/users/login`      | Log in a user             |

### **Partnership Routes**
| Method | Endpoint                              | Description                                      |
|--------|--------------------------------------|------------------------------------------------|
| GET    | `/api/partnerships`                  | Retrieve partnerships (filter by title, status)|
| GET    | `/api/partnerships/:id`              | Retrieve partnership by ID                     |
| POST   | `/api/partnership`                   | Create a new partnership                       |
| PUT    | `/api/partnership/:id`               | Update a partnership by ID                     |
| DELETE | `/api/partnership`                   | Delete a partnership                           |

---

## 🐳 **Docker Compose Overview**
- The `docker-compose.yml` includes services for:
  - **Express.js app** using the Dockerfile
  - **MongoDB** as the database

---

## 🛡 **Security Tips**
- Do not commit your `.env` file.
- Use environment variables for sensitive data.

---

## ✨ **Contributing**
Feel free to submit issues or pull requests to enhance the project!

---

## 📄 **License**
This project is licensed under the MIT License.