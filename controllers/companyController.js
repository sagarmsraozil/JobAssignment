//third party modules
const {validationResult} = require('express-validator');

//models
const Company = require('../models/companyModel');

//local modules
const {getCustomizedError} = require('../utils/utils')

//API: To add a company record.
module.exports.addCompany = async(req,res)=>{
    try{
        let errors = validationResult(req);
        if(errors.isEmpty())
        {
            let title = req.body['title'].trim();
            let status = req.body['status'];
            let description = req.body['description'] == "undefined"? undefined: req.body['description'] == undefined? req.body['description']: req.body['description'].trim();
            let image = req.file != undefined ? req.file.path : "no-img.jpg";
            let categoryId = req.body['categoryId'] == "undefined" ? undefined : req.body['categoryId'] == undefined ? req.body['categoryId']: req.body['categoryId'];
            let companyObj = await new Company({
                "title":title,
                'status':status,
                'description':description,
                'image':image,
                'categoryId':categoryId,
                'updated_at':new Date(),
                'created_at':new Date()
            })

            let storeCompany = await companyObj.save();

            if(storeCompany != null) {
                return res.status(200).json({'success':true,'message':"Company Stored!!"});
            }
        }
        else
        {
            let customizedError = getCustomizedError(errors.array());
            return res.status(202).json({'success':false,'message':"Error storing company.",'error':customizedError});
        }
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json({'success':false,'message':err});
    }
}

//API: To fetch companies
module.exports.fetchCompanies = async(req,res)=>{
    try{
        let companies = await Company.find({}).sort({'title':1})
        .populate({
            "path":"categoryId"
        })
        if(companies.length > 0)
        {
            return res.status(200).json({"success":true,'message':`${companies.length} Companies Found.`,'data':companies});
        }
        else
        {
            return res.status(202).json({'success':false,'message':'0 Companies found.'});
        }
    }
    catch(err)
    {
        return res.status(404).json({'success':false,'message':err});
    }
}

//API: To fetch single company
module.exports.fetchSingleCompany = async(req,res)=>{
    try{
        let companyId = req.params.id;
        let company = await Company.findOne({'_id':companyId})
        .populate({
            "path":"categoryId"
        })

        if(company != null)
        {
            return res.status(200).json({'success':true,'message':'Company Found.','data':company});
        }
        else
        {
            return res.status(202).json({'success':false,'message':'Company Unavailable.'});
        }
    }
    catch(err)
    {
        return res.status(404).json({'success':false,'message':err});
    }
}

//API: To update company details
module.exports.updateCompany = async(req,res)=>{
    try{
        let errors = validationResult(req);
        if(errors.isEmpty())
        {
            let companyId = req.params.id;
            let title = req.body['title'].trim();
            let status = req.body['status'];
            let image = req.file != undefined? req.file.path : "no-img.jpg";
            let description = req.body['description'] == "undefined"? undefined: req.body['description'] == undefined? req.body['description']: req.body['description'].trim();
            let categoryId = req.body['categoryId'] == "undefined" ? undefined : req.body['categoryId'] == undefined ? req.body['categoryId']: req.body['categoryId'];
            let company = await Company.findOne({"_id":companyId});

            let unsetData = {};
            if(description == undefined)
            {
                unsetData['description'] = 1
            }
            if(categoryId == undefined){
                unsetData['categoryId'] = 1
            }

            if(company != null)
            {
                let editCompany = await Company.updateOne({"_id":company._id},{
                    $set:{
                        "title":title,
                        "status":status,
                        "image":image,
                        "description":description,
                        "categoryId":categoryId
                    },
                    $unset:unsetData
                })

                if(editCompany.modifiedCount >= 1)
                {
                    return res.status(200).json({'success':true,'message':"Company Details Updated!!"});
                }
            }
            else
            {
                return res.status(202).json({'success':false,'message':"Company Unavailable.",'error':{'random':"Company Unavailable."}})
            }
        }
        else
        {
            let customizedError = getCustomizedError(errors.array());
            return res.status(202).json({'success':false,'message':"Error in update.",'error':customizedError});
        }
    }
    catch(err)
    {
        console.log(err);
        return res.status(404).json({'success':false,'message':err});
    }
}

//API: To delete company.
module.exports.deleteCompany = async(req,res)=>{
    try
    {
        let companyId = req.params.id;
        let company = await Company.findOne({"_id":companyId});
        if(company != null)
        {
            let removeCompany = await Company.deleteOne({"_id":company._id});
            if(removeCompany.deletedCount >= 1)
            {
                return res.status(200).json({'success':true,'message':"Company Removed!!"});
            }
        }
        else
        {
            return res.status(202).json({'success':false,'message':"Company Unavailable!!"});
        }
    }
    catch(err)
    {
        return res.status(404).json({'success':false,'message':err});
    }
}