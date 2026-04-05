import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getSummary } from '../utils/transactionUtils';
import { formatCurrency } from '../utils/transactionUtils'; // ✅ shared formatter
import { FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const SummaryCards = () => {
    const { state } = useApp();

    // Memoize summary to avoid recalculating on every render
    const { income, expense, balance } = useMemo(() => getSummary(state.transactions), [state.transactions]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Total Balance</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(balance)}</p>
                    </div>
                    <FaWallet className="text-blue-500 text-3xl" />
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Income</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(income)}</p>
                    </div>
                    <FaArrowUp className="text-green-500 text-3xl" />
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Expenses</p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatCurrency(expense)}</p>
                    </div>
                    <FaArrowDown className="text-red-500 text-3xl" />
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;