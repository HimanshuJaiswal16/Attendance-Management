import { userByIdService } from "../services/user.service.js";
import { status_code, USER_ROLE } from "../utils/constants.js";
import { errorResponseBody } from "../utils/responseBody.js";
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
            errorResponseBody.err = "User is unauthorized";
            errorResponseBody.message = "User is unauthorized";
            return res.status(status_code.FORBIDDEN).json(errorResponseBody);
        };

        //verifying token
        const response = jwt.verify(token, process.env.AUTH_KEY);
        if (!response) {
            errorResponseBody.err = "User is unauthorized";
            errorResponseBody.message = "User is unauthorized";
            return res.status(status_code.UNAUTHORIZED).json(errorResponseBody);
        }

        //fetching user details
        const user = await userByIdService(response.id);
        req.user = {
            id: user.userId,
            role: user.role
        };

        next();

    } catch (error) {
        if (
            error.name === 'JsonWebTokenError' ||
            error.name === 'TokenExpiredError' ||
            error.name === 'NotBeforeError'
        ) {

            errorResponseBody.err = error.message;
            errorResponseBody.message = 'Unauthorized';
            return res.status(status_code.UNAUTHORIZED).json(errorResponseBody);
        }

        errorResponseBody.message = 'Authentication failed'
        return res.status(status_code.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

export const isAdmin = (req, res, next) => {
    const user = req.user;

    if(user.role !== USER_ROLE.admin) {
        errorResponseBody.err = 'User is Unauthorized';
        errorResponseBody.message = 'User is Unauthorized';
        return res.status(status_code.UNAUTHORIZED).json(errorResponseBody); 
    };

    next();
}