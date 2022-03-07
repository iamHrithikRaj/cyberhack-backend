// Import packages
const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const cors = require('cors')


//Import Routes
const register = require("./routes/Register");
const login = require("./routes/Login");
const submit = require("./routes/Submit");
const rank = require("./routes/Rank");


dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  () => console.log("Connection to DB successful")
);

// CORS Configuration
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

//Middlewares 
app.use(express.json())
app.use(cors(corsOptions))


//Routes Middleware 
app.use("/api/v1/team", [register, login, submit, rank]);

const PORT = process.env.PORT | 8080;
app.listen(PORT, () => console.log(`Server running at http://127.0.0.1:${PORT}`));
