import jwt from "jsonwebtoken";


export const checkUserSession = (req, res, next) => {

    // check is session has a user
    if (req.session.user) {
        next()
    } else if (req.headers.authorization) {
       try {
         // Extract token from headers
         const token = req.headers.authorization.split(' ')[1];
 
 
         // verify the token to get user
         const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
 
         // Append user to request
         req.user = user;
 
         // call next function
         next();
         res.json(token);
       } catch (error) {
    
       }

    } else {
        res.status(401).json('User not authenticated');
    }

}