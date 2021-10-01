const multer = require('multer');

const storage = multer.diskStorage({ 
    destination:(req,file,cb)=>{
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
     
        cb(null,Date.now()+file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
   
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg')
    {
        cb(null,true)
    }
    else
    {
        cb(null,false)
    }
}


const upload = multer({
    storage:storage,
    fileFilter:fileFilter
});


module.exports = upload;

