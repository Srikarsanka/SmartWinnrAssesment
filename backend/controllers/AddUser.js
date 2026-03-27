const users =  require("../models/users")
const bcrypt = require("bcryptjs")
const addUser = async(req , res)=>
{
      try
      {
        const { name , email , password , isActive , role} = req.body;
        if (!name || !email || !password)
        {
             return res.status(400).json({message:"Fill all the required feilds"})
        }
        const exitUser =  await users.findOne({email})
        if(exitUser)
        {
            return res.status(400).json({message:"User Already Exists"})
        }
        const hashedpass = await bcrypt.hash(password,10)
        const user =
      {
            name:name,
            email:email,
            password:hashedpass,
            isActive:isActive,
            role:role,
      }
      await users.create(user)
      return res.status(200).json({message:"User Added Successfully"})
      }
      catch(err)
      {
            return res.status(500).json({message:"Internal Server Error.."})
      }
}
module.exports =  addUser