import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { getIncomeExpenseOverTime, getSpendingByCategory } from '../utils/transactionUtils';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#8dd1e1'];
const Charts = () => {
    const { state } = useApp();
    const { darkMode: isDark } = useTheme();
    const lineData = getIncomeExpenseOverTime(state.transactions);
    const categoryData = getSpendingByCategory(state.transactions);
    const formatCurrency = (value) => `$${value.toLocaleString()}`;
    const gridColor = isDark ? 'rgba(75, 85, 99, 0.25)' : 'rgba(156, 163, 175, 0.2)';
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Area Chart */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Income vs Expenses (Monthly)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={lineData}>
                        <defs>
                            <linearGradient id="gradientIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="gradientExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis dataKey="label" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" tickFormatter={formatCurrency} />
                        <Tooltip
                            contentStyle={{ backgroundColor: isDark ? '#1F2937' : '#FFFFFF', color: isDark ? '#F9FAFB' : '#111827' }}
                            formatter={(value) => formatCurrency(value)}
                        />
                        <Legend wrapperStyle={{ color: isDark ? '#F9FAFB' : '#111827' }} />
                        <Area type="monotone" dataKey="income" name="Income" stroke="#22c55e" strokeWidth={2} fill="url(#gradientIncome)" dot={{ r: 3 }} activeDot={{ r: 5 }} />
                        <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={2} fill="url(#gradientExpense)" dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Spending by Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={90}
                            paddingAngle={4}
                            label={false}
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: isDark ? '#1F2937' : '#FFFFFF', color: isDark ? '#F9FAFB' : '#111827' }}
                            formatter={(value) => formatCurrency(value)}
                        />
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            layout="horizontal"
                            wrapperStyle={{ color: isDark ? '#F9FAFB' : '#111827', fontSize: '12px', paddingTop: '5px' }}
                            iconType="circle"
                            formatter={(value) => <span style={{ color: isDark ? '#F9FAFB' : '#111827' }}>{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default Charts;