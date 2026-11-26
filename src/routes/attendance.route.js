import { userPunchIn, userPunchOut } from "../controllers/attendance.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const attendanceRoutes = (app, prefix) => {
    app.post(`${prefix}/user/:userId/punch-in`, isAuthenticated , userPunchIn);
    app.patch(`${prefix}/user/:userId/punch-out`, isAuthenticated, userPunchOut);
};

export default attendanceRoutes;