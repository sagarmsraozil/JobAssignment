//third party modules

//models
const CompanyCategory = require('../models/companyCategoryModel');


//API: To add a new category.
module.exports.addCategory = async(req,res)=>{
    try{
        let title = req.body['title'].trim();
        
        //filtering data to check whether the given title already exists or not.
        let categories = await CompanyCategory.find({});
        let categoryContainer = categories.map((val)=>{return val.title.toLowerCase().trim()});

        if(categoryContainer.includes(title.toLowerCase()))
        {
            return res.status(202).json({'success':false,'message':"Similar title already exists."});
        }
        else
        {
            const categoryObj = new CompanyCategory({
                "title":title,
                'created_at':new Date(),
                'updated_at':new Date()
            })

            let storeCategory = await categoryObj.save();
            
            if(storeCategory != undefined)
            {
                return res.status(200).json({'success':true,'message':"Category Added!!",'data':storeCategory});
            }
        }
    }
    catch(err){
        return res.status(404).json({'success':false,'message':err});
    }
}

//API: To fecth 10 company categories.
module.exports.fetchCategory = async(req,res)=>{
    try{
        let categories = await CompanyCategory.find({}).sort({'title':1}).limit(10);
        if(categories.length > 0)
        {
            return res.status(200).json({'success':true,'message':`${categories.length} categories found!!`,'data':categories});   
        }
        else
        {
            return res.status(202).json({'success':false,'message':`${categories.length} categories found!!`});
        }
    }
    catch(err)
    {
        return res.status(404).json({'success':false,'message':err});
    }
}

//API: To fetch single category
module.exports.fecthSingleCategory = async(req,res)=>{
    try{
        let categoryId = req.params.id;

        let category = await CompanyCategory.findOne({'_id':categoryId});
        if(category != null)
        {
            return res.status(200).json({'success':true,'message':'Category Found!!','data':category});
        }
        else
        {
            return res.status(202).json({"success":false,'message':"Category Unavailable!!"})
        }
    }
    catch(err)
    {
        return res.status(404).json({'success':false,'message':err});
    }
}

