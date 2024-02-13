const mongoose = require('mongoose');
const mongoURI= 'mongodb://0.0.0.0:27017/youtubeMern'

const connectToMongo =()=> mongoose.connect(mongoURI).then(()=>
console.log("Database is connected BOSS"));

module.exports=connectToMongo;
