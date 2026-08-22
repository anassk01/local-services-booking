const connectDb = require("./config/db");
require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`server running in port ${PORT} `);
  });
}

startServer();
