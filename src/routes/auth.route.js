import { resetPassword, signIn, signUp } from "../controllers/auth.controller.js";

const authRoutes = (app, prefix) => {
    app.post(`${prefix}/sign-up`, signUp);
    app.post(`${prefix}/sign-in`, signIn);
    app.post(`${prefix}/reset-password`, resetPassword);
};

export default authRoutes;