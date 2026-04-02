export const CATEGORIES = [
    "Food & Dining",
    "Transport",
    "Shopping",
    "Entertainment",
    "Health",
    "Utilities",
    "Salary",
    "Freelance",
    "Investment",
    "Rent",
];

export const CATEGORY_COLORS = {
    "Food & Dining": "#f59e0b",
    Transport: "#3b82f6",
    Shopping: "#ec4899",
    Entertainment: "#8b5cf6",
    Health: "#10b981",
    Utilities: "#6b7280",
    Salary: "#22c55e",
    Freelance: "#06b6d4",
    Investment: "#f97316",
    Rent: "#ef4444",
};

export const mockTransactions = [
    { id: 1, date: "2024-01-03", description: "Monthly Salary", category: "Salary", amount: 85000, type: "income" },
    { id: 2, date: "2024-01-04", description: "Apartment Rent", category: "Rent", amount: 18000, type: "expense" },
    { id: 3, date: "2024-01-05", description: "Swiggy Order", category: "Food & Dining", amount: 420, type: "expense" },
    { id: 4, date: "2024-01-07", description: "Ola Ride", category: "Transport", amount: 180, type: "expense" },
    { id: 5, date: "2024-01-09", description: "Netflix Subscription", category: "Entertainment", amount: 649, type: "expense" },
    { id: 6, date: "2024-01-10", description: "Freelance Project - UI", category: "Freelance", amount: 22000, type: "income" },
    { id: 7, date: "2024-01-12", description: "Apollo Pharmacy", category: "Health", amount: 860, type: "expense" },
    { id: 8, date: "2024-01-14", description: "Amazon Shopping", category: "Shopping", amount: 3200, type: "expense" },
    { id: 9, date: "2024-01-15", description: "Electricity Bill", category: "Utilities", amount: 1100, type: "expense" },
    { id: 10, date: "2024-01-18", description: "Zomato Order", category: "Food & Dining", amount: 560, type: "expense" },
    { id: 11, date: "2024-01-20", description: "Mutual Fund SIP", category: "Investment", amount: 5000, type: "expense" },
    { id: 12, date: "2024-01-22", description: "Metro Card Recharge", category: "Transport", amount: 500, type: "expense" },
    { id: 13, date: "2024-01-25", description: "Gym Membership", category: "Health", amount: 1500, type: "expense" },
    { id: 14, date: "2024-01-28", description: "Myntra Purchase", category: "Shopping", amount: 2100, type: "expense" },
    { id: 15, date: "2024-02-01", description: "Monthly Salary", category: "Salary", amount: 85000, type: "income" },
    { id: 16, date: "2024-02-02", description: "Apartment Rent", category: "Rent", amount: 18000, type: "expense" },
    { id: 17, date: "2024-02-05", description: "Blinkit Groceries", category: "Food & Dining", amount: 1240, type: "expense" },
    { id: 18, date: "2024-02-07", description: "Rapido Ride", category: "Transport", amount: 95, type: "expense" },
    { id: 19, date: "2024-02-10", description: "Freelance Project - App", category: "Freelance", amount: 35000, type: "income" },
    { id: 20, date: "2024-02-12", description: "BookMyShow", category: "Entertainment", amount: 800, type: "expense" },
    { id: 21, date: "2024-02-14", description: "Valentine Dinner", category: "Food & Dining", amount: 2800, type: "expense" },
    { id: 22, date: "2024-02-16", description: "Water Bill", category: "Utilities", amount: 300, type: "expense" },
    { id: 23, date: "2024-02-18", description: "Flipkart Sale", category: "Shopping", amount: 4500, type: "expense" },
    { id: 24, date: "2024-02-20", description: "Mutual Fund SIP", category: "Investment", amount: 5000, type: "expense" },
    { id: 25, date: "2024-02-25", description: "Doctor Consultation", category: "Health", amount: 600, type: "expense" },
    { id: 26, date: "2024-03-01", description: "Monthly Salary", category: "Salary", amount: 90000, type: "income" },
    { id: 27, date: "2024-03-02", description: "Apartment Rent", category: "Rent", amount: 18000, type: "expense" },
    { id: 28, date: "2024-03-04", description: "Swiggy Order", category: "Food & Dining", amount: 380, type: "expense" },
    { id: 29, date: "2024-03-06", description: "Uber Ride", category: "Transport", amount: 320, type: "expense" },
    { id: 30, date: "2024-03-08", description: "Spotify Premium", category: "Entertainment", amount: 119, type: "expense" },
    { id: 31, date: "2024-03-10", description: "Freelance Project - Web", category: "Freelance", amount: 18000, type: "income" },
    { id: 32, date: "2024-03-12", description: "Medical Test", category: "Health", amount: 1400, type: "expense" },
    { id: 33, date: "2024-03-15", description: "Amazon Electronics", category: "Shopping", amount: 8900, type: "expense" },
    { id: 34, date: "2024-03-18", description: "Internet Bill", category: "Utilities", amount: 799, type: "expense" },
    { id: 35, date: "2024-03-20", description: "Mutual Fund SIP", category: "Investment", amount: 5000, type: "expense" },
    { id: 36, date: "2024-03-22", description: "Zomato Order", category: "Food & Dining", amount: 720, type: "expense" },
    { id: 37, date: "2024-03-25", description: "Nykaa Purchase", category: "Shopping", amount: 1650, type: "expense" },
    { id: 38, date: "2024-03-28", description: "Movie Tickets", category: "Entertainment", amount: 600, type: "expense" },
];

export const getMonthlyData = (transactions) => {
    const months = {};
    transactions.forEach((t) => {
        const month = t.date.slice(0, 7);
        if (!months[month]) months[month] = { month, income: 0, expenses: 0 };
        if (t.type === "income") months[month].income += t.amount;
        else months[month].expenses += t.amount;
    });
    return Object.values(months).map((m) => ({
        ...m,
        balance: m.income - m.expenses,
        label: new Date(m.month + "-01").toLocaleString("default", { month: "short", year: "2-digit" }),
    }));
};

export const getCategoryBreakdown = (transactions) => {
    const cats = {};
    transactions
        .filter((t) => t.type === "expense")
        .forEach((t) => {
            cats[t.category] = (cats[t.category] || 0) + t.amount;
        });
    return Object.entries(cats)
        .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || "#6b7280" }))
        .sort((a, b) => b.value - a.value);
};