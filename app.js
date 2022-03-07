// Import packages
const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const cors = require('cors')


//Import Routes
const register = require("./routes/register");
const login = require("./routes/login");
const submit = require("./routes/submit");
const rank = require("./routes/rank");


dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  () => console.log("Connection to DB successful")
);

// CORS Configuration
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

//Middlewares 
app.use(express.json())
app.use(cors(corsOptions))


//Routes Middleware 
app.use("/api/v1/team", [register, login, submit, rank]);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running at http://127.0.0.1:${PORT}`));
