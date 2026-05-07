# Tsika 💬

> **Tsika** — Filipino slang for casual chat. A modern real-time messaging app built with the MERN stack.

🔗 **Live Demo:** [https://tsika.skwtr.com](https://tsika.skwtr.com)

---

## Overview

Tsika is a full-stack real-time chat application inspired by Discord, built as a portfolio project. It features instant messaging, live online presence, user profiles, and a personalized theme system — all wrapped in a clean, mobile-responsive UI.

---

## Features

### 💬 Messaging
- Real-time messaging powered by **Socket.io**
- Conversation list auto-updates with the latest message preview and timestamp
- New conversations appear instantly without a page refresh
- Message skeleton loading state for a smooth UX

### 👥 Users & Presence
- User authentication (register, login, logout)
- Online/offline status indicators
- **Last seen** timestamps that auto-update (e.g. "active 5m ago")
- Real-time profile photo and username sync across all connected clients

### 👤 User Profiles
- Profile panel with avatar, bio, member since date, and mutual friends
- **Mutuals** — users you both share a conversation with
- Each user's profile banner reflects their own chosen theme color

### 🎨 Theming
- 8 accent color themes (Teal, Rose, Coffee, Indigo, Slate, Violet, Amber, Emerald)
- Theme persists across sessions via `localStorage` and is saved to the database
- Other users see your chosen banner color when viewing your profile

### ⚙️ Settings
- Change username (once per day limit)
- Change password
- Upload profile photo (via Cloudinary, once every 10 seconds limit)
- Edit bio (190 character max)
- Theme picker

### 📱 Responsive
- Mobile-first design — conversation list takes full screen on mobile
- Back button and swipe-right gesture to return to the conversation list
- Profile panel opens as a full-screen overlay on mobile, side panel on desktop
- Profile panel open by default on large screens (`lg+`)

---

## Tech Stack

### Frontend
- **React** — UI framework
- **Tailwind CSS** — styling
- **Socket.io Client** — real-time communication
- **Axios** — HTTP requests
- **Lucide React** — icons
- **React Router** — client-side routing

### Backend
- **Node.js + Express** — REST API server
- **Socket.io** — WebSocket server
- **MongoDB + Mongoose** — database
- **Cloudinary** — profile photo storage
- **JWT** — authentication
- **bcrypt** — password hashing

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

**Clone the repo:**
```bash
git clone https://github.com/yourusername/tsika.git
cd tsika
```

**Install dependencies:**
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

**Environment variables:**

Create a `.env` file in the `server` directory:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Run the app:**
```bash
# Backend
cd server
npm run dev

# Frontend (in a separate terminal)
cd client
npm run dev
```

The app will be running at `http://localhost:5173` and the server at `http://localhost:8080`.

---

## Project Structure

```
tsika/
├── client/                   # React frontend
│   ├── src/
│   │   ├── api/              # Axios API calls
│   │   ├── components/       # UI components
│   │   │   ├── chat/         # ChatBox, MessageList, ConversationList, etc.
│   │   │   └── ui/           # Shared UI (UserCard, SettingsModal, etc.)
│   │   ├── config/           # Theme config
│   │   ├── context/          # Auth and Socket context providers
│   │   ├── hooks/            # Custom hooks (useChat, useConversation, useTheme, etc.)
│   │   └── pages/            # Login, Register, Chat
│
└── server/                   # Express backend
    └── src/
        ├── config/           # Socket.io, Cloudinary config
        ├── controllers/      # Route controllers
        ├── middleware/        # Auth middleware
        ├── models/           # Mongoose models
        ├── routes/           # Express routes
        └── services/         # Business logic
```

---

## Key Implementation Details

- **Real-time** — Socket.io rooms per conversation. Users join a room on conversation select, messages are emitted to room members only.
- **Last seen** — stored in MongoDB on socket disconnect, emitted to all clients via `userLastSeen` event.
- **Theme system** — CSS variables on `:root` swapped via JavaScript. User's accent color is saved to the DB so their profile banner reflects their own theme for other users.
- **Mutuals** — computed by finding the intersection of both users' conversation participant lists.
- **Photo upload** — converted to base64, uploaded to Cloudinary with auto quality and format optimization.

---

## Screenshots

<img width="1896" height="902" alt="image" src="https://github.com/user-attachments/assets/65eb8149-ad30-46ee-8fc4-dc80dcb517a3" />
<img width="951" height="797" alt="image" src="https://github.com/user-attachments/assets/7a4b3b74-fda9-4f72-8081-5982a83765dd" />
<img width="523" height="795" alt="image" src="https://github.com/user-attachments/assets/1e7d77c3-436b-412f-9e62-7261f7509891" />




---

## Author

Built by **JOHN MARK FRANCISCO** — [GitHub](https://github.com/johnmarkfrncsc) · [Portfolio](https://frncsc.skwtr.com/)

---

## License

MIT
