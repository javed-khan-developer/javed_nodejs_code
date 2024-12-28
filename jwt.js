const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {
    //Extract the jwt token from the request headers
    const token = req.headers.authorization.split('')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        //Verify the JWT token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        //Attach user information to the request object
        req.user=decoded;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Invalid Token' })
    }
}

//function to generate user token
const generateToken=(userData)=>{
    //Generate a new JWT token using user data 
    return jwt.sign(userData,process.env.JWT_SECRET)
}


module.exports= {jwtAuthMiddleware,generateToken};