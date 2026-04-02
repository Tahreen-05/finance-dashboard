import React, { useState } from 'react';
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

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const renderContent = () => {
        switch (activeTab) {

            case 'transactions':
                return (
                    <>
                        <div className="mb-4">
                            <AddTransactionForm />
                        </div>
                        <TransactionFilters />
                        <TransactionsTable />
                    </>
                );
            case 'overview':
                return (
                    <>
                        <SummaryCards />
                        <Charts />


                        <RecentActivities setActiveTab={setActiveTab} />
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
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="md:ml-64 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-end items-center gap-4 mb-8">
                        <DarkModeToggle />
                        <RoleSwitcher />
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;