const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is required']
    },
    text: {
        type: String,
        required: [true, 'Transaction description is required'],
        trim: true,
        minlength: [1, 'Description must be at least 1 character'],
        maxlength: [200, 'Description cannot exceed 200 characters']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        validate: {
            validator: function(value) {
                return value !== 0;
            },
            message: 'Amount cannot be zero'
        }
    },
    category: {
        type: String,
        enum: ['income', 'expense', 'transfer'],
        default: function() {
            return this.amount > 0 ? 'income' : 'expense';
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for formatted amount
TransactionSchema.virtual('formattedAmount').get(function() {
    return `₹${Math.abs(this.amount).toLocaleString()}`;
});

// Virtual for transaction type
TransactionSchema.virtual('type').get(function() {
    return this.amount > 0 ? 'income' : 'expense';
});

// Index for better query performance
TransactionSchema.index({ userId: 1, createdAt: -1 });
TransactionSchema.index({ userId: 1, amount: 1 });

// Pre-save middleware to update the updatedAt field
TransactionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Static method to get summary for a specific user
TransactionSchema.statics.getSummary = async function(userId) {
    const transactions = await this.find({ userId });
    
    const summary = {
        totalTransactions: transactions.length,
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        recentTransactions: await this.find({ userId }).sort({ createdAt: -1 }).limit(5)
    };
    
    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            summary.totalIncome += transaction.amount;
        } else {
            summary.totalExpense += Math.abs(transaction.amount);
        }
    });
    
    summary.balance = summary.totalIncome - summary.totalExpense;
    
    return summary;
};

// Instance method to toggle amount sign (for corrections)
TransactionSchema.methods.toggleType = function() {
    this.amount = -this.amount;
    return this.save();
};

module.exports = mongoose.model('Transaction', TransactionSchema);