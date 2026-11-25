import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Attendance = sequelize.define(
    'Attendance',
    {
        attendanceId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },

        punchIn: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        punchOut: {
            type: DataTypes.TIME,
            allowNull: true
        }
    },
    {
        tableName: 'attendances',
        timestamps: true,
        paranoid: true
    }
);

export default Attendance;