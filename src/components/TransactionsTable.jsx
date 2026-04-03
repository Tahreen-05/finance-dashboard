import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { filterTransactions } from '../utils/transactionUtils';
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaSort } from 'react-icons/fa';
import { CATEGORY_COLORS } from '../data/transactions';
import EditTransactionModal from './EditTransactionModal';
const TransactionsTable = () => {
    const { state, dispatch } = useApp();
    const { filters } = state;
    const filteredTransactions = filterTransactions(state.transactions, filters);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            dispatch({ type: 'DELETE_TRANSACTION', payload: id });
        }
    };
    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };
    const handleSort = (field) => {
        const currentSort = filters.sortBy;
        let newSort = '';
        if (currentSort === `${field}-asc`) newSort = `${field}-desc`;
        else if (currentSort === `${field}-desc`) newSort = `${field}-asc`;
        else newSort = `${field}-asc`;
        dispatch({ type: 'SET_FILTERS', payload: { sortBy: newSort } });
    };
    const getSortIcon = (field) => {
        const current = filters.sortBy;
        if (current === `${field}-asc`) return <FaArrowUp className="inline ml-1 text-xs" />;
        if (current === `${field}-desc`) return <FaArrowDown className="inline ml-1 text-xs" />;
        return <FaSort className="inline ml-1 text-gray-400" />;
    };
    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th onClick={() => handleSort('date')} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition">
                                    Date {getSortIcon('date')}
                                </th>
                                <th onClick={() => handleSort('description')} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition">
                                    Description {getSortIcon('description')}
                                </th>
                                <th onClick={() => handleSort('category')} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition">
                                    Category {getSortIcon('category')}
                                </th>
                                <th onClick={() => handleSort('amount')} className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition">
                                    Amount {getSortIcon('amount')}
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                {state.role === 'admin' && <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={state.role === 'admin' ? 6 : 5} className="px-6 py-12 text-center text-sm text-gray-400 dark:text-gray-500">
                                        ✨ No transactions found. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{transaction.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{transaction.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <span className="inline-flex items-center gap-1.5">
                                                <span
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: CATEGORY_COLORS[transaction.category] || '#6b7280' }}
                                                />
                                                <span style={{ color: CATEGORY_COLORS[transaction.category] || '#6b7280' }}>
                                                    {transaction.category}
                                                </span>
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                            {formatCurrency(transaction.amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'income'
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                                                : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
                                                }`}>
                                                {transaction.type === 'income' ? '💰 Income' : '💸 Expense'}
                                            </span>
                                        </td>
                                        {state.role === 'admin' && (
                                            <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                                <button onClick={() => handleEdit(transaction)} className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition" title="Edit">
                                                    <FaEdit className="inline" />
                                                </button>
                                                <button onClick={() => handleDelete(transaction.id)} className="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition" title="Delete">
                                                    <FaTrash className="inline" />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <EditTransactionModal
                transaction={editingTransaction}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};
export default TransactionsTable;
