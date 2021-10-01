module.exports.verifyAPIKey = (req,res,next)=>{
    try{
        let token = req.headers['authorization'].split(" ")[1];
        if(token == process.env.API_KEY)
        {
            next();
        }
        else
        {
            return res.status(202).json({'success':false,'message':"Invalid API Key."});
        }
    }
    catch(err)
    {
        return res.status(404).json({'success':false,'message':err});
    }
}