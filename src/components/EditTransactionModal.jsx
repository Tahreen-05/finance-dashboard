import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
const EditTransactionModal = ({ transaction, isOpen, onClose }) => {
    const { dispatch } = useApp();
    const { darkMode } = useTheme();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        category: '',
        type: '',
        date: '',
    });
    useEffect(() => {
        if (transaction) {
            setFormData({
                description: transaction.description,
                amount: transaction.amount,
                category: transaction.category,
                type: transaction.type,
                date: transaction.date,
            });
        }
    }, [transaction]);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTransaction = {
            ...transaction,
            ...formData,
            amount: parseFloat(formData.amount),
        };
        dispatch({ type: 'EDIT_TRANSACTION', payload: updatedTransaction });
        onClose();
    }; if (!isOpen) return null;
    const categories = ['Food & Dining', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Salary', 'Freelance', 'Investment', 'Rent'];
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Edit Transaction</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required step="0.01" className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white">
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white">
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            style={{ colorScheme: darkMode ? 'dark' : 'light' }}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EditTransactionModal;
