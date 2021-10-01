//third party modules
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

//controller
const {addCompany,fetchCompanies,fetchSingleCompany,updateCompany,deleteCompany} = require('../controllers/companyController');

//middleware
const upload = require('../middleware/upload');
const key = require('../middleware/key')

//Route: To add a company record.
router.post('/',upload.single('image'),key.verifyAPIKey,[
    check('title','Title cannot be left empty.').not().isEmpty(),
    check('status',"Status cannot be left empty.").not().isEmpty(),
    check('title','Title should atleast contain 4 characters.').isLength({'min':4})
],addCompany)
//Route: To fetch companies
router.get('/',key.verifyAPIKey,fetchCompanies);
//Route: To fetch single company
router.get('/:id',key.verifyAPIKey,fetchSingleCompany);
//Route: To update company details
router.put('/:id',upload.single('image'),key.verifyAPIKey,[
    check('title','Title cannot be left empty.').not().isEmpty(),
    check('status',"Status cannot be left empty.").not().isEmpty(),
    check('title','Title should atleast contain 4 characters.').isLength({'min':4})
],updateCompany);
//API: To delete company.
router.delete('/:id',key.verifyAPIKey,deleteCompany);


module.exports = router;