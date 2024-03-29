const express = require('express')
const colors = require('colors')
const moragan = require('morgan')
const dotenv = require('dotenv');
const cors = require('cors');


// dotenv config 
dotenv.config();




const connectDB = require('./config/db');


// mongodb connection 
connectDB();

// res obj 
const app = express()


// Allow requests from all origins
// app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000'
// }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Other CORS headers can be added here as needed
    next();
});

app.options('*', cors()); // Enable preflight requests for all routes


// middlewares
app.use(express.json())
app.use(moragan('dev'))

// routes
app.use("/api/v1/user",require("./routes/userRoutes"))


// port
const port = process.env.PORT||8080

// listen port 
app.listen(port,()=>{
    console.log(`Server running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgCyan.white)
})