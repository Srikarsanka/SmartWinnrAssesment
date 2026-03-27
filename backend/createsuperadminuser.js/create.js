const express =  require("express")
const dotenv =  require("dotenv")
dotenv.config() 
const mongoose =  require("mongoose")
const users =  require("../models/users")
const bcrypt =  require("bcryptjs")

const createSuperAdminUser = async()=>
{
      try
      {
            await mongoose.connect(process.env.MONGO_URI);

            const name =  "Super Admin"
            const email = "smartwinsuperadmin@gmail.com"
            const password =  "smartwinadmin@123"
            const role ="Super Admin"
            const isActive = true
 
            const existingUser = await users.findOne({email})
            if(existingUser) // it checks if the user is exists or not 
            {
                  console.log("Super Admin is already exits..")
                  return 
            }
            else
            {
                  const  hashedpass =  await bcrypt.hash(password,10)
                  const user =  {
                        name:name,
                        email:email,
                        password:hashedpass,
                        role:role,
                        isActive:isActive,

                  }
                  await users.create(user)
                  console.log("Super Admin created successfully")
            }
            
            
      }
      catch(err)
      {
            console.log("Internal Server Error",err)
           
      }
}

createSuperAdminUser();
