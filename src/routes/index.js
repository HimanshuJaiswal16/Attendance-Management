import userRoutes from "./user.route.js";
import attendanceRoutes from "./attendance.route.js";

export const routes = (app) => {
    const prefix = '/api';

    userRoutes(app, prefix);
    attendanceRoutes(app, prefix);
}