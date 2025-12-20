# 🧵 Garments Order & Production Tracker System

A **full-stack Garments Order & Production Management System** designed to streamline communication between **Buyers, Managers, and Admins**.  
The platform allows buyers to place orders and track real-time production progress, managers to handle products and production stages, and admins to control users and system analytics.

---

## 🚀 Live Links

- **Client Live Site:**  
  https://garments-order-productio-c3197.web.app

- **Server API:**  
  https://garments-order-production-system-se.vercel.app

- **Server Repository:**  
  https://github.com/anik5001/garments-order-production-system-server

---

## 🎯 Project Purpose

Small and medium garment factories often struggle with:
- Order tracking
- Production visibility
- Role-based responsibility management

This system solves those issues by providing:
- Structured production stages
- Secure online payments
- Role-based dashboards
- Real-time order tracking

---

## 🧑‍💼 User Roles & Permissions

### 👤 Buyer
- Browse products
- View product details
- Place booking/orders
- Pay via **Stripe** or choose **Cash on Delivery**
- Track order production timeline
- Cancel pending orders

### 🧑‍🏭 Manager
- Add & manage products
- Approve or reject orders
- Update production tracking stages
- View assigned orders
- Profile management

### 🧑‍💻 Admin
- Manage users (approve, suspend, role update)
- View all products
- Control home page featured products
- Monitor all orders
- View system analytics (optional)

---

## ✨ Key Features

### 🏠 Home Page
- Animated Hero Banner
- Featured Products (from MongoDB)
- How It Works (step-by-step)
- Customer Feedback Carousel
- Extra professional sections (Why Choose Us, System Workflow)

### 🛒 Product System
- All Products page with search & filter
- Product Details (Private Route)
- Minimum order quantity validation
- Multiple payment options (COD / Stripe)

### 💳 Payment System
- **Stripe Checkout Integration**
- Secure payment session
- Payment verification before order creation
- Automatic redirect after payment success

### 🏭 Production Tracking
- Visual timeline:
  - Cutting Completed
  - Sewing Started
  - Finishing
  - QC Checked
  - Packed
  - Shipped
- Read-only access for buyers
- Manager-controlled updates

### 📊 Dashboard
- Role-based private routes
- Responsive sidebar layout
- Data tables with search & pagination
- SweetAlert confirmation for CRUD actions

---

## 🔐 Security & Best Practices

- Firebase Authentication
- Firebase Admin SDK (server-side verification)
- JWT stored in **HTTP-only cookies**
- Protected private routes
- Environment variables for:
  - Firebase config
  - MongoDB credentials
  - Stripe secret key
- Proper CORS handling
- Reload-safe routing (no redirect on refresh)

---

## 🛠 Tech Stack

### Frontend
- React 19
- Tailwind CSS 4
- DaisyUI
- Framer Motion
- TanStack React Query v5
- React Hook Form
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Stripe API
- Firebase Admin SDK

### Tools & Libraries
- SweetAlert2
- React Hot Toast
- Swiper.js
- Lucide Icons / React Icons

---

## 📦 Major Dependencies

| Package | Purpose |
|------|--------|
| @tanstack/react-query | Data fetching & caching |
| firebase | Authentication & hosting |
| stripe | Online payments |
| react-hook-form | Form validation |
| axios | API communication |
| framer-motion | Animations |
| sweetalert2 | Alerts & confirmations |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repositories
```bash
git clone https://github.com/anik5001/garments-order-production-client.git
git clone https://github.com/anik5001/garments-order-production-system-server.git
###2️⃣ Install Dependencies
npm install

###3️⃣ Environment Variables
Client (.env)
VITE_API_URL=your_server_url
VITE_FIREBASE_API_KEY=your_key
VITE_IMAGE_HOST_KEY=your_imgbb_key

Server (.env)
MONGODB_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret
CLIENT_DOMAIN=your_client_url

###4️⃣ Run Project
npm run dev
