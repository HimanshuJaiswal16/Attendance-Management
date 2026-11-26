import {
    punchInRepository,
    userPunchInDetailRepository
} from "../repository/attendance.repository.js";
import { status_code } from "../utils/constants.js";

export const punchInService = async (userId) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        const punchDetail = await userPunchInDetailRepository(date, userId);

        if (punchDetail && punchDetail.punchOut) {
            throw {
                err: 'User has already punched-out',
                code: status_code.UNPROCESSABLE_ENTITY
            }
        };

        if (punchDetail) {
            throw {
                err: 'User has already punched-in today',
                code: status_code.UNPROCESSABLE_ENTITY
            }
        };

        //For a new punch-in
        const response = await punchInRepository(userId);
        return response;

    } catch (error) {
        console.log(error);

        throw error;
    }
};

export const punchOutService = async (userId) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        const punchDetail = await userPunchInDetailRepository(date, userId);

        if (!punchDetail) {
            throw {
                err: 'No punch-in record found for today',
                code: status_code.UNPROCESSABLE_ENTITY
            }
        };

        if (punchDetail.punchOut) {
            throw {
                err: 'User has already punched-out',
                code: status_code.UNPROCESSABLE_ENTITY
            }
        };

        //adding punch out detail
        punchDetail.punchOut = new Date().toTimeString().split(' ')[0];
        await punchDetail.save();

        return punchDetail;

    } catch (error) {
        console.log(error);

        throw error;
    }
}