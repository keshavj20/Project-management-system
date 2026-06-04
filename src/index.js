const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./config/mongodb");
const router = require("./routes/basic_router");
const models = require("./models"); 
const cors=require("cors")
const app = express();
const authroute=require("./routes/auth_router")

dotenv.config();

connectdb();

app.use(express.json());
app.use("/api", router);
app.use("/api/user",authroute)
app.use(cors())

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
}

module.exports = app;
