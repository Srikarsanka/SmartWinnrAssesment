const bcrypt =  require("bcryptjs");
const users =  require("../models/users");
const jwt =  require("jsonwebtoken");

const login  = async(req,res)=>
{
      try
      {
            const {email , password} = req.body;
            if(!email || !password)
            {
              return res.status(400).json({message:"Fill all the required fields"});
            }

            const user = await users.findOne({email}); 
            if(!user)
            {
               return res.status(404).json({message:"User Not Found.."});
            }

            const isPassword = await bcrypt.compare(password,user.password);
            if(!isPassword)
            {
                  return res.status(401).json({message:"Invalid Password"});
            }
            if(!user.isActive)
            {
                  return res.status(403).json({message:"Your Account is Deactivated.."})
            }

            const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"7h"});
            
            const payload = {
                  user_id:user._id, 
                  role:user.role,
                  name:user.name,
                  email:user.email
            };


            res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"strict",maxAge:7*24*60*60*1000});

            res.status(200).json({message:"Login Successful",token,payload});
      }
      catch(err)
      {
            console.error(err);
            return res.status(500).json({message:"Internal Server Error."});
      }
}

module.exports = login;