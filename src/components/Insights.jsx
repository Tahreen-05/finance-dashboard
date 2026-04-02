import React from 'react';
import { useApp } from '../context/AppContext';
import { getInsights } from '../utils/transactionUtils';
const Insights = ({ compact = false }) => {
    const { state } = useApp();
    const insights = getInsights(state.transactions);
    const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
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
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {insights.highestCategory && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Highest Spending Category</p>
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{insights.highestCategory.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{formatCurrency(insights.highestCategory.amount)}</p>
                    </div>
                )}
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Expense Comparison</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">{insights.monthlyExpenses.change > 0 ? '+' : ''}{insights.monthlyExpenses.change}%</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                        This month: {formatCurrency(insights.monthlyExpenses.current)} vs last month: {formatCurrency(insights.monthlyExpenses.previous)}
                    </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Savings Rate</p>
                    {insights.totalIncome > 0 ? (
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{((insights.totalIncome - insights.totalExpenses) / insights.totalIncome * 100).toFixed(1)}%</p>
                    ) : (
                        <p className="text-xl font-bold text-gray-800 dark:text-white">N/A</p>
                    )}
                    <p className="text-xs text-gray-600 dark:text-gray-300">Income - Expenses ratio</p>
                </div>
            </div>
        </div>
    );
};
export default Insights;