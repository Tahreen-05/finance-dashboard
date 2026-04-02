import React from 'react';
import { useApp } from '../context/AppContext';
import { FaSearch, FaFilter } from 'react-icons/fa';

const TransactionFilters = () => {
    const { state, dispatch } = useApp();
    const { filters } = state;

    const handleFilterChange = (key, value) => {
        dispatch({ type: 'SET_FILTERS', payload: { [key]: value } });
    };

    const categories = [...new Set(state.transactions.map(t => t.category))];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
                <FaFilter className="text-gray-400 dark:text-gray-500" />
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Filter Transactions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Type</label>
                    <select
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="all">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Category</label>
                    <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="all">All</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Search</label>
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                        <input
                            type="text"
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            placeholder="Description or category"
                            className="w-full pl-8 border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Sort By</label>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-sm bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="date-desc">Date (newest first)</option>
                        <option value="date-asc">Date (oldest first)</option>
                        <option value="amount-desc">Amount (highest first)</option>
                        <option value="amount-asc">Amount (lowest first)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TransactionFilters;