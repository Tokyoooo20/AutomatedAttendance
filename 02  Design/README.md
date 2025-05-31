# Automated Attendance Tracking System

A secure and scalable web-based Attendance Tracking System designed to streamline attendance management using barcode scanning, role-based access control (RBAC), and multi-factor authentication (MFA). This project facilitates registration, tracking, and reporting of student attendance via a cloud-deployed architecture.

---

## 📌 Features

- **Role-Based Access Control**: Separate access for Admins, Instructors, and Students.
- **Barcode Scanning**: Instructors can scan barcodes to track attendance.
- **Attendance Reports**: Admins can generate detailed attendance reports.
- **Student Portal**: Students can view their attendance records.
- **Secure Authentication**: Multi-factor authentication for added security.
- **Cloud Deployment**: Deployed on scalable cloud infrastructure.

---

## 🏗️ System Architecture

### Frontend
- **Expo.js** Single Page Application (SPA)
- Interfaces for Instructors (scanning), Students (viewing), and Admins (management)

### Backend
- **Spring Boot REST API**
- Implements business logic, security, and CRUD operations

### Database
- **MySQL** or **MongoDB Atlas** (Cloud-hosted)
- Collections for Users, Devices, Attendance Logs, Courses, and Audit Trails

---

## 🔧 Modules and Technologies

| Module             | Description                                          | Technologies Used                  |
|--------------------|------------------------------------------------------|------------------------------------|
| User Management    | Register and manage users                            | Spring Boot, MySQL/MongoDB         |
| Attendance Tracker | Scan barcodes, track inactivity                      | React (Expo.js), Spring API        |
| Reports            | Generate and manage reports                          | Spring Boot                        |
| Security           | MFA, RBAC, device tracking, encryption               | Spring Security                    |
| Infrastructure     | Cloud deployment, device integration, scalability    | AWS / Azure / GCP                  |

---

## 🔁 Data Flow

1. **Registration**: Admin registers students and instructors; data and ID photo stored in DB.
2. **Attendance Tracking**: Instructor scans barcode; system validates and logs timestamp.
3. **Student View**: Students log in to view their attendance.
4. **Reporting**: Admin generates summaries from attendance logs.

---

## 📡 API Endpoints

| Endpoint                        | Method | Description                      | Role          |
|---------------------------------|--------|----------------------------------|---------------|
| `/api/register/student`         | POST   | Register a student               | Authorized    |
| `/api/register/instructor`      | POST   | Register an instructor           | Authorized    |
| `/api/attendance/scan`          | POST   | Submit scanned barcode           | Instructor    |
| `/api/attendance/student/{id}`  | GET    | View student attendance          | Student       |
| `/api/reports/attendance`       | GET    | Generate attendance report       | Admin         |
| `/api/auth/login`               | POST   | Login with MFA                   | All Roles     |

---

## 🔐 Security

- **RBAC**: Enforced roles for Admin, Instructor, and Student.
- **MFA**: Mandatory for instructor authentication.
- **Encryption**: Sensitive data encrypted and admin-controlled.
- **TLS**: HTTPS enforced for all communications.
- **Access Control**: Only authorized users can access the system.

---

## ☁️ Deployment

- Cloud-native infrastructure with auto-scaling enabled
- Database hosted via MongoDB Atlas or MySQL on cloud VM
- Device integration using Android devices and laptops

---

## 📅 Project Timeline

- **Initial System Check**: May 15, 2025
- **Full Deployment**: May 22, 2025

---

## 📎 Documentation

- [High-Level Design Document](./Automated-Attendance-Tracking-System%20High-Level%20Design%20Document.docx)
- [Conceptual Diagram](./Conceptual%20Diagram.docx)
- [Requirement Traceability Matrix](./Requirement_Traceability_Matrix.xlsx)

---

## 📬 Contact

For questions or support, please contact the project team.

---


