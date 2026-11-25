import { userPunchIn, userPunchOut } from "../controllers/attendance.controller.js";

const attendanceRoutes = (app, prefix) => {
    app.post(`${prefix}/user/:userId/punch-in`, userPunchIn);
    app.patch(`${prefix}/user/:userId/punch-out`, userPunchOut);
};

export default attendanceRoutes;