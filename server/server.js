const express = require("express");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);

app.get("/api/health", (request, response) => {
  response.json({ message: "server is running and healthy" });
});

async function startServer() {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`server running in port ${PORT} `);
  });
}

startServer();
