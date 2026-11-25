import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './src/config/db.config.js';

import './src/models/index.js';
import { routes } from './src/routes/index.js';

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
    return res.status(200).json({ status: 'Running' })
});

routes(app);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        console.log(`server is listening at ${PORT}`)
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
