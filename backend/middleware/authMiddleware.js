const jwt = require("jsonwebtoken");

const verifyTokenAndAdmin = (req, res, next) => {
    try {

        const token = req.cookies.token 

        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }

       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
    
        req.user = decoded;

      
        if (req.user.role === "Admin" || req.user.role === "Super Admin") {
            next(); 
        } else {
            return res.status(403).json({ message: "Access Denied. Only Admins can perform this action." });
        }
    } catch (err) {
        return res.status(400).json({ message: "Invalid or expired token." });
    }
};

module.exports = { verifyTokenAndAdmin };
