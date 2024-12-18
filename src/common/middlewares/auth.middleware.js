import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    const SECRET_KEY = process.env.JWT_SECRET
    const token = req.header('Authorization'); // Token sent in headers

    if (!token) {
        return res.status(403).json({ message: "Access denied, token missing" });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
