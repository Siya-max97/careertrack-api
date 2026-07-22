const express = require("express");
const routes = require("./routes");

const app = express();
const { swaggerUi, specs } = require("./docs/swagger");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json()); 

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to CareerTrack API",
    version: "1.0.0",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
  });
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", routes);

module.exports = app;