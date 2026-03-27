const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticateUser = async(req, res, next) => {
    
    const token = req.cookies.token;

    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access, please login" });
    }

    try {
       
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        
        // it will attached to every api request to authenticate the user for role based access of the dashboards
        req.user = decodedUser;

     
        next(); 
    }
    catch (err) {
     
        return res.status(403).json({ message: "Invalid or expired token. Please login again." });
    }
};

module.exports = authenticateUser;