const Transaction = require('../models/Transaction');

// Get all transactions
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        console.log(`Fetched ${transactions.length} transactions`);
        res.json(transactions);
    } catch (err) {
        console.error('Error fetching transactions:', err.message);
        res.status(500).json({ 
            error: 'Server error', 
            message: 'Failed to fetch transactions',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// Add a new transaction
exports.addTransaction = async (req, res) => {
    try {
        const { text, amount } = req.body;
        
        // Validation
        if (!text || text.trim() === '') {
            return res.status(400).json({ 
                error: 'Validation error',
                message: 'Transaction description is required' 
            });
        }
        
        const parsedAmount = Number(amount);
        if (isNaN(parsedAmount) || parsedAmount === 0) {
            return res.status(400).json({ 
                error: 'Validation error',
                message: 'Amount must be a valid non-zero number' 
            });
        }

        // Create new transaction
        const transaction = new Transaction({ 
            text: text.trim(), 
            amount: parsedAmount 
        });
        
        const savedTransaction = await transaction.save();
        console.log('Transaction created:', savedTransaction._id);
        
        res.status(201).json(savedTransaction);
    } catch (err) {
        console.error('Error adding transaction:', err.message);
        
        // Handle validation errors
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Validation error',
                message: Object.values(err.errors).map(e => e.message).join(', ')
            });
        }
        
        res.status(500).json({ 
            error: 'Server error', 
            message: 'Failed to add transaction',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ 
                error: 'Invalid ID format',
                message: 'Transaction ID is not valid'
            });
        }
        
        const transaction = await Transaction.findByIdAndDelete(id);
        
        if (!transaction) {
            return res.status(404).json({ 
                error: 'Not found',
                message: 'Transaction not found' 
            });
        }
        
        console.log('Transaction deleted:', id);
        res.json({ 
            message: 'Transaction deleted successfully', 
            id,
            deletedTransaction: transaction
        });
    } catch (err) {
        console.error('Error deleting transaction:', err.message);
        res.status(500).json({ 
            error: 'Server error',
            message: 'Failed to delete transaction',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// Get transaction statistics
exports.getTransactionStats = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        
        const stats = {
            totalTransactions: transactions.length,
            totalIncome: 0,
            totalExpense: 0,
            balance: 0
        };
        
        transactions.forEach(transaction => {
            if (transaction.amount > 0) {
                stats.totalIncome += transaction.amount;
            } else {
                stats.totalExpense += Math.abs(transaction.amount);
            }
        });
        
        stats.balance = stats.totalIncome - stats.totalExpense;
        
        res.json(stats);
    } catch (err) {
        console.error('Error getting stats:', err.message);
        res.status(500).json({ 
            error: 'Server error',
            message: 'Failed to get statistics',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};