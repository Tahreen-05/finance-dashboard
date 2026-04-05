// i created this file to hold utility functions related to transactions, such as calculating insights for the dashboard
// Helper: get week number (ISO) – not used now, but kept for future
const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNum = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return { year: d.getFullYear(), week: weekNum };
};

export const filterTransactions = (transactions, filters) => {
    let filtered = [...transactions];
    if (filters.type !== 'all') filtered = filtered.filter(t => t.type === filters.type);
    if (filters.category !== 'all') filtered = filtered.filter(t => t.category === filters.category);
    if (filters.search.trim()) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(t =>
            t.description.toLowerCase().includes(searchLower) ||
            t.category.toLowerCase().includes(searchLower)
        );
    }
    switch (filters.sortBy) {
        case 'date-asc': filtered.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
        case 'date-desc': filtered.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
        case 'amount-asc': filtered.sort((a, b) => a.amount - b.amount); break;
        case 'amount-desc': filtered.sort((a, b) => b.amount - a.amount); break;
        default: break;
    }
    return filtered;
};
export const getSummary = (transactions) => {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense };
};
export const getIncomeExpenseOverTime = (transactions) => {
    const monthly = new Map(); // Use Map for clarity
    transactions.forEach(t => {
        const date = new Date(t.date);
        if (isNaN(date.getTime())) return; // skip invalid dates
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!monthly.has(monthKey)) {
            monthly.set(monthKey, { month: monthKey, income: 0, expenses: 0 });
        }
        const entry = monthly.get(monthKey);
        if (t.type === 'income') entry.income += t.amount;
        else entry.expenses += t.amount;
    });
    return Array.from(monthly.values())
        .sort((a, b) => a.month.localeCompare(b.month))
        .map(m => ({
            ...m,
            label: new Date(m.month + '-01').toLocaleString('default', { month: 'short', year: '2-digit' })
        }));
};
export const getSpendingByCategory = (transactions) => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = {};
    expenses.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
};
export const formatCurrency = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) return '₹0.00';
    const sign = amount < 0 ? '-' : '';
    const absAmount = Math.abs(amount);
    const rupees = Math.floor(absAmount);
    const paise = Math.round((absAmount - rupees) * 100);
    const formattedRupees = rupees.toLocaleString('en-IN');
    const formattedPaise = paise.toString().padStart(2, '0');
    return `${sign}₹${formattedRupees}.${formattedPaise}`;
};
export const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
// Monthly data for bar chart
export const getMonthlyBarData = (transactions, monthsCount = 6) => {
    const monthlyMap = {};
    transactions.forEach(t => {
        const month = t.date.slice(0, 7);
        if (!monthlyMap[month]) monthlyMap[month] = { month, income: 0, expenses: 0 };
        if (t.type === 'income') monthlyMap[month].income += t.amount;
        else monthlyMap[month].expenses += t.amount;
    });
    const sorted = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));
    const lastMonths = sorted.slice(-monthsCount);
    return lastMonths.map(m => ({
        month: new Date(m.month + '-01').toLocaleString('default', { month: 'short' }),
        income: m.income,
        expenses: m.expenses,
    }));
};
export const getInsights = (transactions) => {
    if (!transactions.length) {
        return {
            highestCategory: null,
            monthlyExpenses: { current: 0, previous: 0, change: '0.0' },
            totalExpenses: 0,
            totalIncome: 0,
            messages: ['📊 Add some transactions to see personalized insights.'],
        };
    }

    const expenses = transactions.filter(t => t.type === 'expense');
    const incomes = transactions.filter(t => t.type === 'income');

    // Highest spending category
    const categoryTotals = {};
    expenses.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    let highestCategory = null, highestAmount = 0;
    for (const [cat, amt] of Object.entries(categoryTotals)) {
        if (amt > highestAmount) { highestAmount = amt; highestCategory = cat; }
    }

    // Monthly based on latest transaction date
    const latestDate = new Date(Math.max(...transactions.map(t => new Date(t.date))));
    const currentYear = latestDate.getFullYear();
    const currentMonth = latestDate.getMonth();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const currentMonthExpenses = expenses.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).reduce((s, t) => s + t.amount, 0);
    const prevMonthExpenses = expenses.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
    }).reduce((s, t) => s + t.amount, 0);
    let monthlyChange = 0;
    if (prevMonthExpenses > 0) monthlyChange = ((currentMonthExpenses - prevMonthExpenses) / prevMonthExpenses) * 100;
    else if (currentMonthExpenses > 0) monthlyChange = 100;

    const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
    const totalIncome = incomes.reduce((s, t) => s + t.amount, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

    // Build friendly messages
    const messages = [];

    if (monthlyChange > 5) {
        messages.push(`📈 Your spending increased by ${monthlyChange.toFixed(0)}% compared to last month. Consider reviewing your budget.`);
    } else if (monthlyChange < -5) {
        messages.push(`🎉 Great job! Your spending decreased by ${Math.abs(monthlyChange).toFixed(0)}% from last month.`);
    } else if (Math.abs(monthlyChange) <= 5 && monthlyChange !== 0) {
        messages.push(`👍 Your spending is stable (${monthlyChange.toFixed(0)}% change from last month).`);
    }

    if (highestCategory) {
        const categoryPercent = ((highestAmount / totalExpenses) * 100).toFixed(0);
        messages.push(`🍽️ Your top spending category is ${highestCategory} – ${categoryPercent}% of total expenses.`);
    }

    if (savingsRate > 20) {
        messages.push(`💰 Excellent savings rate of ${savingsRate}%! Keep it up.`);
    } else if (savingsRate < 0) {
        messages.push(`⚠️ Your expenses exceed income. Try to reduce spending or increase income.`);
    } else if (savingsRate < 10 && savingsRate >= 0) {
        messages.push(`📉 Your savings rate is ${savingsRate}%. Small changes can make a big difference.`);
    }

    if (totalExpenses > 0 && totalIncome > 0) {
        const ratio = totalExpenses / totalIncome;
        if (ratio > 0.9) messages.push(`🔥 You're spending over 90% of your income. Time to review non‑essentials.`);
        else if (ratio < 0.5) messages.push(`✨ You're spending less than half your income – that's very healthy!`);
    }

    // Add a tip if there are many small transactions
    const smallTransactions = expenses.filter(t => t.amount < 500).length;
    if (smallTransactions > 5) {
        messages.push(`💡 You have ${smallTransactions} small expenses under ₹500. Tracking them could reveal savings.`);
    }

    return {
        highestCategory: highestCategory ? { name: highestCategory, amount: highestAmount } : null,
        monthlyExpenses: { current: currentMonthExpenses, previous: prevMonthExpenses, change: monthlyChange.toFixed(1) },
        totalExpenses,
        totalIncome,
        savingsRate: parseFloat(savingsRate),
        messages,
    };
};
