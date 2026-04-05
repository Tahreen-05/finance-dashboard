import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import SummaryCards from '../components/SummaryCards';
import Charts from '../components/Charts';
import TransactionFilters from '../components/TransactionFilters';
import TransactionsTable from '../components/TransactionsTable';
import AddTransactionForm from '../components/AddTransactionForm';
import Insights from '../components/Insights';
import RoleSwitcher from '../components/RoleSwitcher';
import DarkModeToggle from '../components/DarkModeToggle';
import Sidebar from '../components/Sidebar';
import RecentActivities from '../components/RecentActivities';
import ExportButton from '../components/ExportButton';
import { FaBars, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { state } = useApp(); // to access role

    // Auto-scroll to top on tab change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeTab]);

    // Scroll to top on initial load
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    const tabNames = {
        overview: 'Overview',
        transactions: 'Transactions',
        insights: 'Insights',
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <>
                        <SummaryCards />
                        <Charts />
                        <RecentActivities setActiveTab={setActiveTab} />
                    </>
                );
            case 'transactions':
                return (
                    <>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            {state.role === 'admin' && <AddTransactionForm />}
                            <div className="ml-auto">
                                <ExportButton />
                            </div>
                        </div>
                        <TransactionFilters />
                        <TransactionsTable />
                    </>
                );
            case 'insights':
                return <Insights />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />
            <div className="md:ml-64 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="rounded-2xl bg-white dark:bg-[#161d2b] px-4 py-3 mb-8 shadow-sm border border-gray-200 dark:border-white/5 mt-12 md:mt-0">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setIsSidebarOpen((prev) => !prev)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-white transition hover:bg-gray-300 dark:hover:bg-white/15 md:hidden"
                                aria-label={isSidebarOpen ? 'Close navigation' : 'Open navigation'}
                            >
                                {isSidebarOpen ? <FaTimes /> : <FaBars />}
                            </button>
                            <div className="min-w-0 flex-1">
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white leading-tight">
                                    {tabNames[activeTab]}
                                </h1>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                <DarkModeToggle />
                                <RoleSwitcher />
                            </div>
                        </div>
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;