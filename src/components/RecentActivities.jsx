import React from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatShortDate } from '../utils/transactionUtils';
import { CATEGORY_COLORS } from '../data/transactions';
import { useTheme } from '../context/ThemeContext';
const RecentActivities = ({ setActiveTab }) => {
    const { state } = useApp();
    const { transactions } = state;
    const recent = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);
    const { darkMode: isDark } = useTheme();
    return (
        <div className={`rounded-2xl p-5 ${isDark ? 'bg-[#161b22] border border-white/[0.06]' : 'bg-white border border-slate-200 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: "'Syne', sans-serif" }}>
                        Recent Activity
                    </h3>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Latest transactions</p>
                </div>
                <button
                    onClick={() => setActiveTab('transactions')}
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium transition"
                >
                    View all →
                </button>
            </div>
            {recent.length === 0 ? (
                <div className={`text-center py-8 text-sm ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                    No transactions yet.
                </div>
            ) : (
                <div className="space-y-1">
                    {recent.map((t) => (
                        <div
                            key={t.id}
                            className={`flex items-center gap-3 py-2 px-2 rounded-xl transition ${isDark ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-50'
                                }`}
                        >
                            <div
                                className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold"
                                style={{
                                    background: CATEGORY_COLORS[t.category] + '22',
                                    color: CATEGORY_COLORS[t.category] || '#6b7280',
                                }}
                            >
                                {t.category.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                    {t.description}
                                </p>
                                <p className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {t.category} · {formatShortDate(t.date)}
                                </p>
                            </div>
                            <span
                                className={`text-sm font-bold flex-shrink-0 ${t.type === 'income'
                                    ? 'text-emerald-400'
                                    : isDark ? 'text-rose-400' : 'text-rose-500'
                                    }`}
                            >
                                {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default RecentActivities;