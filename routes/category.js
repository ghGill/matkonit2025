const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");

router.get('/all', categoryController.getAllCategories);
router.post('/add', categoryController.addCategory);
router.post('/delete', categoryController.deleteCategory);
router.post('/update', categoryController.updateCategory);

module.exports = router
