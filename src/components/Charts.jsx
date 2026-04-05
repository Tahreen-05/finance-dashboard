import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { getIncomeExpenseOverTime, getSpendingByCategory } from '../utils/transactionUtils';
import { CATEGORY_COLORS } from '../data/transactions';

const Charts = () => {
    const { state } = useApp();
    const { darkMode: isDark } = useTheme();

    // Memoize data transformations
    const lineData = useMemo(() => getIncomeExpenseOverTime(state.transactions), [state.transactions]);
    const categoryData = useMemo(() => getSpendingByCategory(state.transactions), [state.transactions]);

    // Custom currency formatter for Rupees (without Intl.NumberFormat options)
    const formatRupee = (value) => {
        if (value === undefined || value === null) return '₹0';
        const abs = Math.abs(value);
        const rupees = Math.floor(abs);
        const paise = Math.round((abs - rupees) * 100);
        const formatted = `${rupees.toLocaleString('en-IN')}.${paise.toString().padStart(2, '0')}`;
        return `${value < 0 ? '-' : ''}₹${formatted}`;
    };

    // Short format for Y-axis (e.g., ₹1.2L, ₹85K)
    const formatYAxis = (value) => {
        if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
        if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
        return `₹${value}`;
    };

    const gridColor = isDark ? 'rgba(75, 85, 99, 0.25)' : 'rgba(156, 163, 175, 0.2)';

    // Memoize max value and domain
    const maxValue = useMemo(() => Math.max(0, ...lineData.flatMap(d => [d.income, d.expenses])), [lineData]);
    const yDomain = useMemo(() => [0, maxValue === 0 ? 100000 : maxValue * 1.1], [maxValue]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Area Chart */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Income vs Expenses (Monthly)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                        <XAxis dataKey="label" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                        <YAxis
                            stroke="#9CA3AF"
                            tickFormatter={formatYAxis}
                            domain={yDomain}
                            width={60}
                            tick={{ fontSize: 11 }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: isDark ? '#1F2937' : '#FFFFFF', color: isDark ? '#F9FAFB' : '#111827' }}
                            formatter={(value) => formatRupee(value)}
                        />
                        <Legend wrapperStyle={{ color: isDark ? '#F9FAFB' : '#111827' }} />
                        <Area type="monotone" dataKey="income" name="Income" stroke="#22c55e" strokeWidth={2} fill="url(#gradientIncome)" dot={{ r: 3 }} activeDot={{ r: 5 }} />
                        <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={2} fill="url(#gradientExpense)" dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Doughnut Chart */}
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
                            cy="45%"
                            innerRadius={50}
                            outerRadius={90}
                            paddingAngle={4}
                            label={false}
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || '#6b7280'} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: isDark ? '#1F2937' : '#FFFFFF', color: isDark ? '#F9FAFB' : '#111827' }}
                            formatter={(value) => formatRupee(value)}
                        />
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            layout="horizontal"
                            wrapperStyle={{ color: isDark ? '#F9FAFB' : '#111827', fontSize: '12px', paddingTop: '5px' }}
                            iconType="circle"
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Charts;