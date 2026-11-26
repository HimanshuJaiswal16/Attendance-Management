import { resetPasswordService, signInUserService, signUpUserService } from "../services/auth.service.js";
import { status_code } from "../utils/constants.js";
import { errorResponseBody, successResponseBody } from "../utils/responseBody.js";

export const signUp = async (req, res) => {
    try {
        const response = await signUpUserService(req.body);

        successResponseBody.data = response;
        successResponseBody.message = "User Signed up successfully";

        return res.status(status_code.CREATED).json(successResponseBody);

    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(status_code.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

export const signIn = async (req, res) => {
    try {

        const response = await signInUserService(req.body);

        successResponseBody.data = response;
        successResponseBody.message = "User sign in successfully";
        return res.status(status_code.OK).json(successResponseBody);

    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(status_code.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

export const resetPassword = async (req, res) => {
    try {

        await resetPasswordService(req.body);

        successResponseBody.message = "Password Updated Successfully.";
        return res.status(status_code.OK).json(successResponseBody);

    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(status_code.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}