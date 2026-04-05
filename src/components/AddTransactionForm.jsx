import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { CATEGORIES } from '../data/transactions';

const AddTransactionForm = () => {
    const { state, dispatch } = useApp();
    const { darkMode } = useTheme();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: '',
        type: 'expense',
        date: new Date().toISOString().slice(0, 10),
    });
    const [customCategory, setCustomCategory] = useState('');
    const [showForm, setShowForm] = useState(false);

    const categories = CATEGORIES;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'category' && value !== 'Other') {
            setCustomCategory('');
        }
    };

    const handleCustomCategoryChange = (e) => {
        setCustomCategory(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.description || !formData.amount) {
            return alert('Please fill all required fields');
        }
        let finalCategory = formData.category;
        if (formData.category === 'Other') {
            if (!customCategory.trim()) {
                return alert('Please enter a custom category name');
            }
            finalCategory = customCategory.trim();
        } else if (!formData.category) {
            return alert('Please select a category');
        }

        const newTransaction = {
            id: Date.now(),
            description: formData.description,
            amount: parseFloat(formData.amount),
            category: finalCategory,
            type: formData.type,
            date: formData.date,
        };
        dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
        setFormData({
            description: '',
            amount: '',
            category: '',
            type: 'expense',
            date: new Date().toISOString().slice(0, 10),
        });
        setCustomCategory('');
        setShowForm(false);
    };

    if (state.role !== 'admin') return null;

    return (
        <div className="mb-6">
            {!showForm ? (
                <button
                    id="add-transaction-btn"
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                    + Add Transaction
                </button>
            ) : (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Add New Transaction</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                step="0.01"
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                                <option value="Other">+ Other (custom)</option>
                            </select>
                        </div>
                        {formData.category === 'Other' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Custom Category Name</label>
                                <input
                                    type="text"
                                    value={customCategory}
                                    onChange={handleCustomCategoryChange}
                                    required
                                    placeholder="e.g., Subscriptions, Gifts"
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                style={{ colorScheme: darkMode ? 'dark' : 'light' }}
                                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="flex items-end space-x-2">
                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddTransactionForm;
