import React from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { getInsights, getMonthlyBarData, formatCurrency } from '../utils/transactionUtils';
import { FaChartLine, FaChartPie, FaArrowUp, FaArrowDown, FaTrophy, FaWallet } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Insights = ({ compact = false }) => {
    const { state } = useApp();
    const { darkMode: isDark } = useTheme();
    const insights = getInsights(state.transactions);
    const transactions = state.transactions;
    const totalSpending = insights.totalExpenses;

    const largestExpense = [...transactions]
        .filter(t => t.type === 'expense')
        .sort((a, b) => b.amount - a.amount)[0];
    const largestIncome = [...transactions]
        .filter(t => t.type === 'income')
        .sort((a, b) => b.amount - a.amount)[0];

    const categoryTotals = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    const topCategories = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, amount]) => ({ name, amount, percent: (amount / totalSpending) * 100 }));

    const monthlyBarData = getMonthlyBarData(transactions, 6);

    if (compact) {
        return (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {insights.highestCategory && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Highest Category</p>
                            <p className="text-lg font-bold text-gray-800 dark:text-white">{insights.highestCategory.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{formatCurrency(insights.highestCategory.amount)}</p>
                        </div>
                    )}
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Change</p>
                        <p className="text-lg font-bold text-gray-800 dark:text-white">{insights.monthlyExpenses.change > 0 ? '+' : ''}{insights.monthlyExpenses.change}%</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Savings Rate</p>
                        <p className="text-lg font-bold text-gray-800 dark:text-white">
                            {insights.totalIncome > 0 ? ((insights.totalIncome - insights.totalExpenses) / insights.totalIncome * 100).toFixed(1) : 0}%
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Smart Insights Messages */}
            {insights.messages && insights.messages.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <FaChartLine className="text-indigo-500" /> Smart Insights
                    </h4>
                    <div className="space-y-2">
                        {insights.messages.map((msg, idx) => (
                            <div key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                <span className="text-indigo-500">•</span>
                                <span>{msg}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Three stat cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {insights.highestCategory && (
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Top Category</p>
                                <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{insights.highestCategory.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{formatCurrency(insights.highestCategory.amount)}</p>
                            </div>
                            <FaTrophy className="text-yellow-500 text-2xl" />
                        </div>
                        <div className="mt-3">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${(insights.highestCategory.amount / totalSpending) * 100}%` }} />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{((insights.highestCategory.amount / totalSpending) * 100).toFixed(0)}% of total spending</p>
                        </div>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Monthly Trend</p>
                            <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{insights.monthlyExpenses.change > 0 ? '+' : ''}{insights.monthlyExpenses.change}%</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">vs last month</p>
                        </div>
                        {insights.monthlyExpenses.change > 0 ? <FaArrowUp className="text-red-500 text-2xl" /> : <FaArrowDown className="text-green-500 text-2xl" />}
                    </div>
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                        This month: {formatCurrency(insights.monthlyExpenses.current)}<br />
                        Last month: {formatCurrency(insights.monthlyExpenses.previous)}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Savings Rate</p>
                            <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{insights.totalIncome > 0 ? ((insights.totalIncome - insights.totalExpenses) / insights.totalIncome * 100).toFixed(1) : 0}%</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">of total earnings</p>
                        </div>
                        <FaWallet className="text-emerald-500 text-2xl" />
                    </div>
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                        Earnings: {formatCurrency(insights.totalIncome)}<br />
                        Expenses: {formatCurrency(insights.totalExpenses)}
                    </div>
                </div>
            </div>

            {/* Monthly Bar Chart */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Monthly Income vs Expenses</h4>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={monthlyBarData}>
                        <XAxis dataKey="month" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" tickFormatter={(val) => `₹${val / 1000}k`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: isDark ? '#1F2937' : '#FFFFFF', color: isDark ? '#F9FAFB' : '#111827' }}
                            formatter={(value) => formatCurrency(value)}
                        />
                        <Legend />
                        <Bar dataKey="income" fill="#22c55e" name="Income" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Top Spending Categories */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                    <FaChartPie className="text-indigo-500" />
                    <h4 className="font-semibold text-gray-800 dark:text-white">Top Spending Categories</h4>
                </div>
                <div className="space-y-3">
                    {topCategories.map((cat) => (
                        <div key={cat.name}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-700 dark:text-gray-300">{cat.name}</span>
                                <span className="text-gray-800 dark:text-gray-200 font-medium">{formatCurrency(cat.amount)}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${cat.percent}%` }} />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cat.percent.toFixed(0)}% of total spending</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Largest Transactions */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {largestExpense && (
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Largest Expense</p>
                            <p className="text-base font-semibold text-gray-800 dark:text-white mt-1">{largestExpense.description}</p>
                            <p className="text-sm text-red-600 dark:text-red-400">{formatCurrency(largestExpense.amount)}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{largestExpense.category} · {largestExpense.date}</p>
                        </div>
                    )}
                    {largestIncome && (
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Largest Income</p>
                            <p className="text-base font-semibold text-gray-800 dark:text-white mt-1">{largestIncome.description}</p>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400">{formatCurrency(largestIncome.amount)}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{largestIncome.category} · {largestIncome.date}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Insights;
