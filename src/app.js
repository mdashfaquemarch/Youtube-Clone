import express from 'express';
import cors from 'cors'


// api route

import apiRoutes from './routes/index.js';
import errorHandler from './middlewares/error-middleware.js';

const app = express();


// common middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));







app.use("/api", apiRoutes);




// Error Handler Middleware (Must be the last middleware)
app.use(errorHandler);

export {app};