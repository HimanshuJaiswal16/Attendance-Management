import User from "../models/user.model.js";
import { handleError } from "../utils/error.js";

export const createUserRepository = async (body) => {
    try {
        const response = await User.create(body);

        delete response.password;
        return response;
    } catch (error) {
        console.log("Error in creating User - Respository", error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            throw {
                err: 'This mobile number is already registered.',
                code: 400
            };
        }

        //handles other errors
        handleError(error);

        throw error;
    }
};
