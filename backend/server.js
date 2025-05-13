import express from 'express';
import {connectDB} from './lib/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
}
);
