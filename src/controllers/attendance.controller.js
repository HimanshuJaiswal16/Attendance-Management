import { punchInService, punchOutService } from '../services/attendance.service.js';
import { status_code } from '../utils/constants.js';
import { successResponseBody, errorResponseBody } from '../utils/responseBody.js';

export const userPunchIn = async (req, res) => {
    try {

        const response = await punchInService(req.params.userId);

        successResponseBody.data = response;
        successResponseBody.message = "User puched in successfully";

        res.status(status_code.CREATED).json(successResponseBody);

    } catch (error) {
        console.log("Error in punch In Controller", error);

        if (error.err) {
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(status_code.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
};

export const userPunchOut = async (req, res) => {
    try {
        const response = await punchOutService(req.params.userId);

        successResponseBody.data = response;
        successResponseBody.message = "User puched out successfully";

        res.status(status_code.OK).json(successResponseBody);


    } catch (error) {
        console.log("Error in punch out Controller", error);

        if (error.err) {
            errorResponseBody.err = error.err;
            errorResponseBody.message = error.err;
            return res.status(error.code).json(errorResponseBody);
        }

        errorResponseBody.err = error;
        return res.status(status_code.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}