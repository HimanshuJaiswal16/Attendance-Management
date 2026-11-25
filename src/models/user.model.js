import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import { USER_ROLE } from "../utils/constants.js";
import bcrypt from 'bcrypt';

const User = sequelize.define(
    'User',
    {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,

            validate: {
                notNull: {
                    msg: 'Name is required.'
                },
                notEmpty: {
                    msg: 'Name cannot be empty.'
                },
                len: {
                    args: [2, 255],
                    msg: 'Name must be between 2 and 255 characters.'
                }
            }
        },

        mobileNumber: {
            type: DataTypes.STRING(10),
            allowNull: false,

            unique: {
                name: 'unique_mobile_number',
                msg: 'This mobile number is already registered.'
            },

            validate: {
                notNull: {
                    msg: 'Mobile number is required.'
                },
                notEmpty: {
                    msg: 'Mobile number cannot be empty.'
                },
                is: {
                    args: /^\d{10}$/,
                    msg: 'Please enter a valid 10-digit mobile number.'
                }
            }
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: true,

            validate: {
                len: {
                    args: [6, 255],
                    msg: 'Password must be at least 6 characters long.'
                }
            }
        },

        role: {
            type: DataTypes.ENUM(
                USER_ROLE.admin,
                USER_ROLE.user
            ),
            allowNull: false,
            defaultValue: USER_ROLE.user,

            validate: {
                isIn: {
                    args: [[USER_ROLE.admin, USER_ROLE.user]],
                    msg: `Role must be either ${USER_ROLE.user} or ${USER_ROLE.admin}`
                }
            }
        },
    },
    {   
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10)
                    user.password = await bcrypt.hash(user.password, salt);
                };
            },
            beforeUpdate: async (user) => {
                if (user.changed('password') && user.password) {
                    const salt = await bcrypt.genSalt(10)
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    }
);

export default User;