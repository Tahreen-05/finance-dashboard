import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { FaBolt, FaChevronDown, FaEye } from 'react-icons/fa';
const RoleSwitcher = () => {
    const { state, dispatch } = useApp();
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleRoleChange = (role) => {
        dispatch({ type: 'SET_ROLE', payload: role });
        setOpen(false);
    };
    const selectedRole = state.role === 'admin' ? 'Admin' : 'Viewer';
    return (
        <div ref={menuRef} className="relative inline-flex">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="inline-flex min-w-[118px] items-center justify-between gap-3 rounded-xl border border-amber-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:border-amber-300 hover:bg-white"
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <span className="inline-flex items-center gap-2">
                    {state.role === 'admin' ? (
                        <FaBolt className="text-orange-400" />
                    ) : (
                        <FaEye className="text-slate-500" />
                    )}
                    <span>{selectedRole}</span>
                </span>
                <FaChevronDown className="text-slate-500" />
            </button>
            {open && (
                <div className="absolute top-full left-0 right-0 z-20 mt-1 w-full origin-top animate-in fade-in zoom-in-95 rounded-2xl border border-slate-200 bg-white  dark:bg-gray-800 shadow-xl">
                    <button
                        type="button"
                        onClick={() => handleRoleChange('viewer')}
                        className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${state.role === 'viewer'
                            ? 'bg-slate-700 text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <FaEye className={state.role === 'viewer' ? 'text-white' : 'text-slate-500'} />
                        Viewer
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleChange('admin')}
                        className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${state.role === 'admin'
                            ? 'bg-slate-700 text-white dark:bg-slate-700'
                            : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                    >
                        <FaBolt className={state.role === 'admin' ? 'text-orange-300' : 'text-orange-400'} />
                        Admin
                    </button>
                </div>
            )}
        </div>
    );
};
export default RoleSwitcher;
