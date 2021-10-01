const mongoose = require('mongoose');

let mongoDbPath = 'mongodb://127.0.0.1:27017/JobAssignment';


mongoose.connect(mongoDbPath,{
    useNewUrlParser:true,
    useUnifiedTopology:true //to remove warnings while connection
})