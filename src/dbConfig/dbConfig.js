import { mongoose } from 'mongoose';
import { config } from 'dotenv';
config();
const dbConfig = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        const connection = db.connection;
        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        connection.on("error", (err) => {
            console.log("MongoDB connection error: ", err);
        });
        connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
    } catch (err) {
        console.log(err)
        process.exit(1);
    }
}
export default dbConfig;