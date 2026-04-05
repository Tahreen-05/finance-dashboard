import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { mockTransactions } from '../data/transactions';
const loadInitialState = () => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedRole = localStorage.getItem('role');
    return {
        transactions: savedTransactions ? JSON.parse(savedTransactions) : mockTransactions,
        role: savedRole || 'viewer',
        filters: {
            type: 'all',
            category: 'all',
            search: '',
            sortBy: 'date-desc',
        },
    };
};
const initialState = loadInitialState();
const appReducer = (state, action) => {
    //RBAC enforcement: block write actions for non-admin
    const writeActions = ['ADD_TRANSACTION', 'EDIT_TRANSACTION', 'DELETE_TRANSACTION'];
    if (writeActions.includes(action.type) && state.role !== 'admin') {
        return state;
    }
    switch (action.type) {
        case 'ADD_TRANSACTION':
            return { ...state, transactions: [action.payload, ...state.transactions] };
        case 'EDIT_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.map(t =>
                    t.id === action.payload.id ? action.payload : t
                ),
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(t => t.id !== action.payload),
            };
        case 'SET_FILTERS':
            return { ...state, filters: { ...state.filters, ...action.payload } };
        case 'SET_ROLE':
            return { ...state, role: action.payload };
        default:
            return state;
    }
};
const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    // Persist transactions and role to localStorage
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
    }, [state.transactions]);

    useEffect(() => {
        localStorage.setItem('role', state.role);
    }, [state.role]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);