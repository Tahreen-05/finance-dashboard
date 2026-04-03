import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { filterTransactions } from '../utils/transactionUtils';
import { FaFileCsv, FaFileCode, FaDownload } from 'react-icons/fa';

const ExportButton = () => {
    const { state } = useApp();
    const filteredData = filterTransactions(state.transactions, state.filters);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const exportToCSV = () => {
        if (!filteredData.length) {
            alert('No transactions to export.');
            return;
        }
        const headers = ['Date', 'Description', 'Category', 'Amount', 'Type'];
        const rows = filteredData.map(t => [
            t.date,
            t.description,
            t.category,
            t.amount,
            t.type,
        ]);
        const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `transactions_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsOpen(false);
    };

    const exportToJSON = () => {
        if (!filteredData.length) {
            alert('No transactions to export.');
            return;
        }
        const jsonContent = JSON.stringify(filteredData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `transactions_${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm transition-all duration-200 active:scale-95"
            >
                <FaDownload /> Export
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
                    <button
                        onClick={exportToCSV}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        <FaFileCsv className="text-emerald-500" /> CSV
                    </button>
                    <button
                        onClick={exportToJSON}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        <FaFileCode className="text-blue-500" /> JSON
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExportButton;