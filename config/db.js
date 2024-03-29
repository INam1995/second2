// const mongoose = require("mongoose");
// const express = require('express');
// const app = express();
// const mongoURI = "mongodb+srv://inamyadav23:inam2005@cluster0.52lfy5w.mongodb.net/doctor-app";
// const connectTomongo = async () => {
//   try {
//     mongoose.set("strictQuery", false);
//     await mongoose.connect(mongoURI);
//     console.log("Connected to Mongo Successfully!");
//     console.log(`Connected to host: ${mongoose.connection.host}`);
//     console.log(`Connected to database: ${mongoose.connection.db.doctor-app}`);
//   } catch (error) {
//     console.error("Error connecting to MongoDB:");
//     // console.error(error);
//     process.exit(0);
//   }
// };

// module.exports = connectTomongo;

// const mongoose = require("mongoose");
// const colors = require("colors");
// const connectDB = async () => {
 
//   try {
//         mongoose.set("strictQuery", false);
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log("Connected to Mongo Successfully!");
//         console.log(`Connected to host: ${mongoose.connection.host}`.bgGreen.white);
//         console.log(`Connected to database: ${mongoose.connection.db.doctor-appointment}`);
//       }
//   catch (error) {
//     console.log(`Mongodb Server Issue ${error}`);
//   }
// };

// module.exports = connectDB;


const mongoose = require("mongoose");


const connectDb = async () => {
    let conn;

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/doctor-appointment", { useNewUrlParser: true, useUnifiedTopology: true });
        conn = mongoose.connection;
        console.log(`MongoDB Connected: ${conn.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDb;