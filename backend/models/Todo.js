const mongoose = require("mongoose");
const {Schema} = mongoose

const TodoSchema = new Schema({
  user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
  title:{type:String,trim:true,required:true,maxlength:200},
  task:{type:String,trim:true,required:true,maxlength:2000}, 
  isComplete:{type:String,default:"false"},
  date: { type: Date, default: Date.now },
});

module.exports=mongoose.model('todo',TodoSchema);