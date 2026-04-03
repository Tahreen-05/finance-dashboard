# FinView – Smart Finance Dashboard

A modern, responsive finance dashboard built with React, Tailwind CSS, and Recharts. Track income, expenses, and spending patterns with a clean UI, dark mode, role‑based access, and full data persistence.
![Overview page](image.png)
![Transactions page](image-1.png)
![Insights page](image-2.png)
## ✨ Features

### 📌 Core
- **Overview** – Summary cards (balance, income, expenses), interactive area chart (income vs expenses), doughnut chart (spending by category), and recent activity feed.
- **Transactions** – Full transaction list with filtering (type, category, search), sorting (date, amount, description), and **CSV/JSON export**.
- **Role‑Based UI** – Switch between **Viewer** (read‑only) and **Admin** (add, edit, delete transactions).
- **Insights** – Top spending category, monthly expense comparison, savings rate, top 3 categories (progress bars), largest expense/income, and monthly income/expenses bar chart.
- **State Management** – React Context + useReducer with localStorage persistence (transactions & role survive page refresh).
### 🎨 Enhancements
- **Dark Mode** – One‑click toggle, saved in localStorage.
- **Sidebar Navigation** – Collapsible hamburger menu (mobile‑friendly) to switch between Overview, Transactions, and Insights.
- **Custom Categories** – Admins can add custom categories on‑the‑fly by selecting “Other” in the add transaction form.
- **Responsive Design** – Works flawlessly on desktop, tablet, and mobile.
### Built With
### Built With
[![React][React-shield]][React-url]
[![Tailwind CSS][Tailwind-shield]][Tailwind-url]
[![Vite][Vite-shield]][Vite-url]
[![Recharts][Recharts-shield]][Recharts-url]
[![React Icons][React-Icons-shield]][React-Icons-url]
## 🚀 Getting Started
```bash
# 1️⃣ Clone the repository 
git clone https://github.com/Tahreen-05/finance-dashboard
cd finance-dashboard
# 2️⃣ Install dependencies
npm install
# 3️⃣ Start the development server
npm run dev
[React-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind-shield]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Vite-shield]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Recharts-shield]: https://img.shields.io/badge/Recharts-FF4154?style=for-the-badge&logo=recharts&logoColor=white
[Recharts-url]: https://recharts.org/
[React-Icons-shield]: https://img.shields.io/badge/React_Icons-61DAFB?style=for-the-badge&logo=react&logoColor=white
[React-Icons-url]: https://react-icons.github.io/react-icons/
