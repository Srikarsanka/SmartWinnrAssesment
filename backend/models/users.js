const mongoose =  require("mongoose")

const users =  new mongoose.Schema(
      {
            name:{
                  type:String,
                  required:true,
                  trim:true
            },
            email:
            {
                  type:String,
                  required:true,
                  trim:true,
                  unique:true,
            },
            password:
            {
                  type:String,
                  required:true,
                  trim:true
            },
            role:
            {
                  type:String,
                  enum:["Super Admin", "Admin", "Viewer"],
                  default:"Viewer",
            },
            isActive:
            {
                  type:Boolean,
                  default:true,
            }
      },
      {
            timestamps:true,
      }
)
module.exports  = mongoose.model("User", users)