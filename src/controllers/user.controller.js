import { successResponseBody, errorResponseBody } from "../utils/responseBody.js";
import { createUserService, getUsersService } from "../services/user.service.js";
import { status_code } from "../utils/constants.js";

export const createUser = async (req, res) => {
    try {
        const response = await createUserService(req.body);

        successResponseBody.data = response;
        successResponseBody.message = "User created successfully";

        return res.status(status_code.CREATED).json(successResponseBody);

    } catch (error) {
        console.log("Error in Create user Controller", error);

        if (error.err) {
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(status_code.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

export const getUsers = async (req, res) => {
    try {

        const response = await getUsersService();

        successResponseBody.data = response;
        successResponseBody.message = "Users fetched Successfully";

        res.status(status_code.OK).json(successResponseBody);
        
    } catch (error) {
         console.log("Error in get user Controller", error);

        if (error.err) {
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(status_code.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}