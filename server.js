const express = require("express");
const port = 5000;

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Random Ideas API" });
});

const ideaRouter = require("./routes/ideas");
app.use("/api/ideas", ideaRouter);

app.listen(port, () => console.log(`server listening on port ${port}`));
