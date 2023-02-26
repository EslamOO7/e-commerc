import Jwt from 'jsonwebtoken';
import { createError } from '../util/Errors.js';

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token) {
//         return next(createError(403, 'there is no token'));
//     }
//     Jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//         if (err) {
//             return next(createError(403, 'Token is NOT invalid !!'))
//         }
//         req.user = user;
//         next();

//     })
// };
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        Jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!!!");
    }
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, 'you are not authorized'))
        }
    });
};
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, 'you are not ADMIN'))
        }
    });
};


