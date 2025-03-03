import mongoose from "mongoose";
import {config} from './server-config.js'
import { DB_NAME } from "./constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${config.MONGODB_URL}/${DB_NAME}`);
        console.log(`⚡⚡ MONGODB CONNECTED SUCCESSFULLY ⚡⚡ Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`💀💀 MONGODB CONNECTION ERROR : 💀💀`, error);
        process.exit(1);
    }
}

export {connectDB};