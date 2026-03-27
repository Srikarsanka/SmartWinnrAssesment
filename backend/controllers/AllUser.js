const users  =  require("../models/users")
const getAllUsers =  async(req,res)=>
{
      try
      {
         const allUsers= await users.find();
         return res.status(200).json({message:"All Users Fetched Successfully",allUsers})
      }
      catch(err)
      {
            return res.status(500).json({message:"Internal Server Error.."})
      }
}
module.exports =  getAllUsers