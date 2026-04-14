# Software Design Description
## For StarView Cinemas Online Booking System

Version 1.0  
Prepared by Group 1  
FPT Sofware Academy
Modified on April 14th 2026

## Table of Contents
<!-- TOC -->
* [1. Introduction](#1-introduction)
  * [1.1 Document Purpose](#11-document-purpose)
  * [1.2 Subject Scope](#12-subject-scope)
  * [1.3 Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
  * [1.4 References](#14-references)
  * [1.5 Document Overview](#15-document-overview)
* [2. Design Overview](#2-design-overview)
  * [2.1 Stakeholder Concerns](#21-stakeholder-concerns)
  * [2.2 Selected Viewpoints](#22-selected-viewpoints)
* [3. Design Views](#3-design-views)
* [4. Decisions](#4-decisions)
* [5. Appendixes](#5-appendixes)
<!-- TOC -->

## Revision History

| Name | Date | Reason For Changes | Version |
|------|------|--------------------|---------|
|Dev Team|2026-04-14|Final Version based on completed project|1.0|

## 1. Introduction

### 1.1 Document Purpose
This Software Design Description (SDD) details the architectural and system-level design for the StarView Cinemas Online Booking System. It serves as the primary technical blueprint for developers, architects, and academic evaluators to understand the system's structure, data models, and critical design decisions.

### 1.2 Subject Scope
The StarView Cinemas system (Version 1.0) is a web-based platform designed to handle online movie ticket sales, dynamic pricing, and loyalty programs. It replaces legacy manual ticketing with a modern, decoupled architecture. This SDD covers the React frontend, the Spring Boot REST API, the MySQL database schema, and the integration with external services like VNPay. 

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition                                                                                                               |
|------|--------------------------------------------------------------------------------------------------------------------------|
| API  | Application Programming Interface - A set of definitions and protocols for building and integrating application software |
| RBAC | Role-Based Access Control - Restricting system access based on user roles (e.g., ADMIN, STAFF, MEMBER)                   |
| SDD  | Software Design Description - A document that describes the intended purpose, requirements, and nature of a software     |
| IPN  | Instant Payment Notification - A callback from VNPay's transaction url when the user completes the transaction, used to send payment hash and response code to the app           |

### 1.4 References
- **StarView SRS (v1.0):** Normative reference for system requirements.
- **VNPay Developer API Docs:** Normative reference for payment gateway IPN webhook integration.

### 1.5 Document Overview
Section 2 identifies the key stakeholders and the architectural viewpoints selected to address their concerns. Section 3 contains the actual design views (including deployment and class models). Section 4 formally logs the critical architectural decisions made during the 8-sprint development cycle.

## 2. Design Overview

### 2.1 Stakeholder Concerns
- **Customers:** Concerned with usability, secure payment processing, and ensuring their selected seats are guaranteed.
- **Cinema Management (Admin/Staff):** Concerned with revenue optimization (dynamic pricing), preventing fraudulent voucher usage, and system uptime.
- **Development Team:** Concerned with code maintainability, clear separation of concerns, and handling distributed transactions safely.

### 2.2 Selected Viewpoints
To address the concerns above, the following viewpoints are utilized in this design:

#### 2.2.1 Logical Viewpoint
**Addresses:** Encapsulation and dependencies among entities and services.  
**Typical Languages:** UML Class Diagram.

#### 2.2.2 Information Viewpoint
**Addresses:** Data structure, persistence, and data integrity.  
**Typical Languages:** Entity-Relationship Diagram (DBML).

#### 2.2.3 Deployment Viewpoint
**Addresses:** Component-to-node allocation and network topology.  
**Typical Languages:** Infrastructure/Network Diagram.

## 3. Design Views

- ID: VIEW-001-Deployment
- Title: Cloud Infrastructure and Integration View
- Viewpoint: Deployment Viewpoint
- Representation: Mermaid Architecture Diagram (See `docs/diagrams/architectureDesign.md`)
- More Information: Illustrates the separation of the Vercel edge network from the Railway backend container.

- ID: VIEW-002-Logical
- Title: Service Dependency and Component View
- Viewpoint: Logical Viewpoint
- Representation: Mermaid Architecture Diagram (See `docs/diagrams/classDiagram.md`)
- More Information: Details the strict delegation of mathematical validation (KhuyenMaiService) vs. database mutation (TicketService).

- ID: VIEW-003-Information
- Title: Relational Database Schema
- Viewpoint: Information Viewpoint
- Representation: DBML (See docs/erd.md for full file).
- More Information: Implements @Version on GHE_SUAT_CHIEU for optimistic locking.

## 4. Decisions
- ID: DEC-001-Optimistic-Locking
- Title: Concurrency control for seat reservations
- Context: High-traffic movie premieres can result in two users clicking the same seat simultaneously, risking double-booking.
- Options: 
    - 1. Pessimistic Locking (Database level) 
    - 2. Optimistic Locking (Application level)
    - 3. Redis Distributed Locks.
- Outcome: Chosen option: "Optimistic Locking", because it provides mathematically guaranteed collision detection via the @Version (phien_ban) column without the performance bottlenecks of pessimistic locking or the infrastructure overhead of Redis.

- ID: DEC-002-Webhook-Finalization
- Title: Mitigation of Eager Update traps in distributed transactions
- Context: Deducting vouchers or loyalty points when the user clicks "Checkout" causes permanent data loss if they abandon the VNPay screen.
- Options: 
    - 1. Eager Updates with manual rollback buttons
    - 2. Lazy Updates via Webhook.
- Outcome: Chosen option: "Lazy Updates via Webhook", because database mutation (daSuDung + 1) should only occur when the VNPay IPN Webhook returns a 00 success code, ensuring absolute transactional integrity.

- ID: DEC-003-Seamless-Retry
- Title: Handling Browser Back Button cart abandonment
- Context: Users clicking the browser's "Back" button from VNPay are locked out of their own vouchers for 5 minutes due to their hanging PENDING order.
- Options: 
    - 1. Force users to wait 5 minutes for the Cron job
    - 2. Implement frontend Retreat Detection and a specific cancellation endpoint.
- Outcome: Chosen option: "Frontend Retreat Detection", because React's useEffect can instantly detect the lack of URL parameters on remount, ping /cancel-abandoned to fail the old order (freeing the voucher), and retain the 5-minute seat lock, creating a frictionless user experience.

## 5. Appendixes
