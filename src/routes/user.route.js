import { createUser, getUsers } from "../controllers/user.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

const userRoutes = (app, prefix) => {
    app.get(`${prefix}/users`, isAuthenticated, isAdmin, getUsers);
    app.post(`${prefix}/user`, isAuthenticated, isAdmin, createUser);
    
};

export default userRoutes;