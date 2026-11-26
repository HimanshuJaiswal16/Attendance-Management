import { status_code } from '../utils/constants.js';
import { createUserRepository } from '../repository/auth.repository.js';
import { handleError } from '../utils/error.js';
import { findUserWithMobileNumberRepository } from '../repository/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUpUserService = async (body) => {
    try {
        if (!body.password) {
            throw { err: 'Passoword is required', code: status_code.BAD_REQUEST };
        };

        const userDetails = {
            name: body.name,
            mobileNumber: body.mobileNumber,
            password: body.password,
        }

        const user = await createUserRepository(userDetails);

        return user;

    } catch (error) {
        if (
            error.name == 'SequelizeUniqueConstraintError' ||
            error.name == 'SequelizeValidationError'
        ) {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });

            throw { err: err, code: 400 };
        }

        throw error;
    }
};

export const signInUserService = async (body) => {
    try {
        const user = await findUserWithMobileNumberRepository(body.mobileNumber);

        if (!user) {
            throw {
                err: "Invalid mobile number and password",
                code: status_code.UNAUTHORIZED
            };
        };

        //validating password
        const isPasswordValid = await bcrypt.compare(body.password, user.password);

        if (!isPasswordValid) {
            throw {
                err: "Invalid mobile number and password",
                code: status_code.UNAUTHORIZED
            };
        };

        //token
        const token = jwt.sign(
            { id: user.userId, mobileNumber: user.mobileNumber, role: user.role },
            process.env.AUTH_KEY,
            { expiresIn: '1d' }
        );

        const result = user.toJSON();
        delete result.password;

        return {
            ...result,
            accessToken: token
        };

    } catch (error) {
        console.log("Error in Signing user - service", error);

        handleError(error);
        throw error;
    }
};

export const resetPasswordService = async (body) => {
    try {

        const user = await findUserWithMobileNumberRepository(body.mobileNumber);

        if (!user) {
            throw {
                err: "Invalid mobile number and password",
                code: status_code.UNAUTHORIZED
            };
        };

        //update new password
        user.password = body.newPassword;
        await user.save();

        return;

    } catch (error) {
        console.log("Error in reseting password - service", error);

        handleError(error);
        throw error;
    }
}