//third party modules
const express = require('express');
const router = express.Router();

//controller
const {addCategory,fetchCategory,fecthSingleCategory,updateCategory,deleteCategory} = require('../controllers/categoryController');

//Route: To add a new category.
router.post('/',addCategory);
//Route: To fetch 10 company categories.
router.get('/',fetchCategory);
//Route: To fetch single category.
router.get('/:id',fecthSingleCategory);
//Route: To update category.
router.put('/:id',updateCategory);
//Route: To delete category.
router.delete('/:id',deleteCategory);


module.exports = router;