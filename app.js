// Import packages
const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose");

//Import Routes
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");


dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  () => console.log("Connection to DB successful")
);

//Middlewares 
app.use(express.json())


//Routes Middleware 
app.use("/api/v1/team", [registerRoute, loginRoute]);

const PORT = process.env.PORT | 8080;
app.listen(PORT, () => console.log(`Server running at http://127.0.0.1:${PORT}`));
