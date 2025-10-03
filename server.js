const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 5000;
const connectDB = require("./config/db.js");

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Random Ideas API" });
});

const ideaRouter = require("./routes/ideas");
app.use("/api/ideas", ideaRouter);

app.listen(port, () => console.log(`server listening on port ${port}`));
