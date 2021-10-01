

const getCustomizedError = (errorData)=>{
    let errors = errorData.map((val)=>{return val});
    let errorBox = {};

    for(var i of errors)
    {
        if(!Object.keys(errorBox).includes(i.params))
        {
            errorBox[i.params] = i.msg;
        }
    }

    return errorBox;
}

module.exports = {getCustomizedError};