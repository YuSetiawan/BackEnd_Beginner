const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router
  .get('/', userController.getAllUser)
  .get('/search', userController.getNameUser)
  .get('/:id', userController.getDetailUser)
  .post('/', userController.createUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser);

module.exports = router;
