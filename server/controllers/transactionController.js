const Transaction = require('../models/Transaction');

// Get all transactions for the authenticated user
exports.getTransactions = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;
        
        if (!userId) {
            return res.status(401).json({ 
                error: 'Authentication required',
                message: 'User not authenticated' 
            });
        }

        console.log('Getting transactions for user:', userId);

        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
        console.log(`Fetched ${transactions.length} transactions for user ${userId}`);
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

// Add a new transaction for the authenticated user
exports.addTransaction = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;
        
        if (!userId) {
            return res.status(401).json({ 
                error: 'Authentication required',
                message: 'User not authenticated' 
            });
        }

        console.log('Adding transaction for user:', userId);

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

        // Create new transaction with userId
        const transaction = new Transaction({ 
            userId,
            text: text.trim(), 
            amount: parsedAmount 
        });
        
        const savedTransaction = await transaction.save();
        console.log('Transaction created:', savedTransaction._id, 'for user:', userId);
        
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

// Delete a transaction (only if it belongs to the authenticated user)
exports.deleteTransaction = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;
        
        if (!userId) {
            return res.status(401).json({ 
                error: 'Authentication required',
                message: 'User not authenticated' 
            });
        }

        console.log('Deleting transaction for user:', userId);

        const { id } = req.params;
        
        // Validate ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ 
                error: 'Invalid ID format',
                message: 'Transaction ID is not valid'
            });
        }
        
        // Find and delete transaction, ensuring it belongs to the user
        const transaction = await Transaction.findOneAndDelete({ 
            _id: id, 
            userId 
        });
        
        if (!transaction) {
            return res.status(404).json({ 
                error: 'Not found',
                message: 'Transaction not found or you do not have permission to delete it' 
            });
        }
        
        console.log('Transaction deleted:', id, 'for user:', userId);
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

// Get transaction statistics for the authenticated user
exports.getTransactionStats = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;
        
        if (!userId) {
            return res.status(401).json({ 
                error: 'Authentication required',
                message: 'User not authenticated' 
            });
        }

        console.log('Getting stats for user:', userId);

        const transactions = await Transaction.find({ userId });
        
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
        
        console.log(`Stats calculated for user ${userId}:`, stats);
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