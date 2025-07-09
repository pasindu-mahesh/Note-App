const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);     
    }catch (error){
        console.log(Error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;