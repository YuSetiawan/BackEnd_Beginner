const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transaction');

router
  .get('/', transactionController.getAllTransaction)
  .get('/:id', transactionController.getDetailTransaction)
  .post('/', transactionController.createTransaction)
  .put('/:id', transactionController.updateTransaction)
  .delete('/:id', transactionController.deleteTransaction);

module.exports = router;
