import express from 'express';
import cors from 'cors'

const app = express();


// common middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));



// api route

import apiRoutes from './routes/index.js';


app.use("/api", apiRoutes);




export {app};