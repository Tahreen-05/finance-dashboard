import React, { useState } from 'react';
import { FaBars, FaTimes, FaTachometerAlt, FaListAlt, FaChartLine } from 'react-icons/fa';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: <FaTachometerAlt /> },
        { id: 'transactions', label: 'Transactions', icon: <FaListAlt /> },
        { id: 'insights', label: 'Insights', icon: <FaChartLine /> },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Hamburger button (mobile) */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white md:hidden"
            >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
                </div>
                <nav className="mt-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsOpen(false); // close sidebar on mobile after selection
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${activeTab === item.id
                                    ? 'bg-blue-500 text-white'
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