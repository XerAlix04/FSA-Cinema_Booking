# 🍿 StarView Cinemas - Capstone Project

A full-stack, production-ready cinema booking system built with React, Spring Boot, and MySQL. Features include interactive seat mapping, optimistic locking for concurrency control, VNPay integration, and a comprehensive loyalty/voucher engine.

## 🚀 Live Demo
- **Frontend (Customer & Admin):** [starview-cinema.vercel.app](https://starview-cinema.vercel.app/)
- **Backend API:** [fsa-cinemabooking-production.up.railway.app](https://fsa-cinemabooking-production.up.railway.app/)

## 🛠️ Technology Stack
- **Frontend:** React.js, React Router, JWT-Decode, Vite.
- **Backend:** Java 17, Spring Boot 3, Spring Security, Hibernate/JPA.
- **Database:** MySQL 8.0
- **External APIs:** VNPay Sandbox, Brevo Email, QRServer API.

## 👥 Default Test Accounts (From DataSeeder)
| Role | Email | Password | Notes |
|------|-------|----------|-------|
| **Admin** | `admin@starview.com` | `123456` | Has access to Voucher & Staff creation |
| **Staff** | `staff@starview.com` | `123456` | Can manage Movies and Showtimes |
| **Member**| `member@starview.com`| `123456` | Pre-loaded with 1500 Loyalty Points |

## 🏗️ Local Setup Instructions

### 1. Backend (Spring Boot)
1. Navigate to the `src/backend` folder.
2. Update `application.properties` & create 'application-secret.yml' with your local MySQL credentials.
3. Add your VNPay Sandbox `vnp_TmnCode` and `vnp_HashSecret`.
4. Add your Brevo API key and sender email.
5. Run the application. The `DataSeeder` will automatically build the schema and populate mock data.

### 2. Frontend (React)
1. Navigate to the `src/frontend` folder.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and set `VITE_BASE_URL=http://localhost:8080`.
4. Run `npm run dev`.