import { createUser, getUsers } from "../controllers/user.controller.js";

const userRoutes = (app, prefix) => {
    app.get(`${prefix}/users`, getUsers);
    app.post(`${prefix}/user`, createUser);
    
};

export default userRoutes;