// this is the main context for the app, it will hold the global state and actions for transactions, filters, and user role
import React, { createContext, useReducer, useContext } from 'react';
import { mockTransactions } from '../data/transactions';
const initialState = {
    transactions: mockTransactions,
    role: 'viewer',
    filters: {
        type: 'all', category: 'all', search: '', sortBy: 'date-desc',
    },
};
const appReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions],
            };
        case 'EDIT_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.map(t => t.id === action.payload.id ? action.payload : t),
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(t => t.id !== action.payload),
            };
        case 'SET_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, ...action.payload },
            };
        case 'SET_ROLE':
            return {
                ...state,
                role: action.payload,
            };
        default:
            return state;
    }
};
const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>);
};
export const useApp = () => useContext(AppContext);