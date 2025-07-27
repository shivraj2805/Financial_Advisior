import React, { useState } from 'react'

function ExpenseForm({ addTransaction }) {
    const [expenseInfo, setExpenseInfo] = useState({
        amount: '',
        text: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseInfo(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const addExpense = async (e) => {
        e.preventDefault();
        
        const { amount, text } = expenseInfo;
        
        // Client-side validation
        if (!text.trim()) {
            alert('Please enter a transaction description');
            return;
        }

        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) === 0) {
            alert('Please enter a valid non-zero amount');
            return;
        }

        setIsSubmitting(true);
        
        try {
            await addTransaction(expenseInfo);
            // Clear form only on successful submission
            setExpenseInfo({ amount: '', text: '' });
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Add New Transaction
            </h2>
            
            <form onSubmit={addExpense} className="space-y-4">
                <div>
                    <label htmlFor='text' className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Description *
                    </label>
                    <input 
                        onChange={handleChange}
                        type='text' 
                        name='text' 
                        id='text'
                        placeholder='Enter description (e.g., Salary, Groceries, Rent)' 
                        value={expenseInfo.text}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        maxLength={200}
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {expenseInfo.text.length}/200 characters
                    </p>
                </div>

                <div>
                    <label htmlFor='amount' className="block text-sm font-medium text-gray-700 mb-2">
                        Amount (₹) *
                    </label>
                    <input 
                        onChange={handleChange}
                        type='number' 
                        name='amount' 
                        id='amount'
                        placeholder='Enter amount (+ for income, - for expense)' 
                        value={expenseInfo.amount}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        step="0.01"
                        required
                    />
                </div>

                <button 
                    type='submit'
                    disabled={isSubmitting || !expenseInfo.text.trim() || !expenseInfo.amount}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Adding...
                        </>
                    ) : (
                        'Add Transaction'
                    )}
                </button>
            </form>

            <div className="mt-6 space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                        💡 <strong>Tip:</strong> Use positive numbers for income and negative numbers for expenses
                    </p>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-700">
                        📝 <strong>Examples:</strong> +50000 (Salary), -1200 (Groceries), -25000 (Rent)
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ExpenseForm