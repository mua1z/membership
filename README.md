# MCMS-DDU - Membership Contribution Management System
## Dire Dawa City Administration

An enterprise-grade web application for managing membership contributions, replacing Excel-based workflows with a fully automated, directive-based calculation system.

---

## 🎯 Features

### Core Features
- ✅ **Complete Excel Replacement** - Digital member management with auto-classification
- ✅ **Directive-Based Calculations** - Automatic contribution calculation based on member type
- ✅ **Payment Tracking** - Record payments with automatic receipt generation
- ✅ **PDF Receipts** - Unique receipt ID for every payment with official PDF download
- ✅ **Financial Reports** - Monthly, yearly, HQ vs Branch distribution
- ✅ **Defaulter Detection** - Automatic identification of unpaid members
- ✅ **Excel Import/Export** - Bulk import from Excel with validation
- ✅ **Dashboard Analytics** - Charts, trends, top contributors, Urban vs Rural
- ✅ **Role-Based Access** - Admin, Operator, Viewer roles
- ✅ **Dark Mode** - Full dark mode support
- ✅ **Responsive UI** - Works on desktop, tablet, and mobile

### Advanced Features (NEW)
- ✅ **Cluster/Sector Hierarchy** - Urban/Rural cluster with 25+ sectors
- ✅ **PDF Receipt Generation** - Official formatted PDF receipts with download
- ✅ **SMS Notification Service** - Placeholder for Twilio/Africa's Talking integration
- ✅ **Backup System** - Database backup and restore utilities
- ✅ **Multi-Language Support** - Framework for English/Amharic translations
- ✅ **Wing Management** - Women & Youth wing tracking
- ✅ **Receipt Modal** - View, print, and download receipts directly from UI

---

## 🧱 Tech Stack

### Backend
- **Node.js + Express** - REST API server
- **MySQL + Sequelize** - Relational database & ORM
- **JWT Authentication** - Secure token-based auth
- **Multer + XLSX** - Excel file processing

### Frontend
- **React + TypeScript** - Type-safe UI components
- **Tailwind CSS** - Modern styling
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Router** - Client-side routing

---

## 📋 Prerequisites

- **Node.js** v18+ 
- **MySQL** 8.0+ or **MariaDB**
- **npm** or **yarn**

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment

Create `backend/.env` (already provided):

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d

# Database Configuration (MySQL)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=membership_fee_db
DB_PORT=3306

FRONTEND_URL=http://localhost:5173
```

### 3. Setup Database

1. Create a MySQL database named `membership_fee_db`.
2. The tables will be automatically created by Sequelize when you start the backend.

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 🔐 Default Login

After starting the app for the first time, you need to register an admin user:

### Register via API (using Postman/curl):

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@mcms.ddu",
    "password": "admin123",
    "fullName": "System Administrator",
    "role": "admin"
  }'
```

Then login with:
- **Email:** `admin@mcms.ddu`
- **Password:** `admin123`

---

## 📚 API Documentation

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/auth/users` | Get all users | Admin |

### Members
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/members` | Create member | Admin, Operator |
| GET | `/api/members` | Get members (paginated) | Yes |
| GET | `/api/members/:id` | Get single member | Yes |
| PUT | `/api/members/:id` | Update member | Admin, Operator |
| DELETE | `/api/members/:id` | Delete member | Admin |
| POST | `/api/members/bulk` | Bulk create members | Admin, Operator |
| GET | `/api/members/stats` | Get member statistics | Yes |

### Payments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/payments` | Record payment | Admin, Operator |
| GET | `/api/payments` | Get payments | Yes |
| GET | `/api/payments/:id` | Get single payment | Yes |
| GET | `/api/payments/member/:memberId` | Get payments by member | Yes |
| POST | `/api/payments/bulk` | Bulk payments | Admin, Operator |

### Receipts
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/receipts` | Get receipts | Yes |
| GET | `/api/receipts/:id` | Get single receipt | Yes |
| GET | `/api/receipts/id/:receiptId` | Get by receipt ID | Yes |
| PUT | `/api/receipts/:id/void` | Void receipt | Admin |
| GET | `/api/receipts/:id/pdf` | Get PDF data | Yes |

### Reports
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/reports/monthly-revenue` | Monthly revenue report | Yes |
| GET | `/api/reports/yearly-revenue` | Yearly revenue report | Yes |
| GET | `/api/reports/hq-branch` | HQ vs Branch distribution | Yes |
| GET | `/api/reports/defaulters` | Defaulter report | Yes |
| GET | `/api/reports/export` | Export all data | Yes |

### Dashboard
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/dashboard/stats` | Dashboard statistics | Yes |
| GET | `/api/dashboard/growth` | Growth rate | Yes |

### Import
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/import` | Import from Excel | Admin, Operator |
| GET | `/api/import/template` | Get import template | Yes |

### Backup
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/backup/create` | Create database backup | Admin |
| POST | `/api/backup/export-json` | Export data as JSON | Yes |
| GET | `/api/backup/list` | List all backups | Admin |
| DELETE | `/api/backup/delete` | Delete a backup | Admin |
| POST | `/api/backup/clean` | Clean old backups | Admin |

---

## 📊 Member Classification System

### Salary-Based Members
| Employment Type | Salary Range | Percentage |
|----------------|--------------|------------|
| Government | ≤ 5,000 | 1% |
| Government | 5,001 - 10,000 | 2% |
| Government | 10,001 - 20,000 | 3% |
| Government | 20,001 - 50,000 | 4% |
| Government | > 50,000 | 5% |
| Private/NGO | ≤ 10,000 | 2% |
| Private/NGO | 10,001 - 25,000 | 3% |
| Private/NGO | 25,001 - 50,000 | 4% |
| Private/NGO | > 50,000 | 5% |
| Embassy | Any | 5% (USD) |

### Fixed Fee Members
| Type | Monthly Fee |
|------|-------------|
| Student | 1 ETB |
| Farmer | 5 ETB |
| Pastoralist | 5 ETB |
| Labor | 3 ETB |
| Micro Business | 5 ETB |
| Small Business | 10 ETB |
| Medium Business | 20 ETB |

### Investor Members
| Capital | Monthly Fee |
|---------|-------------|
| ≤ 5M ETB | 500 ETB |
| 5M - 10M ETB | 1,000 ETB |
| > 10M ETB | 2,000 ETB |

### Revenue Distribution
- **HQ Share:** 20% of annual fee
- **Branch Share:** 80% of annual fee

---

## 📥 Excel Import Format

### Required Columns
```
Name, Gender, Phone, Email, Branch, Salary, Currency, EmploymentType, Occupation, BusinessType, Capital, Income
```

---

## 🏗 Project Structure

```
MCMS-DDU/
├── backend/
│   ├── config/
│   │   └── db.js                 # MySQL connection (Sequelize)
│   ├── controllers/              # API Route controllers
│   ├── models/                   # Sequelize models (MySQL tables)
│   ├── routes/                   # Express routes
│   ├── utils/                    # Business logic (Classification, etc)
│   ├── uploads/                  # Uploaded profile photos & docs
│   ├── .env                      # Environment variables
│   └── server.js                 # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/           # Reusable UI components
    │   ├── context/              # State management (Auth, etc)
    │   ├── lib/                  # Axios instance & API config
    │   ├── pages/                # Page components
    │   ├── App.tsx               # Main routing
    │   └── main.tsx              # Entry point
    └── package.json
```

---

## 🔒 Security Features

- **JWT Authentication** - Token-based secure access
- **Role-Based Access Control** - Admin, Operator, Viewer roles
- **Password Hashing** - bcrypt for secure password storage
- **Input Validation** - Server-side validation on all endpoints
- **CORS Protection** - Configured allowed origins
- **No Payment Without Receipt** - Enforced business rule

---

## 🐛 Troubleshooting

### MySQL Connection Error
- Ensure MySQL service is running (check XAMPP or Windows Services).
- Verify `DB_USER` and `DB_PASSWORD` in `backend/.env`.
- Ensure the database `membership_fee_db` exists.

### Port Already in Use
```bash
# Change PORT in backend/.env
PORT=5001
```

### CORS Error
- Ensure `FRONTEND_URL` in `backend/.env` matches your frontend URL.

---

## 📄 License

This project is developed for **Dire Dawa City Administration** internal use.

---

**Developed with ❤️ for Dire Dawa City Administration Finance Bureau**
