// Import packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

//Import Routes
const register = require("./routes/register");
const login = require("./routes/login");
const submit = require("./routes/Submit");
const rank = require("./routes/Rank");
const add_question = require("./routes/addQuestion");

dotenv.config({ path: "./.env" });

// Connect to DB
mongoose.connect(
  "mongodb+srv://<DBNAME>:<PASSWORD>@cluster0.wo9hq.mongodb.net/CyberHack?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

// CORS Configuration
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

//Middlewares
app.use(express.json());
app.use(cors(corsOptions));

//Routes Middleware
app.use("/api/v1/team", [register, login, submit, rank]);
app.use("/api/v1/", [add_question]);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running at http://127.0.0.1:${PORT}`)
);
