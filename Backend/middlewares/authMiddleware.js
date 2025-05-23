const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Received token in middleware:", token);   // Add this
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.user; // Attach decoded user data to request
    // req.user = {userID:decoded.userID, email:decoded.email}
    console.log("req.user",req.user)
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};


  

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Access denied. No token provided." });
//   }

//   const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user data to request
//     console.log("Authenticated user:", req.user);
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token." });
//   }
// };

module.exports = authMiddleware;
