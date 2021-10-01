const mongoose = require('mongoose');
const {ObjectId} = require('bson');
const CompanyCategory = require('./companyCategoryModel');


const Company = mongoose.model('Company',{
    "categoryId":{'type':ObjectId,'required':true,'ref':CompanyCategory},
    "title":{'type':String,'required':true},
    'image':{'type':String,'default':"no-img.jpg"},
    'description':{'type':String},
    'status':{'type':Boolean,'required':true,'default':false},
    'created_at':{'type':Date,'required':true},
    'updated_at':{'type':Date,'required':true}
})

module.exports = Company;