import { app } from './app.js';
import {connectDB} from './config/database-config.js'


const PORT = process.env.PORT || 5000

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🛩️ Server is running on PORT: ${PORT} ⚡⚡`)
    })
}).catch((error) => {
    console.log("MONGO db connection failed !!! ", err);
})