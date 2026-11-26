import userRoutes from "./user.route.js";
import attendanceRoutes from "./attendance.route.js";
import authRoutes from "./auth.route.js";

export const routes = (app) => {
    const prefix = '/api';

    authRoutes(app, prefix);
    userRoutes(app, prefix);
    attendanceRoutes(app, prefix);
}