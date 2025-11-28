# 📌 **HMS-Core Enhanced**

### *AI-Augmented Hospital Management System*

Built for **MumbaiHacks 2025**

---

## 🚀 Overview

**HMS-Core Enhanced** is an enterprise-grade Hospital Management System designed with **AI assistance, clinical intelligence, scalable Firestore architecture, and wellness-oriented D2C features**.
This system is built using **Firebase Studio**, React + Tailwind, Cloud Functions, and Firestore.

The platform can manage patients, encounters, beds, inventory, prescriptions, labs, staff, insurance, billing, and much more — while providing **AI-powered forecasting, recommendations, and automation**.

This version includes automated data ingestion from real synthetic healthcare datasets to power forecasting, dashboards, and analytics.

---

# 🧠 Key Features

## 🔵 **1. AI Layer**

Built to impress AI engineers & CTOs.

* **AI Decision Engine**
  Weighted scoring model + LLM-ready scaffolding
* **Auto Encounter Summary Generator**
* **High-Risk Pattern Detection**
* **Bed Shortage Prediction**
* **Inventory Forecasting Engine**
* **Agent-style automations (task-level actions)**

---

## 🩺 **2. Clinical Operations**

Built for doctors, nurses, and hospital admins.

* Patient registration & tracking
* OPD / IPD encounters
* Vitals recording
* Diagnoses + ICD-10
* Prescriptions
* Lab results
* Bed & ward management
* Equipment tracking

---

## 💊 **3. Pharmacy & Inventory**

Designed to align with HealthTech founders like **PharmEasy**.

* Live stock monitoring
* Auto inventory deduction on prescriptions
* Low-stock alerts
* Reorder recommendations
* Supplier integration scaffolding

---

## 💸 **4. Finance & BI**

* Billing dashboard
* Insurance workflow
* Cost calculator / affordability scoring
* Reports dashboard
* System health dashboard

---

## 🌿 **5. Wellness & D2C Layer**

Inspired by Dr. Vaidya’s D2C philosophy.

* Patient wellness dashboard
* Trends (BMI, vitals, activity placeholders)
* Wellness recommendation engine
* Notification system for reminders

---

## 🧱 **6. Enterprise Architecture**

Built to impress industry CTOs like from HCLTech.

* Strict RBAC with Custom Claims
* Unified audit logs
* System monitor dashboard
* Clean modular code
* Firestore indexing strategy
* Cloud Functions with structured JSON responses

---

# 📦 **Dataset Integration**

### The project uses a unified data import pipeline via:

```
seedHMSData()
```

This Cloud Function:

✔ Downloads the dataset ZIP
✔ Extracts and parses CSV files
✔ Maps each dataset to correct Firestore collections
✔ Links patients → encounters → vitals
✔ Updates inventory and reorder flags
✔ Seeds AI forecasting data

### Included Files in Dataset

```
dataset_A_admissions.csv     → patients, encounters, beds
dataset_B_consumption.csv    → prescriptions + inventory usage
dataset_C_inventory.csv      → inventory master
dataset_D_external.csv       → AI forecasting data
reorder_list.csv             → low stock alerts
```

Notebooks (`model1–4.ipynb`) contain prototype ML logic for forecasting and can be converted into Cloud Functions.

---

# 🏗 **Tech Stack**

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Frontend       | React + TailwindCSS                 |
| Backend        | Firebase Cloud Functions            |
| Database       | Firestore (NoSQL)                   |
| Auth           | Firebase Auth + Custom Claims       |
| Storage        | Firebase Storage                    |
| AI Scaffolding | Python → Converted to Node.js funcs |
| Deployment     | Firebase Hosting / Studio           |

---

# 📁 **Repository Structure**

```
/src
  /pages (40 pages)
  /components
  /layouts
  /utils

/functions
  seedHMSData.js
  ai_decision_engine.js
  auto_summaries.js
  forecasting.js
  inventorySync.js
  wellness_engine.js
  auditLogs.js

/firestore
  schema
  security.rules
  indexes.json

/storage
  MUMBAI.zip
```

---

# 🔐 **Role-Based Access**

| Role       | Access                                    |
| ---------- | ----------------------------------------- |
| Admin      | Full system access                        |
| Doctor     | Patients, encounters, prescriptions, labs |
| Nurse      | Vitals, beds, wards, ICU                  |
| Lab Tech   | Lab modules                               |
| Pharmacist | Inventory + prescriptions                 |
| Staff      | Equipment + basic inventory               |

Implemented via **custom claims + Firestore rules**.

---

# ⚙️ **How to Seed Data**

Upload the ZIP to Firebase Storage and run:

```
firebase functions:shell
> seedHMSData()
```

This will populate all collections with synthetic but realistic hospital data.

---

# 🎯 **Why This Project Is Unique**

This HMS is not just CRUD pages — it is:

### ✔ AI-integrated

### ✔ Dataset-driven

### ✔ Enterprise-clean

### ✔ HealthTech-practical

### ✔ D2C-friendly for patients

### ✔ Built to scale

### ✔ Built to impress judges

Every module reflects real-world hospital workflows while layering AI on top of structured health data.

---
