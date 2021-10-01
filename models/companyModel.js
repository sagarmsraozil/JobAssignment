const mongoose = require('mongoose');
const {ObjectId} = require('bson');
const CompanyCategory = require('./companyCategoryModel');


const Company = mongoose.model('Company',{
    "categoryId":{'type':ObjectId,'ref':CompanyCategory},
    "title":{'type':String,'required':true},
    'image':{'type':String},
    'description':{'type':String},
    'status':{'type':Boolean,'required':true,'default':false},
    'created_at':{'type':Date,'required':true},
    'updated_at':{'type':Date,'required':true}
})

module.exports = Company;