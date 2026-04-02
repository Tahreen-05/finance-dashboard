import React from "react";
import { useApp } from "../context/AppContext";
const TransactionFilters = () => {
    const { state, dispatch } = useApp();
    const { filters } = state;
    const handleFilterChange = (key, value) => {
        dispatch({ type: 'SET_FILTERS', payload: { [key]: value } });
    };
    const categories = [...new Set(state.transactions.map(t => t.category))];
    return (
        <div className="bg-white  dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                    <select value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 dark:text-white">
                        <option value="all">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 dark:text-white">
                        <option value="all">All</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
                    <input type="text" value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} placeholder="Description or category" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
                    <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 dark:text-white">
                        <option value="date-desc">Date (Newest)</option>
                        <option value="date-asc">Date (Oldest)</option>
                        <option value="amount-desc">Amount (High to Low)</option>
                        <option value="amount-asc">Amount (Low to High)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
export default TransactionFilters;                                                                 
