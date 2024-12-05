const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

// Categories Routes
router.post('/api/categories', controller.createCategories);
router.get('/api/categories', controller.getCategories);

// Transaction Routes
router.post('/api/transaction', controller.createTransaction);
router.get('/api/transaction', controller.getTransactions);
router.delete('/api/transaction', controller.deleteTransaction);

// Labels Route
router.get('/api/labels', controller.getLabels);

module.exports = router;
