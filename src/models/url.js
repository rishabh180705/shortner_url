import mongoose from "mongoose";

const urlSchema= new mongoose.Schema({
    ShortId:{
        type:String,
        require:true,
        unique:true,
     },
     originalURL:{
        type:String,
        require:true, 
     },
     VisitHistory:[
        {
            timestamp:{type:Number}
        }
     ],
     createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
      
     }
  


},{timestamps:true});

export const URL=mongoose.model("URL",urlSchema);