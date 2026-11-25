import { status_code } from "./constants.js";

export const handleError = (error) => {
    if (
        error.name === "SequelizeUniqueConstraintError" ||
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeDatabaseError"
    ) {
        let err = {};

        Object.keys(error.errors || {}).forEach((key) => {
            err[key] = error.errors[key].message;
        });

        throw {
            err,
            code: status_code.BAD_REQUEST
        };
    }

    throw error;
};