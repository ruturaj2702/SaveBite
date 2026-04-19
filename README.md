# 🥗 SaveBite: Zero Food Waste Platform

**SaveBite** is a modern full-stack web application designed to bridge the gap between food surplus and food scarcity. It connects Hotels (Donors) with NGOs and Volunteers in real-time to ensure that excess quality food reaches those in need instead of ending up in landfills.

---

## ✨ Recent Enhancements

### 🎨 Visual Overhaul (v2.0)
- **Dark Mode Aesthetic**: A professional, high-end dark interface featuring glassmorphism and emerald accents.
- **Responsive Design**: Completely rebuilt layouts for Home, Auth, and Portal pages using a modern CSS variable-based design system.
- **Dynamic Interactions**: Smooth micro-animations, hover effects, and radial gradient glows.
- **Visual Role Picker**: A card-based role selection during registration for better UX.

### 🔔 Smart Notification System
- **Automated Email Alerts**: Integrated `nodemailer` to send instant HTML-styled notifications:
  - **NGOs**: Notified when new food is listed.
  - **Donors/Volunteers**: Notified when food is claimed.
  - **NGOs**: Notified once delivery is confirmed.
- **Real-time UI Updates**: Implemented React Context (`AuthContext`) for instant login feedback and reactive navigation.

### 🛠️ Architecture & Features
- **Role-Based Access Control**: Scoped dashboards for Donors, NGOs, and Volunteers.
- **Eco-Friendly Logic**: Distinct handling for "Fresh Food" (donations) vs "Green Waste" (composting/manure).
- **Concurrency**: Unified development workflow to start both Frontend and Backend with a single command.
- **Robustness**: Fixed duplicate model issues and improved form validation with formal instructions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (running locally or via Atlas)
- Gmail account (for notifications)

### Installation
1. Clone the repository
2. Install dependencies in root:
   ```bash
   npm install
   ```
3. Install dependencies in frontend:
   ```bash
   cd frontend && npm install
   ```

### Configuration
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
```

### Running the App
Run both servers simultaneously from the root:
```bash
npm run dev
```
The app will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

## 🏗️ Technology Stack
- **Frontend**: React, CSS3 (Custom Design System), Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Notifications**: Nodemailer (SMTP)
- **State Management**: React Context API
- **Utilities**: Axios, React-Toastify, Concurrently

---

## 🌍 Our Mission
At SaveBite, we believe that **abundance should never lead to waste while need still exists**. Every line of code in this project is dedicated to creating a more sustainable and compassionate world.
