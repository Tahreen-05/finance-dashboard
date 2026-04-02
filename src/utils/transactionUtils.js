// this file contains utility functions for transactions, such as filtering, summarizing, and analyzing transactions
export const filterTransactions = (transactions, filters) => {
    let filtered = [...transactions];
    if (filters.type !== 'all') {
        filtered = filtered.filter(t => t.type === filters.type);
    }
    if (filters.category !== 'all') {
        filtered = filtered.filter(t => t.category === filters.category);
    }
    if (filters.search.trim()) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(t =>
            t.description.toLowerCase().includes(searchLower) || t.category.toLowerCase().includes(searchLower));
    }
    switch (filters.sortBy) {
        case 'date-asc':
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'date-desc':
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'amount-asc':
            filtered.sort((a, b) => a.amount - b.amount);
            break;
        case 'amount-desc':
            filtered.sort((a, b) => b.amount - a.amount);
            break;
        default:
            break;
    }
    return filtered;
};
export const getSummary = (transactions) => {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;
    return { income, expense, balance };

};
export const getIncomeExpenseOverTime = (transactions) => {
    const monthly = {};
    transactions.forEach(t => {
        const month = t.date.slice(0, 7);
        if (!monthly[month]) {
            monthly[month] = { month, income: 0, expenses: 0 };
        }
        if (t.type === 'income') {
            monthly[month].income += t.amount;
        } else {
            monthly[month].expenses += t.amount;
        }
    });
    return Object.values(monthly)
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
        if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
        categoryTotals[t.category] += t.amount;
    });
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

export const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
export const getInsights = (transactions) => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals = {};

    expenses.forEach(t => {
        if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
        categoryTotals[t.category] += t.amount;
    });
    let highestCategory = null;
    let highestAmount = 0;
    for (const [cat, amt] of Object.entries(categoryTotals)) {
        if (amt > highestAmount) {
            highestAmount = amt;
            highestCategory = cat;
        }
    }
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const lastMonth = (thisMonth === 0) ? 11 : thisMonth - 1;
    const lastYear = (thisMonth === 0) ? thisYear - 1 : thisYear;
    const thisMonthExpenses = expenses.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    }).reduce((sum, t) => sum + t.amount, 0);
    const lastMonthExpenses = expenses.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === lastMonth && d.getFullYear() === lastYear;
    }).reduce((sum, t) => sum + t.amount, 0);
    let monthlyChange = 0;
    if (lastMonthExpenses > 0) {
        monthlyChange = ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;
    }
    return {
        highestCategory: highestCategory ? { name: highestCategory, amount: highestAmount } : null,
        monthlyExpenses: { current: thisMonthExpenses, previous: lastMonthExpenses, change: monthlyChange.toFixed(1) },
        totalExpenses: expenses.reduce((sum, t) => sum + t.amount, 0),
        totalIncome: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    };

};
