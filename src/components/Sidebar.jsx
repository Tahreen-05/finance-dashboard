import React from 'react';
import { FaTachometerAlt, FaListAlt, FaChartLine } from 'react-icons/fa';
import { RxLayers } from "react-icons/rx";

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: <FaTachometerAlt /> },
        { id: 'transactions', label: 'Transactions', icon: <FaListAlt /> },
        { id: 'insights', label: 'Insights', icon: <FaChartLine /> },
    ];

    const toggleSidebar = () => setIsOpen((prev) => !prev);

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
                    <RxLayers className="text-orange-500 text-xl" />
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">FinView</h2>
                </div>
                <nav className="mt-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${activeTab === item.id
                                    ? 'bg-orange-500/20 backdrop-blur-sm text-orange-600 dark:text-orange-400'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
