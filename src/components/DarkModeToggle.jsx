import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
const DarkModeToggle = () => {
    const { darkMode, toggleDarkMode } = useTheme()
    return (
        <button
            onClick={toggleDarkMode}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50"
            aria-label="Toggle dark mode"
        >
            {darkMode ? <FaSun className="text-amber-500" /> : <FaMoon className="text-slate-500" />}
        </button>
    );
};
export default DarkModeToggle;
