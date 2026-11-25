import User from "../models/user.model.js";
import { handleError } from "../utils/error.js";

export const createUserRepository = async (body) => {
    try {
        const response = await User.create(body);

        delete response.password;

        return response;
    } catch (error) {
        console.log("Error in creating User - Respository", error);
        handleError(error);

        throw error;
    }
};

export const getUsersRepository = async () => {
    try {

        const response = await User.findAll();

        return response;

    } catch (error) {
        console.log("Error in getting Users - Respository", error);
        handleError(error);

        throw error;
    }
}