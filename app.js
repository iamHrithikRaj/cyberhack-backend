// Import packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swaggerUi");

//Import Routes
const register = require("./routes/register");
const login = require("./routes/login");
const submit = require("./routes/Submit");
const rank = require("./routes/Rank");

dotenv.config({ path: "./.env" });

// Connect to DB
mongoose.connect(
  "mongodb+srv://cyberhack-db:cyberhackamity2022@cluster0.wo9hq.mongodb.net/CyberHack?retryWrites=true&w=majority",
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

// OpenAPI UI
app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "http://localhost:3030/api-docs",
    },
  })
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running at http://127.0.0.1:${PORT}`)
);
