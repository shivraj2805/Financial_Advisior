import React from 'react'

function ExpenseDetails({ incomeAmt, expenseAmt, stats }) {
    const balance = incomeAmt - expenseAmt;
    const isPositive = balance >= 0;

    return (
        <div className="space-y-6">
            {/* Main Balance Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Current Balance</h2>
                    <div className={`text-4xl font-bold ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                        ₹{Math.abs(balance).toLocaleString()}
                    </div>
                    <p className={`text-sm font-medium ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {isPositive ? '💰 You\'re in the green!' : '⚠️ You\'re in the red'}
                    </p>
                </div>

                {/* Income vs Expense Bars */}
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-green-600">Income</span>
                            <span className="text-sm font-bold text-green-600">₹{incomeAmt.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${incomeAmt > 0 ? Math.min((incomeAmt / (incomeAmt + expenseAmt)) * 100, 100) : 0}%` }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-green-600">Expenses</span>
                            <span className="text-sm font-bold text-green-600">₹{expenseAmt.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                                className="bg-gradient-to-r from-green-600 to-teal-600 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${expenseAmt > 0 ? Math.min((expenseAmt / (incomeAmt + expenseAmt)) * 100, 100) : 0}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-600">Total Income</p>
                                <p className="text-2xl font-bold text-green-700">₹{stats.totalIncome?.toLocaleString() || '0'}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-600">Total Expenses</p>
                                <p className="text-2xl font-bold text-green-700">₹{stats.totalExpense?.toLocaleString() || '0'}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-xl">💸</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-600">Transactions</p>
                                <p className="text-2xl font-bold text-green-700">{stats.totalTransactions || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-xl">📊</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Insights */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">💡 Quick Insights</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <div className="text-2xl mb-2">📈</div>
                        <p className="text-sm text-green-600">
                            {incomeAmt > 0 ? `Your income is ₹${incomeAmt.toLocaleString()}` : 'No income recorded yet'}
                        </p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                        <div className="text-2xl mb-2">📉</div>
                        <p className="text-sm text-green-600">
                            {expenseAmt > 0 ? `Your expenses are ₹${expenseAmt.toLocaleString()}` : 'No expenses recorded yet'}
                        </p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl">
                        <div className="text-2xl mb-2">🎯</div>
                        <p className="text-sm text-green-600">
                            {isPositive ? 'Great job! You\'re saving money' : 'Consider reducing expenses'}
                        </p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <div className="text-2xl mb-2">📅</div>
                        <p className="text-sm text-green-600">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpenseDetails