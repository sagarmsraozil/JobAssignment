//third party modules
const express = require('express');
const router = express.Router();

//local modules
const {addCategory,fetchCategory} = require('../controllers/categoryController');

//Route: To add a new category.
router.post('/',addCategory);
//Route: To fetch 10 company categories.
router.get('/',fetchCategory);
//Route: To fetch single category.



module.exports = router;