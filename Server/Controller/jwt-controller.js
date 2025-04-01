import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
   
    
    if (!authHeader) {
        return response.status(401).json({ msg: "Token is missing" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return response.status(403).json({ msg: "Invalid token" });
        }
        request.user = user;
        next();
    });
};
