const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe");

router.post('/all', recipeController.getAllRecipes);
router.post('/add', recipeController.addRecipe);
router.post('/delete', recipeController.deleteRecipe);
router.post('/update', recipeController.updateRecipe);

module.exports = router
