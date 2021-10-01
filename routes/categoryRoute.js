//third party modules
const express = require('express');
const router = express.Router();

//controller
const {addCategory,fetchCategory,fecthSingleCategory,updateCategory,deleteCategory} = require('../controllers/categoryController');

//middleware
const key = require('../middleware/key');

//Route: To add a new category.
router.post('/',key.verifyAPIKey,addCategory);
//Route: To fetch 10 company categories.
router.get('/',key.verifyAPIKey,fetchCategory);
//Route: To fetch single category.
router.get('/:id',key.verifyAPIKey,fecthSingleCategory);
//Route: To update category.
router.put('/:id',key.verifyAPIKey,updateCategory);
//Route: To delete category.
router.delete('/:id',key.verifyAPIKey,deleteCategory);


module.exports = router;