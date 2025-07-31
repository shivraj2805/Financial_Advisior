const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const ensureAuthenticated = require('../middlewares/Auth');

// Middleware for logging requests
const requestLogger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Request Body:', req.body);
    }
    next();
};

// Apply logging middleware to all routes
router.use(requestLogger);

// Apply authentication middleware to all transaction routes
router.use(ensureAuthenticated);

// GET /api/transactions - Get all transactions for authenticated user
router.get('/', transactionController.getTransactions);

// POST /api/transactions - Add a new transaction for authenticated user
router.post('/', transactionController.addTransaction);

// DELETE /api/transactions/:id - Delete a transaction (only if it belongs to authenticated user)
router.delete('/:id', transactionController.deleteTransaction);

// GET /api/transactions/stats - Get transaction statistics for authenticated user
router.get('/stats', transactionController.getTransactionStats);

// Error handling middleware for this router
router.use((error, req, res, next) => {
    console.error('Transaction route error:', error.message);
    res.status(500).json({
        error: 'Transaction operation failed',
        message: error.message,
        path: req.originalUrl
    });
});

module.exports = router;