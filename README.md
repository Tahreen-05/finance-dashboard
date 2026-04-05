<div align="center">

  <img src="https://img.shields.io/badge/FinView-t%20Finance%20Dashboard-E8820C?style=for-the-badge&logo=react&logoColor=white" alt="FinView Banner" />

  <h3 align="center">💰 FinView - Finance Dashboard</h3>

  <p align="center">
    A modern, responsive finance dashboard built with React, Tailwind CSS, and Recharts.<br/>
    Track income, expenses, and spending patterns with a clean UI, dark mode, role‑based access, and full data persistence.
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
    <img src="https://img.shields.io/badge/Recharts-FF6B6B?style=for-the-badge&logo=chartdotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/React_Icons-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  </p>

</div>

---

## 📸 Screenshots

<p align="center">
  <img src="image.png" alt="Overview Page" width="900" />
  <br/><em>Overview - Balance KPIs, monthly area chart, spending donut chart & recent activity</em>
</p>

<p align="center">
  <img src="image-1.png" alt="Transactions Page" width="900" />
  <br/><em>Transactions - Full list with filters, sorting, and CSV/JSON export</em>
</p>

<p align="center">
  <img src="image-2.png" alt="Insights Page" width="900" />
  <br/><em>Insights - Savings rate, top categories, monthly bar chart & largest transactions</em>
</p>

---

## ✨ Features

### 📌 Core

- **Overview** - Summary cards (balance, income, expenses), interactive area chart (income vs expenses), doughnut chart (spending by category), and recent activity feed.
- **Transactions** - Full transaction list with filtering (type, category, search), sorting (date, amount, description), and **CSV/JSON export**.
- **Role‑Based UI** - Switch between **Viewer** (read‑only) and **Admin** (add, edit, delete transactions).
- **Insights** - Top spending category, monthly expense comparison, savings rate, top 3 categories (progress bars), largest expense/income, and monthly income/expenses bar chart.
- **State Management** - React Context + useReducer with localStorage persistence (transactions & role survive page refresh).

### 🎨 Enhancements

- **Dark Mode** - One‑click toggle, saved in localStorage.
- **Sidebar Navigation** - Collapsible hamburger menu (mobile‑friendly) to switch between Overview, Transactions, and Insights.
- **Custom Categories** - Admins can add custom categories on‑the‑fly by selecting "Other" in the add transaction form.
- **Responsive Design** - Works flawlessly on desktop, tablet, and mobile.

---

## 🛠️ Built With

| Layer | Technology |
|-------|------------|
| ⚛️ Framework | [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/) |
| 🎨 Styling | [Tailwind CSS](https://tailwindcss.com/) |
| 📈 Charts | [Recharts](https://recharts.org/) |
| 🗃️ State Management | React Context + useReducer |
| 🔤 Icons | [React Icons](https://react-icons.github.io/react-icons/) |

---

## 🧠 Architecture & Design

### High‑Level Overview

FinView is a **frontend‑only single‑page application (SPA)** built with React (Vite), Tailwind CSS, and Recharts. All data is stored locally in the browser's `localStorage` – no backend or external database is required.

### State Flow
User action → Dispatch action → Reducer updates state → Components re‑render → localStorage sync

---


## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Tahreen-05/finance-dashboard.git
cd finance-dashboard

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start the development server
npm run dev

