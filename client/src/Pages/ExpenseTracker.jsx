import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseDetails from '../components/ExpenseDetails';
import ExpenseForm from '../components/ExpenseForm';
import AuthContext from '../Authorisation/AuthProvider'; // Import AuthContext

// API Base URL - Update this according to your backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

function ExpenseTracker() {
    const { token, isAuthenticated } = useContext(AuthContext); // Get token and isAuthenticated from AuthContext
    const [expenses, setExpenses] = useState([]);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState(null);

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

    // Helper to get headers with authorization
    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });

    // Fetch transactions from backend
    const fetchTransactions = async () => {
        if (!token || !isAuthenticated) {
            setError('Authentication required. Please log in.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/transactions`, {
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch transactions');
            }

            const data = await response.json();
            setExpenses(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message || 'Could not load transactions');
            toast.error(err.message || 'Failed to load transactions');
        } finally {
            setLoading(false);
        }
    };

    // Fetch statistics
    const fetchStats = async () => {
        if (!token || !isAuthenticated) {
            return; // Don't try to fetch stats if not authenticated
        }
        try {
            const response = await fetch(`${API_BASE_URL}/transactions/stats`, {
                headers: getAuthHeaders(),
            });
            if (response.ok) {
                const statsData = await response.json();
                setStats(statsData);
            } else {
                console.warn('Failed to fetch stats:', response.statusText);
            }
        } catch (err) {
            console.warn('Failed to fetch stats:', err);
        }
    };

    // Initial data fetch - dependency on token and isAuthenticated
    useEffect(() => {
        if (isAuthenticated) { // Only fetch if authenticated
            fetchTransactions();
            fetchStats();
        } else if (isAuthenticated === false) {
             // If isAuthenticated is explicitly false, it means token verification failed
             setError('You are not logged in. Please log in to view transactions.');
             setLoading(false);
        }
    }, [token, isAuthenticated]); // Re-run when token or auth status changes

    // Delete transaction from backend
    const deleteExpense = async (id) => {
        if (!id) {
            toast.error('Invalid transaction ID');
            return;
        }
        if (!token || !isAuthenticated) {
            toast.error('Authentication required to delete transaction.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete transaction');
            }

            const result = await response.json();

            // Update local state
            setExpenses(prev => prev.filter(expense => expense._id !== id));
            toast.success(result.message || 'Transaction deleted successfully');

            // Refresh stats
            fetchStats();
        } catch (err) {
            console.error('Delete error:', err);
            toast.error(err.message || 'Could not delete transaction');
        }
    };

    // Add transaction to backend
    const addTransaction = async (data) => {
        if (!token || !isAuthenticated) {
            toast.error('Authentication required to add transaction.');
            return;
        }

        try {
            const transactionData = {
                text: data.text.trim(),
                amount: parseFloat(data.amount)
            };

            // Client-side validation (already present, but good to re-iterate)
            if (!transactionData.text) {
                toast.error('Please enter a transaction description');
                return;
            }

            if (isNaN(transactionData.amount) || transactionData.amount === 0) {
                toast.error('Please enter a valid non-zero amount');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/transactions`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(transactionData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add transaction');
            }

            const newTransaction = await response.json();

            // Update local state
            setExpenses(prev => [newTransaction, ...prev]);
            toast.success('Transaction added successfully');

            // Refresh stats
            fetchStats();
        } catch (err) {
            console.error('Add error:', err);
            toast.error(err.message || 'Could not add transaction');
        }
    };

    // Retry function for error state
    const handleRetry = () => {
        // Clear error and re-attempt fetch
        setError(null);
        setLoading(true);
        fetchTransactions();
        fetchStats();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        💰 Expense Tracker
                    </h1>
                    <p className="text-gray-600">Take control of your finances</p>
                    {stats && (
                        <div className="mt-4 text-sm text-gray-500">
                            Last updated: {new Date().toLocaleTimeString()}
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                        <p className="mt-4 text-lg text-gray-600">Loading transactions...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-12">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
                            <div className="text-red-600 text-xl mb-2">⚠️</div>
                            <h3 className="text-red-800 font-semibold mb-2">Something went wrong</h3>
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={handleRetry}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                {!loading && !error && (
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            <ExpenseDetails
                                incomeAmt={incomeAmt}
                                expenseAmt={expenseAmt}
                                stats={stats}
                            />

                            <ExpenseForm
                                addTransaction={addTransaction}
                            />
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

                {/* Connection Status */}
                <div className="fixed bottom-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                        {error ? 'Offline' : 'Connected'}
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
        </div>
    );
}

export default ExpenseTracker;