// this component i used is to show insights about the transactions, such as total spending, average monthly spending, largest expense, etc. It uses the getInsights function to calculate these insights from the transactions in the state. 
// It also formats the currency amounts and displays them in a nice layout with icons and colors. The compact prop can be used to show a simplified version of the insights for smaller screens or summary views.
import { useApp } from '../context/AppContext';
import { getInsights } from '../utils/transactionUtils';
import { FaChartLine, FaChartPie, FaArrowUp, FaArrowDown, FaTrophy, FaWallet } from 'react-icons/fa';

const Insights = ({ compact = false }) => {
    const { state } = useApp();
    const insights = getInsights(state.transactions);
    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null || isNaN(amount)) return '$0.00';
        const sign = amount < 0 ? '-' : '';
        const absAmount = Math.abs(amount);
        const dollars = Math.floor(absAmount);
        const cents = Math.round((absAmount - dollars) * 100);
        const formattedDollars = dollars.toLocaleString();
        const formattedCents = cents.toString().padStart(2, '0');
        return `${sign}$${formattedDollars}.${formattedCents}`;
    };
    const transactions = state.transactions;
    const totalSpending = insights.totalExpenses;
    const avgMonthlySpending = totalSpending / 3;
    const currentMonthSpending = insights.monthlyExpenses.current;
    const largestExpense = [...transactions]
        .filter(t => t.type === 'expense')
        .sort((a, b) => b.amount - a.amount)[0];
    const largestIncome = [...transactions]
        .filter(t => t.type === 'income')
        .sort((a, b) => b.amount - a.amount)[0];
    const categoryTotals = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
    const topCategories = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, amount]) => ({ name, amount, percent: (amount / totalSpending) * 100 }));
    if (compact) {
        return (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {insights.highestCategory && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Highest Category</p>
                            <p className="text-lg font-bold text-gray-800 dark:text-white">{insights.highestCategory.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{formatCurrency(insights.highestCategory.amount)}</p>
                        </div>
                    )}
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Change</p>
                        <p className="text-lg font-bold text-gray-800 dark:text-white">{insights.monthlyExpenses.change > 0 ? '+' : ''}{insights.monthlyExpenses.change}%</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Savings Rate</p>
                        <p className="text-lg font-bold text-gray-800 dark:text-white">
                            {insights.totalIncome > 0 ? ((insights.totalIncome - insights.totalExpenses) / insights.totalIncome * 100).toFixed(1) : 0}%
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FaChartLine className="text-indigo-500" /> Financial Insights
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Key metrics and spending patterns</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {insights.highestCategory && (
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Top Category</p>
                                <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{insights.highestCategory.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{formatCurrency(insights.highestCategory.amount)}</p>
                            </div>
                            <FaTrophy className="text-yellow-500 text-2xl" />
                        </div>
                        <div className="mt-3">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${(insights.highestCategory.amount / totalSpending) * 100}%` }} />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{((insights.highestCategory.amount / totalSpending) * 100).toFixed(0)}% of total spending</p>
                        </div>
                    </div>
                )}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Monthly Trend</p>
                            <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{insights.monthlyExpenses.change > 0 ? '+' : ''}{insights.monthlyExpenses.change}%</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">vs last month</p>
                        </div>
                        {insights.monthlyExpenses.change > 0 ? <FaArrowUp className="text-red-500 text-2xl" /> : <FaArrowDown className="text-green-500 text-2xl" />}
                    </div>
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                        This month: {formatCurrency(insights.monthlyExpenses.current)}<br />
                        Last month: {formatCurrency(insights.monthlyExpenses.previous)}
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Savings Rate</p>
                            <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{insights.totalIncome > 0 ? ((insights.totalIncome - insights.totalExpenses) / insights.totalIncome * 100).toFixed(1) : 0}%</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">of total earnings</p>   {/* changed "income" to "earnings" */}
                        </div>
                        <FaWallet className="text-emerald-500 text-2xl" />
                    </div>
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                        Earnings: {formatCurrency(insights.totalIncome)}<br />   {/* changed "Income:" to "Earnings:" */}
                        Expenses: {formatCurrency(insights.totalExpenses)}
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="flex items-center gap-2 mb-3">
                        <FaChartPie className="text-indigo-500" />
                        <h4 className="font-semibold text-gray-800 dark:text-white">Top Spending Categories</h4>
                    </div>
                    <div className="space-y-3">
                        {topCategories.map((cat) => (
                            <div key={cat.name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-700 dark:text-gray-300">{cat.name}</span>
                                    <span className="text-gray-800 dark:text-gray-200 font-medium">{formatCurrency(cat.amount)}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${cat.percent}%` }} />
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cat.percent.toFixed(0)}% of total spending</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {largestExpense && (
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Largest Expense</p>
                                <p className="text-base font-semibold text-gray-800 dark:text-white mt-1">{largestExpense.description}</p>
                                <p className="text-sm text-red-600 dark:text-red-400">{formatCurrency(largestExpense.amount)}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{largestExpense.category} · {largestExpense.date}</p>
                            </div>
                        )}
                        {largestIncome && (
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Largest Income</p>
                                <p className="text-base font-semibold text-gray-800 dark:text-white mt-1">{largestIncome.description}</p>
                                <p className="text-sm text-emerald-600 dark:text-emerald-400">{formatCurrency(largestIncome.amount)}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{largestIncome.category} · {largestIncome.date}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Insights;