import { 
    createUserRepository,
    getUsersRepository
} from "../repository/user.repository.js";

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
}