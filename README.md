![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=fff)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?style=for-the-badge&logo=supabase&logoColor=000)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=fff)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

# 🥋 Hajime Club Website

A modern, full-stack web application built for **Hajime Club**, designed to manage club members, training sessions, announcements, and attendance with secure role-based access (Admin & Student).

This project follows **production-grade practices**, clean architecture, and a responsive UI suitable for real-world deployment.

---

## 🚀 Project Overview

Hajime Club Website is a **single-page application (SPA)** that allows:
- Public users to learn about the club and view Terms & Conditions
- Students to manage profiles, view sessions, announcements, and attendance
- Admins to manage members, sessions, and announcements securely

The application focuses on:
- Clean UI/UX
- Mobile-first responsive design
- Secure authentication & authorization
- Maintainable and scalable codebase

---

## 🧰 Tech Stack

### Frontend
- **React 18+**
- **Vite** (or Create React App)
- **Tailwind CSS**
- **JavaScript** (TypeScript optional)
- **React Router**
- **Framer Motion** (optional animations)
- **Headless UI / shadcn/ui** (optional components)

### Backend / Services
- **Supabase** (recommended)  
  _or_ Firebase / PostgreSQL-based backend
- Secure authentication & role-based authorization

### Testing & Tooling
- Jest
- React Testing Library
- ESLint + Prettier

---

## ✨ Features

### 🔐 Authentication & Authorization
- Email & password registration and login
- User roles: **Admin** and **Student**
- Role-based protected routes
- Persistent login sessions
- Mandatory Terms & Conditions acceptance during registration

---

### 📄 Pages & Routes

#### Public Pages
- Home
- About
- Terms & Conditions
- Contact
- Login
- Register

#### Authenticated Pages
- Student Dashboard
- Admin Dashboard
- Session Details

---

### 🎓 Student Dashboard
- View profile & membership status
- Upcoming training sessions
- Club announcements
- Attendance history
- Accept Terms & Conditions if not already accepted

---

### 🛠 Admin Dashboard
- View, search & sort members
- Approve or remove members
- Create / edit training sessions
- Post announcements
- View attendance records
- Export member list (CSV)

---

## 🖌 UI / UX Guidelines
- Tailwind CSS with mobile-first approach
- Fast load times & lazy loading
- Accessible forms (labels, aria attributes)
- Smooth transitions & subtle animations
- High color contrast for accessibility

---

## 🧩 Reusable Components
- Button
- Input
- Modal
- Card
- Table
- Avatar
- Badge
- Toast

### Custom Hooks
- `useAuth`
- `useFetch`
- `useForm`

### Utilities
- `formatDate`
- `csvExport`
- `validators`

---

## 🗄 Database Schema (Supabase Recommended)

### Tables
- **users**  
  `id, name, email, role, joined_at, accepted_terms, phone`

- **sessions**  
  `id, title, date, start_time, end_time, instructor, capacity, description`

- **attendance**  
  `id, user_id, session_id, status, timestamp`

- **announcements**  
  `id, title, body, author_id, created_at`

- **contacts/messages**  
  `id, name, email, message, created_at`

### Seed Data
- 1 Admin account
- 6 Student accounts
- 4 Training sessions
- 3 Announcements

---

## 📜 Terms & Conditions

**Hajime Club – Terms & Conditions for Joining**

To maintain a productive, safe, and disciplined environment for learning basic Judo and self-defense, all members must agree to the following guidelines:

1. Sportsman Spirit  
Members should maintain a positive attitude, be willing to learn, and support fellow participants.

2. No Active Participation in Other Sports  
Members should not be currently enrolled in other sports activities that may cause schedule conflicts or reduce commitment.

3. Minimum Time Commitment  
Members must dedicate 2–3 hours on at least 3 alternate days in the evening as per the club schedule.

4. Respectful Behaviour  
Treat instructors, peers, and club property with respect at all times. Any form of misbehaviour will not be tolerated.

5. Discipline Is Mandatory  
Follow instructions carefully, maintain discipline during practice, and contribute to a focused training environment.  
(If not, don’t worry.. we’ll help build it!)

6. Punctuality  
Strictly maintain timely and regular participation.

7. Safety First  
All members must follow safety instructions strictly to avoid injuries.  
Strictly NO reckless behaviour.

8. No Misuse of Skills  
The club is for discipline – never for aggression or harming others.

---

**Welcome to the Club!**

Only those who agree to these terms should join.

🔗 WhatsApp Joining Link:  
https://chat.whatsapp.com/C7kFe8yvdGL3E8Ah72rxBg

---

## 🧱 Project Structure
```
├── client/           # React frontend application
│   └── src/
│       ├── components/   # UI components (shadcn/ui)
│       ├── hooks/        # Custom React hooks (useAuth, useResources)
│       ├── pages/        # Route pages
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── auth.ts       # Passport authentication setup
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Drizzle database connection
├── shared/           # Shared code between frontend/backend
│   ├── schema.ts     # Drizzle table definitions and Zod schemas
│   └── routes.ts     # API route definitions with type safety
└── migrations/       # Database migrations
```

---

## ⚙️ Environment Variables

Create a `.env` file and add:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BASE_URL=[http://localhost:5173](http://localhost:5173)
```

---

## ▶️ Running the Project Locally

```bash
npm install
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 🧪 Testing

```bash
npm run test
```

Includes:

- Unit tests for components & hooks
- Form validation tests
- Optional end-to-end smoke tests

---

## 🔐 Security Considerations

- No secret keys committed to the repository
- Server-side role validation
- Terms acceptance enforced at registration
- Basic rate-limiting for contact form submissions

---

## 🌱 Optional / Stretch Features

- Google OAuth login
- Membership payments (Stripe – test mode)
- Calendar export (ICS)
- Email or push notifications
- PWA support
- QR-based attendance check-in

---

## 📦 Deliverables

- Fully working application
- Clean, documented source code
- Database schema & seed data
- This README.md

---

## 🙏 Acknowledgements

Built for **Hajime Club** with a focus on discipline, learning, and modern web standards.

**OSS. 🥋**
