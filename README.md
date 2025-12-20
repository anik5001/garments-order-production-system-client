# 🧵 Garments Order and Production System Tracker

A professional full-stack Garments Management System designed to bridge the gap between Buyers, Managers, and Admins. This platform allows buyers to place orders and track the real-time production status (Cutting, Sewing, QC, etc.), while managers handle the manufacturing workflow.

---

## 🚀 Live Links

- **Client Live Site:** [https://garments-order-productio-c3197.web.app](https://garments-order-productio-c3197.web.app)
- **Server API:** [https://garments-order-production-system-se.vercel.app](https://garments-order-production-system-se.vercel.app)
- **Server Repository:** [GitHub Repo](https://github.com/anik5001/garments-order-production-system-server)

---

## 🛠 Tech Stack

**Frontend:** React 19, Tailwind CSS 4, DaisyUI, Framer Motion (Animations)  
**State Management:** TanStack Query (React Query) v5  
**Authentication:** Firebase Authentication & Firebase Admin SDK  
**Backend:** Node.js, Express.js, MongoDB  
**Form Handling:** React Hook Form  
**UI Notifications:** React Hot Toast, SweetAlert2  

---

## ✨ Key Features

### 👤 User Roles & Access Control
- **Buyer:** Can browse products, book orders, pay via PayFast, and track their order's production timeline.
- **Manager:** Can add/manage products and update the production status of approved orders (e.g., Cutting Completed, Sewing Started).
- **Admin:** Manages user roles, approves manager accounts, and monitors all system activity.

### 🏭 Production Tracking System
- **Real-time Timeline:** A visual step-by-step progress tracker for every order.
- **Update Logs:** Managers can add notes, locations, and timestamps for every production milestone.
- **Dynamic Status:** Auto-updates from "Pending" to "Approved" and through various manufacturing stages.

### 🔐 Security & UX
- **Firebase Admin SDK:** Verified backend routes to ensure data integrity and role-based security.
- **Responsive Dashboard:** A professional sidebar-based layout optimized for mobile and desktop.
- **Interactive UI:** Smooth transitions using Framer Motion and modern components from DaisyUI.

---

## 📦 Major Dependencies

| Package | Purpose |
| :--- | :--- |
| `@tanstack/react-query` | Efficient data fetching and caching |
| `firebase` | Authentication and hosting |
| `framer-motion` | Smooth UI animations and transitions |
| `axios` | Promise-based HTTP client for API calls |
| `react-hook-form` | Performance-oriented form validation |
| `lucide-react` & `react-icons` | Comprehensive icon library |
| `swiper` | Interactive product carousels |
| `sweetalert2` | Beautiful popup alerts |

---

## 🛠 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/garments-order-production-client.git](https://github.com/your-username/garments-order-production-client.git)

   Install dependencies:

Bash

npm install
Environment Configuration: Create a .env.local file in the root and add your Firebase and API configuration:

Code snippet

VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_id
VITE_appId=your_app_id
VITE_API_URL=[https://garments-order-production-system-se.vercel.app](https://garments-order-production-system-se.vercel.app)
Run the project:

Bash

npm run dev```
