import Attendance from '../models/attendance.model.js';
import { handleError } from '../utils/error.js';
import { Op } from 'sequelize';

export const punchInRepository = async (userId) => {
    try {
        const response = await Attendance.create({
            punchIn: new Date().toTimeString().split(' ')[0],
            userId
        });

        return response;

    } catch (error) {
        console.log("Error in punch in repository", error);

        handleError(error);

        throw error;
    }
};

export const punchOutRepository = async (userId) => {
    try {


    } catch (error) {
        console.log("Error in punch out repository", error);

        handleError(error);

        throw error;
    }
};

export const userPunchInDetailRepository = async (date, userId) => {
    try {
        const startDate = new Date(`${date}T00:00:00.000Z`);

        const endDate = new Date(`${date}T00:00:00.000Z`);
        endDate.setUTCDate(endDate.getUTCDate() + 1);

        const response = await Attendance.findOne({
            where: {
                userId,
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate
                }
            }
        });

        return response;

    } catch (error) {
        console.log("Error in get punch in repository", error);

        handleError(error);

        throw error;
    }
}