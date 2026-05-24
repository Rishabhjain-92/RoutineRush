# 🏃‍♂️ RoutineRush - AI-Powered Gamified Routine & Habits Tracker

[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-Toolkit-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-FF6F00?logo=pwa&logoColor=white)](#-progressive-web-app-pwa-features)
[![Render Backend](https://img.shields.io/badge/Hosted_on-Render-46E3B7?logo=render&logoColor=white)](#)
[![Vercel Frontend](https://img.shields.io/badge/Hosted_on-Vercel-000000?logo=vercel&logoColor=white)](#)

RoutineRush is a premium, high-performance, gamified routine and habit tracking web application designed to help users structure their lives, track progress visually, and unlock personalized schedules using Artificial Intelligence. 

Built using the **MERN Stack**, RoutineRush features state-of-the-art micro-animations, real-time analytics, drag-and-drop task organization, native push notifications, and a fully offline-ready Progressive Web App (PWA) experience.

---

## 🌟 Key Features (Recruiter High-Priority Highlights)

### 🤖 1. Groq AI Routine Assistant
* Integrated with the high-performance **Groq SDK** utilizing the `llama-3.1-8b-instant` model.
* Generates custom, personalized routines based on user-entered goals, schedules, and daily challenges.

### 🔄 2. Interactive Drag-and-Drop UX
* Implemented fluid list reordering and interactive task adjustments using `@hello-pangea/dnd`.
* Drag and prioritize tasks in real-time, instantly syncs state to the backend database.

### 📱 3. Progressive Web App (PWA) Capabilities
* Fully installable on iOS, Android, and Desktop with a standalone full-screen window.
* Background **Service Worker** (`sw.js`) handles asset caching to enable basic offline loading and smooth performance.
* Dynamic Splash screens and responsive design customized for all screen sizes.

### 📊 4. Beautiful Data Analytics
* Interactive habits analytics dashboards powered by **Recharts**.
* Tracks custom routines, habits progress over time, completion rates, and visual performance charts.

### ☁️ 5. Cloud-Powered Media Streaming
* Features actual cloud profile picture uploading utilizing **Multer** and the **Cloudinary** REST API.
* Handles file stream compression and limits uploads to secure, fast formats (`.jpg`, `.png`, `.webp`).

### 🔔 6. Native Push Notification Engine
* Integrates native Web Browser Notification APIs to prompt users with dynamic routine and task reminders in real-time.

---

## 🛠️ Tech Stack & Architecture

### Frontend
* **Core Library:** React 19 (Component-based composition)
* **Build System:** Vite 7 (Hot Module Replacement)
* **Styling:** Tailwind CSS v4 & Custom modern variables
* **Animations:** Framer Motion (Smooth page transitions & interactive micro-animations)
* **State Management:** Redux Toolkit & React-Redux (Centralized state)
* **Charts:** Recharts (SVG/Canvas high-performance metrics)

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js (REST API architecture)
* **Database:** MongoDB Atlas (Cloud NoSQL database)
* **ORM:** Mongoose (Schema validation & relationships)
* **Authentication:** JSON Web Tokens (JWT) & BcryptJS password hashing

### Services
* **AI Engine:** Groq SDK (`llama-3.1-8b-instant`)
* **Media Storage:** Cloudinary CDN
* **Hosting:** Frontend on **Vercel** / Backend API on **Render**

---

## ⚙️ Environment Variables Setup

Create a `.env` file inside the `server/` directory and configure the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_signing_token_secret
GROQ_API_KEY=your_groq_llama3_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
FRONTEND_URL=your_production_vercel_frontend_url
```

On the **Frontend (Vercel)**, add this environment variable for dynamic API calls:
```env
VITE_API_URL=https://routinerush-backend.onrender.com/api
```

---

## 🚀 Installation & Local Development

### 1. Prerequisites
* [Node.js](https://nodejs.org/en/) installed (v18+ recommended)
* MongoDB Atlas cluster active

### 2. Clone the Repository
```bash
git clone https://github.com/Rishabhjain-92/RoutineRush.git
cd RoutineRush
```

### 3. Setup Backend Server
```bash
cd server
npm install
# Create a .env file and paste the variables listed above
npm run dev
```

### 4. Setup Frontend Client
Open a new terminal window and navigate to the project root:
```bash
# From project root
npm install
npm run dev
```

The application will launch on `http://localhost:5173` while communicating with your local backend on `http://localhost:5000/api`.

---

## 🔒 Security & Optimization Best Practices Implemented
* **Dynamic CORS Integration:** Implemented standard CORS normalization allowing secure and isolated request streams from Vercel deployment while retaining local dev access.
* **Sensitive Key Amends:** Cleared historic git commit history of sensitive environmental API credentials and added strong `.gitignore` protection.
* **Payload Limits:** Restricted payload streams to `5mb` to prevent server-side memory exhaustion (DDoS protection).
* **Graceful Crash Handling:** Implemented global exception handling and centralized error catching in express routes to ensure maximum uptime.
