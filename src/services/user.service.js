import { createUserRepository } from "../repository/auth.repository.js";
import { getUsersRepository, userByIdRepository } from "../repository/user.repository.js";
import { handleError } from "../utils/error.js";

export const createUserService = async (body) => {
    try {

        return await createUserRepository(body);

    } catch (error) {
        console.log(error);

        throw error;
    }
};

export const getUsersService = async () => {
    try {

        return await getUsersRepository();

    } catch (error) {
        console.log(error);

        throw error;
    }
};

export const userByIdService = async (userId) => {
    try {

        return await userByIdRepository(userId);

    } catch (error) {
        console.log("Error in finding error", error);

        handleError(error);
        throw error;
    }
}