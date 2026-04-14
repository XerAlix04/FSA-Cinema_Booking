# Capstone Project Final Report
## StarView Cinemas Online Booking System

**Group:** 1  
**Course:** FPT Software Academy Capstone  
**Date:** April 14, 2026  

---

## 1. Executive Summary
Over the course of an 3-sprint agile development cycle, Group 1 successfully engineered and deployed the StarView Cinemas Online Booking System. This project modernized a legacy cinema's operations by delivering a decoupled, cloud-hosted web application. The final product features a React.js Single Page Application (SPA), a Java Spring Boot RESTful backend, and a MySQL relational database. The system successfully handles high-concurrency seat reservations, dynamic pricing, a loyalty points engine, promotional vouchers, and secure payment processing via VNPay.

## 2. Methodology & Timeline
The team utilized the Scrum framework, managing the product backlog via GitHub Projects.
* **Sprints 0 (Inception & Infrastructure):** Requirement elicitation (SRS), Database Design (ERD), and CI/CD pipeline setup on Vercel and Railway.
* **Sprints 1 (Core Features):** Implementation of Spring Security (JWT) Role-Based Access Control (RBAC) and the core movie/showtime CRUD operations for Staff.
* **Sprints 2 (Advanced Business Logic):** Development of the interactive seat map, dynamic pricing engine (`heSoGia`), and the promotional voucher system.
* **Sprints 3 (Integration & Polish):** VNPay Sandbox integration, background Cron jobs for cart abandonment, resolving distributed transaction race conditions, and final UI/UX polish.

## 3. System Architecture
The application follows a modern N-tier architecture:
* **Frontend:** Built with React, utilizing `react-router-dom` for navigation and `jwt-decode` for client-side role management. Deployed on the Vercel Edge Network.
* **Backend:** Java 17 and Spring Boot 3. Utilizes Spring Data JPA/Hibernate for ORM and Spring Security for authentication. Deployed as a Dockerized container on Railway.
* **Database:** MySQL 8.0 hosted on Railway.
* **External Integrations:** VNPay (Payment Gateway), Brevo Email API (E-Ticketing), api.qrserver.com (QR Code generation).

## 4. Key Features Implemented
1. **Dynamic Pricing & Scheduling:** Staff can schedule movies across different physical rooms, while Admins can apply pricing coefficients (e.g., weekend surcharges or matinee discounts) globally.
2. **Interactive Seat Reservation:** Real-time visual seat mapping that distinguishes between Available, Locked, and Booked seats, including dynamic pricing for VIP and Sweetbox configurations.
3. **Loyalty Program (`DichVuBanKem`):** Members accrue points based on their VNPay checkout totals, which can be dynamically spent on concessions during future checkouts.
4. **Advanced Promotional Engine (`KhuyenMai`):** Supports flat-rate and percentage-based discounts, usage limits, and specialized "Welcome" vouchers restricted exclusively to first-time buyers.

## 5. Technical Challenges & Engineering Solutions

The Capstone required solving several enterprise-level software engineering problems, specifically regarding distributed transactions and concurrency.

### 5.1 Concurrency & The Double-Booking Problem
**Challenge:** High traffic could allow two users to purchase the exact same seat simultaneously.
**Solution:** The team implemented Optimistic Locking using Hibernate's `@Version` annotation on the `GHE_SUAT_CHIEU` table. If a collision occurs, the database rejects the second transaction, and the backend safely translates the `OptimisticLockingFailureException` into a user-friendly UI prompt. Furthermore, the `DataSeeder` was optimized using `deleteAllInBatch()` to bypass memory-loading locks during database resets.

### 5.2 Distributed Transactions & "Eager Update" Traps
**Challenge:** Early iterations of the checkout pipeline deducted vouchers and loyalty points the moment the user clicked "Checkout". If the user abandoned the VNPay payment screen, their points and vouchers were permanently lost.
**Solution:** The system architecture was refactored to separate mathematical calculation from database mutation. `KhuyenMaiService` handles validation, but the actual deduction of points and incrementing of voucher usage only occurs inside `TicketService.finalizeOrderSuccess()`—which is strictly triggered by a verified `00` success code from the VNPay IPN Webhook.

### 5.3 The Multi-Tab Exploit & The Seamless Retry
**Challenge:** Securing single-use vouchers against users opening multiple browser tabs required blocking checkouts if a `PENDING` order existed. However, this caused a UX flaw where a user clicking the browser's "Back" button from VNPay became locked out of their own voucher for 5 minutes.
**Solution:** The team engineered a "Seamless Retry" pattern. 
1. The React frontend utilizes a `useEffect` hook to detect a "Back" button retreat (presence of session data without VNPay return params).
2. The frontend silently pings a custom `/cancel-abandoned` backend endpoint.
3. The backend fails the abandoned order (instantly unlocking the voucher) but explicitly renews the 5-minute lock on the user's seats (`DANG_CHO`).
4. The user is returned to the checkout screen with their seats and voucher perfectly intact, resulting in a flawless UX.

## 6. Conclusion
Group 1 successfully delivered a highly complex, fault-tolerant e-commerce system. By addressing critical edge cases like optimistic locking, distributed transaction webhooks, and UI state recovery, the StarView Cinemas platform goes beyond basic CRUD functionality to demonstrate true, production-ready software engineering principles.