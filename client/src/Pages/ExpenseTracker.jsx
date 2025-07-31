import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseDetails from '../components/ExpenseDetails';
import ExpenseForm from '../components/ExpenseForm';
import { useAxiosWithAuth } from '../Authorisation/axiosConfig';
import { useAuth } from '@clerk/clerk-react';

function ExpenseTracker() {
    const [expenses, setExpenses] = useState([]);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [transactionType, setTransactionType] = useState('expense'); // 'expense' or 'income'
    
    const { isSignedIn, isLoaded, getToken } = useAuth();
    const axiosWithAuth = useAxiosWithAuth();

    // Calculate income and expense amounts
    useEffect(() => {
        const amounts = expenses.map(item => item.amount);
        const income = amounts.filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0);
        const exp = amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1;
        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses]);

    // Test authentication with detailed logging
    const testAuth = async () => {
        try {
            console.log('Testing authentication...');
            console.log('isSignedIn:', isSignedIn);
            console.log('isLoaded:', isLoaded);
            
            const token = await getToken();
            console.log('Clerk token:', token ? token.substring(0, 50) + '...' : 'No token');
            
            const response = await axiosWithAuth.get('/api/test-auth');
            console.log('Auth test successful:', response.data);
            return true;
        } catch (err) {
            console.error('Auth test failed:', err.response?.data || err.message);
            console.error('Full error:', err);
            return false;
        }
    };

    // Fetch transactions from backend
    const fetchTransactions = async () => {
        if (!isSignedIn || !isLoaded) {
            console.log('Not signed in or not loaded yet');
            setLoading(false);
            return;
        }

        console.log('Fetching transactions...');
        setLoading(true);
        setError(null);
        
        // Test authentication first
        const authTest = await testAuth();
        if (!authTest) {
            setError('Authentication failed. Please try signing in again.');
            setLoading(false);
            return;
        }

        try {
            const response = await axiosWithAuth.get('/api/transactions');
            setExpenses(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error('Fetch error:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Could not load transactions';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Fetch statistics
    const fetchStats = async () => {
        if (!isSignedIn || !isLoaded) {
            return;
        }

        try {
            const response = await axiosWithAuth.get('/api/transactions/stats');
            setStats(response.data);
        } catch (err) {
            console.warn('Failed to fetch stats:', err);
        }
    };

    // Initial data fetch
    useEffect(() => {
        console.log('useEffect triggered - isLoaded:', isLoaded, 'isSignedIn:', isSignedIn);
        if (isLoaded && isSignedIn) {
            fetchTransactions();
            fetchStats();
        }
    }, [isLoaded, isSignedIn]);

    // Delete transaction from backend
    const deleteExpense = async (id) => {
        if (!id) {
            toast.error('Invalid transaction ID');
            return;
        }

        try {
            const response = await axiosWithAuth.delete(`/api/transactions/${id}`);
            // Update local state
            setExpenses(prev => prev.filter(expense => expense._id !== id));
            toast.success(response.data?.message || 'Transaction deleted successfully');
            // Refresh stats
            fetchStats();
        } catch (err) {
            console.error('Delete error:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Could not delete transaction';
            toast.error(errorMessage);
        }
    };

    // Add transaction to backend
    const addTransaction = async (data) => {
        try {
            const amount = transactionType === 'income' ? Math.abs(parseFloat(data.amount)) : -Math.abs(parseFloat(data.amount));
            const transactionData = {
                text: data.text.trim(),
                amount: amount
            };

            // Client-side validation
            if (!transactionData.text) {
                toast.error('Please enter a transaction description');
                return;
            }

            if (isNaN(amount) || amount === 0) {
                toast.error('Please enter a valid non-zero amount');
                return;
            }

            const response = await axiosWithAuth.post('/api/transactions', transactionData);
            // Update local state
            setExpenses(prev => [response.data, ...prev]);
            toast.success(`${transactionType === 'income' ? 'Income' : 'Expense'} added successfully`);
            // Refresh stats
            fetchStats();
            setShowAddModal(false);
        } catch (err) {
            console.error('Add error:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Could not add transaction';
            toast.error(errorMessage);
        }
    };

    // Retry function for error state
    const handleRetry = () => {
        fetchTransactions();
        fetchStats();
    };

    // Show loading if Clerk is still loading
    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                        <p className="mt-4 text-lg text-gray-600">Loading authentication...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Show login prompt if not signed in
    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="text-center py-12">
                        <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 max-w-md mx-auto shadow-xl">
                            <div className="text-green-600 text-4xl mb-4">🔐</div>
                            <h3 className="text-gray-800 font-bold text-xl mb-2">Authentication Required</h3>
                            <p className="text-gray-600 mb-6">Please sign in to access your expense tracker.</p>
                            <button 
                                onClick={() => window.location.href = '/login'}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200 transform hover:scale-105 shadow-lg"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                        <span className="text-2xl">💰</span>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                        Smart Expense Tracker
                    </h1>
                    <p className="text-gray-600 text-lg">Take control of your finances with style</p>
                    {stats && (
                        <div className="mt-4 text-sm text-gray-500">
                            Last updated: {new Date().toLocaleTimeString()}
                        </div>
                    )}
                </div>

                {/* Quick Action Buttons */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => {
                            setTransactionType('income');
                            setShowAddModal(true);
                        }}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                        <span className="text-xl">➕</span>
                        Add Income
                    </button>
                    <button
                        onClick={() => {
                            setTransactionType('expense');
                            setShowAddModal(true);
                        }}
                        className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                        <span className="text-xl">➖</span>
                        Add Expense
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                        <p className="mt-4 text-lg text-gray-600">Loading your transactions...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-12">
                        <div className="bg-white/80 backdrop-blur-sm border border-red-200 rounded-2xl p-8 max-w-md mx-auto shadow-xl">
                            <div className="text-red-600 text-4xl mb-4">⚠️</div>
                            <h3 className="text-red-800 font-bold text-xl mb-2">Something went wrong</h3>
                            <p className="text-red-600 mb-6">{error}</p>
                            <button 
                                onClick={handleRetry}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200 transform hover:scale-105 shadow-lg"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                {!loading && !error && (
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-8">
                            <ExpenseDetails
                                incomeAmt={incomeAmt}
                                expenseAmt={expenseAmt}
                                stats={stats}
                            />
                            
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-100">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    💡 Quick Tips
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                                        <h3 className="font-semibold text-green-800 mb-2">📈 Track Income</h3>
                                        <p className="text-green-600 text-sm">Record all your income sources to understand your earning patterns</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4">
                                        <h3 className="font-semibold text-green-800 mb-2">📊 Monitor Expenses</h3>
                                        <p className="text-green-600 text-sm">Keep track of all expenses to identify spending habits</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                                        <h3 className="font-semibold text-green-800 mb-2">🎯 Set Goals</h3>
                                        <p className="text-green-600 text-sm">Use the balance to set and achieve financial goals</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-4">
                                        <h3 className="font-semibold text-green-800 mb-2">📅 Regular Updates</h3>
                                        <p className="text-green-600 text-sm">Update your transactions regularly for accurate insights</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <ExpenseTable
                                expenses={expenses}
                                deleteExpense={deleteExpense}
                                loading={loading}
                            />
                        </div>
                    </div>
                )}

                {/* Add Transaction Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Add {transactionType === 'income' ? 'Income' : 'Expense'}
                                </h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            
                            <ExpenseForm
                                addTransaction={addTransaction}
                                transactionType={transactionType}
                            />
                        </div>
                    </div>
                )}

                {/* Connection Status */}
                <div className="fixed bottom-4 right-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-medium shadow-lg ${
                        error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                        {error ? 'Offline' : 'Connected'}
                    </div>
                </div>
            </div>
            
            {/* Toast Container with custom styling */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                toastClassName="rounded-lg"
            />
        </div>
    );
}

export default ExpenseTracker;