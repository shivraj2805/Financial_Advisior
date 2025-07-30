import React from 'react'

function ExpenseTable({ expenses, deleteExpense, loading }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTransactionIcon = (amount) => {
        return amount > 0 ? '💰' : '💸';
    };

    const getTransactionColor = (amount) => {
        return amount > 0 ? 'text-green-600' : 'text-green-600';
    };

    const getTransactionBg = (amount) => {
        return amount > 0 ? 'bg-green-50 border-green-200' : 'bg-green-50 border-green-200';
    };

    if (loading) {
        return (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-100">
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading transactions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100">
            <div className="p-6 border-b border-green-100">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    Transaction History
                </h2>
                <p className="text-gray-600 mt-1">
                    {expenses.length} transaction{expenses.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div className="p-6">
                {expenses.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Transactions Yet</h3>
                        <p className="text-gray-500 mb-6">
                            Start by adding your first income or expense to see your financial overview
                        </p>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p>💡 Add income to track your earnings</p>
                            <p>💡 Add expenses to monitor spending</p>
                            <p>💡 View your balance and insights</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {expenses.map((expense) => (
                            <div
                                key={expense._id}
                                className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${getTransactionBg(expense.amount)}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            expense.amount > 0 ? 'bg-green-100' : 'bg-green-100'
                                        }`}>
                                            <span className="text-lg">
                                                {getTransactionIcon(expense.amount)}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 truncate">
                                                {expense.text}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(expense.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <span className={`font-bold text-lg ${getTransactionColor(expense.amount)}`}>
                                            {expense.amount > 0 ? '+' : ''}₹{Math.abs(expense.amount).toLocaleString()}
                                        </span>
                                        <button
                                            onClick={() => deleteExpense(expense._id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                                            title="Delete transaction"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Summary Footer */}
            {expenses.length > 0 && (
                <div className="p-6 bg-green-50 rounded-b-2xl border-t border-green-100">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-sm text-gray-600">Total Income</p>
                            <p className="text-lg font-bold text-green-600">
                                ₹{expenses.filter(e => e.amount > 0).reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Expenses</p>
                            <p className="text-lg font-bold text-green-600">
                                ₹{Math.abs(expenses.filter(e => e.amount < 0).reduce((sum, e) => sum + e.amount, 0)).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExpenseTable