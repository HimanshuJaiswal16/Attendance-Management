import User from "./user.model.js";
import Attendance from "./attendance.model.js";

//User can have many Attendance but one Attendance belongs to one User.
User.hasMany(Attendance, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Attendance.belongsTo(User, {
    foreignKey: 'userId'
});