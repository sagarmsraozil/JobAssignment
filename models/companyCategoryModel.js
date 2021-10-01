const mongoose = require('mongoose');


const CompanyCategory = mongoose.model('CompanyCategory',{
    'title':{'type':String,'required':true},
    'created_at':{'type':Date,'required':true},
    'updated_at':{'type':Date,'required':true}
})

module.exports = CompanyCategory;