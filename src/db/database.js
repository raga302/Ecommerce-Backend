import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"


const DBConnect = async()=>{
    try {
        const res = await mongoose.connect(`${process.env.MONGO_URL}`, {dbName:DB_NAME});
        console.log("Database connected");
    } catch (error) {
        console.log(`DB ERROR : `, error);
        
    }
    
}

export { DBConnect }