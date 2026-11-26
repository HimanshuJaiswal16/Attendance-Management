import User from "../models/user.model.js";
import { handleError } from "../utils/error.js";

export const getUsersRepository = async () => {
    try {

        const response = await User.findAll();

        return response;

    } catch (error) {
        console.log("Error in getting Users - Respository", error);
        handleError(error);

        throw error;
    }
};

export const findUserWithMobileNumberRepository = async (mobileNumber) => {
    try {
        return await User.scope(null).findOne({
            where: {
                mobileNumber
            }
        });

    } catch (error) {
        throw error;
    }
};

export const userByIdRepository = async (userId) => {
    try {

        return await User.findByPk(userId);
        
    } catch (error) {
        throw error;
    }
}