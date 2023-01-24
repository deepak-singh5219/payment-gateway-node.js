import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import router from './Routes/appRoutes.js';
dotenv.config();
const app = express(); // express app initialise



// middlewares
app.use(express.json()); //for express app to read JSON data
app.use(cors()); // to allow client to interact with server
app.use('/',router); // using routes



export default app;
