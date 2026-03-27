const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const key =  process.env.JWT_Secret
const verifySuperAdmin = (req,res,next)=>
{
      try
      {

       const token =  req.cookies.token
if(!token)
{
      return res.status(401).json({message:"Access Denied.No token Provided"})

}

const decoded =  jwt.verify(token,key)
req.user = decoded
if(req.user.role ==="Super Admin")
{
      next()
}
else
{
      return res.status(403).json({message:"Access Denied.Only Super Admin Can Only Perform this action.."})
}
}

catch(err)
{
      return res.status(500).json({message:"Internal Server Error.."})
}
}
module.exports = {verifySuperAdmin};
