# Software Requirements Specification
## For StarView Cinemas Online Booking System

Version 1.0  
Prepared by Group 1  
FPT Software Academy  
Modified on April 14th 2026

## Table of Contents
<!-- TOC -->
* [1. Introduction](#1-introduction)
    * [1.1 Document Purpose](#11-document-purpose)
    * [1.2 Product Scope](#12-product-scope)
    * [1.3 Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
    * [1.4 Document Overview](#14-document-overview)
* [2. Product Overview](#2-product-overview)
    * [2.1 Product Perspective](#21-product-perspective)
    * [2.2 Product Functions](#22-product-functions)
    * [2.3 Product Constraints](#23-product-constraints)
    * [2.4 User Characteristics](#24-user-characteristics)
    * [2.5 Assumptions and Dependencies](#25-assumptions-and-dependencies)
    * [2.6 Apportioning of Requirements](#26-apportioning-of-requirements)
* [3. Requirements](#3-requirements)
    * [3.1 External Interfaces](#31-external-interfaces)
    * [3.2 Functional](#32-functional)
    * [3.3 Quality of Service](#33-quality-of-service)
    * [3.4 Design and Implementation](#34-design-and-implementation)
* [4. Verification](#4-verification)
* [5. Appendixes](#5-appendixes)
<!-- TOC -->

## Revision History

| Name | Date | Reason For Changes | Version |
|------|------|--------------------|---------|
|Dev Team|2026-02-25|Initial Draft based on Stakeholder Email|0.1|
|Dev Tema|2026-04-14|Final Version based on completed project|1.0|

## 1. Introduction
<!-- overview of the SRS: purpose, scope, audience, and organization of the document; avoid detailed requirements -->

### 1.1 Document Purpose
<!-- why this SRS exists, its intended audiences, and how they'll use it; keep to 2–4 sentences and avoid implementation detail -->
This SRS details the functional and non-functional requirements for the StarView Cinemas' Online Booking System. It serves as the primary reference for the development team, academic evaluators, and the primary stakeholder (Kevin Flynn) to ensure the delivered web application meets all business, technical, and academic capstone objectives.

### 1.2 Product Scope
<!-- the product (name/version), its primary purpose, key capabilities, and boundaries. keep brief and focus on the "what" and "why", not the "how" -->
The StarView Cinemas Online Booking System (Version 1.0) is a web-based application designed to digitize ticket sales and cinema management. The primary capabilities include browsing movie schedules, viewing trailers, selecting specific seats via an interactive layout, calculating dynamic pricing, VNPay gateway integration, membership accounts with loyalty points, promotional voucher management, generating QR codes for ticket validation and an administrative dashboard for staff and administrators.

### 1.3 Definitions, Acronyms, and Abbreviations
<!-- glossary of domain terms, acronyms, and abbreviations; keep entries alphabetized -->

| Term | Definition |
|------|------------|
|RBAC|Role-Based Access Control.|
|Double-Booking|An error state where two distinct users successfully reserve the same seat for the same showtime.|
|Dynamic Pricing|A pricing strategy where ticket costs fluctuate based on predefined variables (e.g., day of the week, time of day).|
|JWT|JSON Web Token - Used for securely transmitting information between parties as a JSON object, utilized here for user authentication.|
|Distributed Transaction|A transaction (like VNPay) where the backend must await external webhook confirmation before finalizing database state.|

### 1.4 Document Overview
<!-- document structure and conventions -->
Section 2 provides the high-level system context and constraints. Section 3 details the specific, testable requirements (Functional, Performance, and Security) prioritized for the 4-sprint agile cycle. Section 4 outlines the verification matrix for QA testing.

## 2. Product Overview
<!-- background and context that shape the product's requirements -->

### 2.1 Product Perspective
<!-- context of the system: a new product, a replacement, or part of a family; note relationships to other systems -->
This system is a greenfield web application built to replace StarView Cinemas' current walk-in-only sales model. It operates as a decoupled system featuring a ReactJS frontend client hosted on Vercel and a Java Spring Boot RESTful backend, communicating over HTTPS and persisting data in a connected MySQL 8 database, both hosted on Railway.

### 2.2 Product Functions
<!-- major functional areas or features the product provides in 5–10 concise bullets -->
- **Customer Portal**: View playing movies, watch embedded trailers, and view showtimes.

- **Seat Reservation**: Interactive visual selection of available, locked, or booked seats.

- **Dynamic Checkout**: Automatic price calculation and mock payment processing.

- **Ticketing**: Generation of scannable QR codes representing the finalized booking.

- **Admin Dashboard**: Staff interface to add new movie metadata and schedule showtimes into specific physical theater rooms.

### 2.3 Product Constraints
<!-- design and implementation constraints that affect the solution -->
- **Time Constraint**: Must be fully implemented, tested, and deployed within an 8-week (4 Sprints) timeframe.

- **Technology Stack**: Must utilize Java Spring Boot for the backend API, ReactJS for the frontend, and a relational SQL database to manage transactional integrity.

### 2.4 User Characteristics
<!-- classes, roles, expertise, access levels, frequency of use, and accessibility or localization needs -->
- **Customers**: End-users who browse currently showing movies, select seats using the visual map, and make online payments through VNPay to receive QR codes.

- **Staff**: Cinema employees responsible for adding, editing, or deleting movie information and scheduling screenings in different rooms to optimize capacity.

- **Admin**: Management users responsible for establishing dynamic pricing rules (e.g., Tuesday discounts, Friday surcharges) and create vouchers to increase revenue, managing employee accounts.

### 2.5 Assumptions and Dependencies
<!-- assumptions about environment, third-party services, usage patterns, and other external factors; note potential impact/risk. -->
- **Dependency**: Trailer playback relies on external video hosting (YouTube embedded iframes).

- **Assumption**: The physical layout of the cinema rooms (rows and columns) will remain static once seeded in the database.

### 2.6 Apportioning of Requirements
<!-- map major requirements to subsystems, services, or releases/iterations -->
- **Sprint 1**: Authentication, Database ERD implementation, CRUD operations for Movies and Rooms.

- **Sprint 2**: Seat reservation logic, UI seat layout, Concurrency handling, Dynamic Pricing engine.

- **Sprint 3**: QR Code generation, VNPay Payment Integration, Memberships, Voucher application, UI Polish, Bug fixing.

## 3. Requirements
<!-- identifiable, verifiable, testable requirements; avoid implementation details -->

### 3.1 External Interfaces
<!-- inputs/outputs (formats, protocols, timing, etc); reference interface schemas where available. -->

#### 3.1.1 User Interfaces
<!-- user interactions (UI elements, dialogs, flows); reference design/style guides -->
The system shall provide a responsive web interface accessible via modern desktop and mobile browsers.

- **Theme**: The UI should reflect a modern cinema aesthetic (dark mode default).

- **Seat Map**: Must visually differentiate between Available (Empty), Selected (Highlighted), and Booked (Grayed out/Disabled) states.

#### 3.1.2 Software Interfaces
<!-- integrations with other systems (APIs, contracts, owner, etc) -->
- **Frontend-Backend Communication**: The React application shall communicate with the Spring Boot backend exclusively via JSON over REST APIs.

- **Authentication**: All protected endpoints (booking, admin functions) must require a valid Bearer JWT in the Authorization header.

### 3.2 Functions
<!-- externally observable behaviors organized by feature/use case -->
***ID***: REQ-FUNC-001

- **Title**: Seat Hold and Expiration

- **Statement**: When a customer clicks "Confirm Selection", the system must temporarily lock selected seats for 5 minutes during the checkout process.

- **Rationale**: Prevents user frustration and potential double-booking by reserving seats while they input payment details.

- **Acceptance Criteria**: The system records this using the thoi_gian_het_han_giu_cho field in the GHE_SUAT_CHIEU table. If the time expires before payment, the TicketService.giaiPhongGheHetHan() method must release the seat.

- **Verification Method**: Test / Demonstration.

***ID***: REQ-FUNC-002

- **Title**: Dynamic Pricing Engine

- **Statement**: The system shall calculate the final ticket price by applying modifiers to the base showtime price: applying a 20% discount for showtimes starting before 12:00 PM on Tuesdays, and a 15% surcharge for showtimes starting after 5:00 PM on Fridays and Saturdays.

- **Rationale**: Fulfills stakeholder requirement to maximize revenue during peak hours and encourage attendance during off-peak hours.

- **Acceptance Criteria**: The checkout total accurately reflects the modified price based on the showtime's timestamp.

- **Verification Method**: Test.

***ID***: REQ-FUNC-003

- **Title**: VNPay Payment Processing Integration

- **Statement**: The system shall process real transactions via the VNPay Sandbox gateway.

- **Rationale**: Satisfies the stakeholder requirement to finalize bookings functionality, allowing stakeholder to begin receiving real transactions.

- **Acceptance Criteria**: Entering valid-format card details results in a successful order creation. Entering invalid formats returns a validation error. If the payment is successful, the seat hold timer is cleared, the user is returned from VNPay gateway to the frontend to receive QR code ticket. The backend must rely strictly on the VNPay IPN Webhook (`vnpay-return`) to mark orders as `SUCCESS`. Eager updates before payment confirmation are strictly prohibited.

- **Verification Method**: Test.

***ID***: REQ-FUNC-004

- **Title**: QR Code Ticket Generation

- **Statement**: Upon successful completion of an order, the system shall generate a unique QR code containing the DonHang ID and the associated SuatChieu (Showtime) details.

- **Rationale**: Enables cinema staff to quickly scan and verify tickets at the theater entrance.

- **Acceptance Criteria**: The QR code is successfully rendered on the confirmation screen and is readable by standard QR scanning libraries, outputting the correct booking identifier.

- **Verification Method**: Test/Demonstration.

***ID***: REQ-FUNC-005

- **Title**: Movie Catalog and Trailer Viewing

- **Statement**: The system shall display a list of currently showing movies to customers, allowing them to view details and watch embedded trailers.

- **Rationale**: Satisfies the stakeholder's core requirement to attract customers by letting them see what movies are playing and watch trailers before booking.

- **Acceptance Criteria**: The UI successfully fetches and displays the ten_phim (title), gia_goc (base price), and thoi_luong_phut (duration) from the PHIM table. 
    - Clicking on a movie opens a modal or new page containing a functional embedded video player for the trailer.

- **Verification Method**: Test/Demonstration.

***ID***: REQ-FUNC-006

- **Title**: Movie Catalog Management (CRUD)

- **Statement**: The system shall provide a secure dashboard allowing users with the Staff role to add, edit, and delete movie information.

- **Rationale**: Enables cinema staff to keep the theater's offerings up to date with the latest blockbusters.

- **Acceptance Criteria**: The interface provides a form to input or modify ten_phim, gia_goc, and thoi_luong_phut.
    - Submitting the form successfully persists the data to the PHIM table.
    - Deleting a movie successfully removes it (or marks it inactive) so it no longer appears on the customer catalog.

- **Verification Method**: Test.

***ID***: REQ-FUNC-007

- **Title**: Showtime Scheduling and Room Allocation

- **Statement**: The system shall allow Staff to schedule movie screenings into specific theater rooms at designated dates and times.

- **Rationale**: Fulfills the stakeholder's requirement for staff to schedule movies into different rooms and helps optimize theater capacity.

- **Acceptance Criteria**: The interface allows staff to map a Phim to a PhongChieu (Room) and set a thoi_gian_chieu (Showtime).
    - ***Conflict Prevention***: The backend must validate the input and reject the schedule if the new showtime overlaps with an existing showtime in the same PhongChieu, calculating the block based on the movie's thoi_luong_phut (duration).
    - Upon success, the system creates a new record in the SUAT_CHIEU table and automatically generates the associated GHE_SUAT_CHIEU records based on the room's layout.

- **Verification Method**: Test.

***ID***: REQ-FUNC-008

- **Title**: Dynamic Pricing Rule Configuration

- **Statement**: The system shall provide a secure interface accessible only to the Admin role to configure dynamic pricing variables for showtimes.

- **Rationale**: Allows administration to establish rules (e.g., cheaper on Tuesday mornings, more expensive on Friday evenings) to increase revenue and attract customers without requiring backend code changes.

- **Acceptance Criteria**: The interface allows the Admin to set or modify the he_so_gia (price coefficient) for specific showtimes or apply bulk rules based on the day and time.
    - For example, setting a 20% discount updates the he_so_gia to 0.8, while a 15% surcharge sets it to 1.15.
    - The system persists these changes to the SUAT_CHIEU table so the TicketService can utilize them during checkout.

- **Verification Method**: Test/Demonstration.

***ID***: REQ-FUNC-009

- **Title**: Loyalty Points & Perks

- **Statement**: Registered `MEMBER` accounts shall earn points (e.g., 10 points per 10,000 VND spent) and redeem them for concessions (popcorn, drinks).

- **Rationale**: Allows stakeholder to reward loyal customers and incentivises continued support and patronage, helping attract repeat customers and increasing revenue

- **Acceptance Criteria**: Points are only deducted/awarded upon successful VNPay webhook confirmation.

- **Verification Method**: Test/Demonstration.

***ID***: REQ-FUNC-010

- **Title**: Promotional Vouchers

- **Statement**: The system shall support flat and percentage-based discount codes, including "Welcome" vouchers for first-time buyers.

- **Rationale**: Helps stakeholder with creating promotion drives and incentives to attract new customers

- **Acceptance Criteria**: Voucher limits must be validated against `PENDING` and `SUCCESS` orders to prevent multi-tab exploitation.

- **Verification Method**: Test/Demonstration

***ID***: REQ-FUNC-011

- **Title**: Staff & Voucher Management

- **Statement**: ADMIN users have exclusive access to generate new STAFF accounts and create new promotional vouchers.

- **Rationale**: Administrators have exclusive control over pricing of tickets, including voucher discounts and duration

### 3.3 Quality of Service
<!-- measurable non-functional attributes section -->

#### 3.3.1 Security
<!-- protection of data, identities, and operations (transit/rest, auth, encryption, etc); safety, confidentiality, privacy, integrity, and availability -->
***ID***: REQ-SEC-001

- **Title**: Role-Based Access Control

- **Statement**: The system shall restrict access to movie and schedule creation/modification endpoints exclusively to users with the STAFF role.

- **Rationale**: Prevents unauthorized users from altering theater schedules.

#### 3.3.2 Reliability
<!-- ability to consistently perform as specified (MTBF, redundancy/failover, caches, etc) -->
***ID***: REQ-REL-001

- **Title**: Concurrency Double-Booking Prevention

- **Statement**: The database shall utilize optimistic locking on the GHE_SUAT_CHIEU table. If two users attempt to finalize a booking for the exact same Seat ID concurrently, the system shall process the first transaction and throw an OptimisticLockException for the second, returning a 409 Conflict HTTP status to the user.

- **Rationale**: Directly addresses stakeholder's primary concern regarding double booking.

- **Verification Method**: Test (Automated parallel API load testing).

***ID***: REQ-REL-002

- **Title**: Backing out of VNPay transaction

- **Statement**: The system must implement a "Seamless Retry" pattern. If a user navigates back from the VNPay screen using the browser's Back button, the frontend must intercept the action, ping a cancellation endpoint, and safely unlock their voucher/seats for an immediate retry and remember the user's voucher code.

- **Rationale**: Minimal friction to user experience, smoothly allowing them to back out and change their ticket order

- **Verification Method**: Test/Demonstration.

### 3.4 Design and Implementation
<!-- constraints and mandates on design, deployment, and maintenance section -->

#### 3.4.1 Build and Delivery
<!-- controls for building and delivering (dependency management, automation, integrity/traceability, etc) -->
The project shall utilize Git for version control, hosted on GitHub. Both the frontend and backend must maintain separate repositories or utilize a monorepo structure with independent build pipelines.

#### 3.4.2 Change Management
<!-- how changes are introduced and communicated (categories, required artifacts and workflow, etc) -->
All new features must be developed on feature branches and merged into the main branch only via Pull Requests reviewed by at least one other team member.


## 4. Verification

| Requirement ID | Verification Method | Test/Artifact Link | Status | Evidence |
|----------------|---------------------|--------------------|--------|----------|
|REQ-FUNC-001|Test|                    |Complete|          |
|REQ-FUNC-002|Test|                    |Complete|          |
|REQ-FUNC-003|Test|                    |Complete|          |
|REQ-FUNC-004|Test|                    |Complete|          |
|REQ-FUNC-005|Test|                    |Complete|          |
|REQ-FUNC-006|Test|                    |Complete|          |
|REQ-FUNC-007|Test|                    |Complete|          |
|REQ-FUNC-008|Test|                    |Complete|          |
|REQ-FUNC-009|Test|                    |Complete|          |
|REQ-FUNC-010|Test|                    |Complete|          |
|REQ-FUNC-011|Test|                    |Complete|          |
|REQ-SEC-001|Test|                    |Complete|          |
|REQ-REL-001|Test|                    |Complete|          |
|REQ-REL-002|Test|                    |Complete|          |

## 5. Appendixes