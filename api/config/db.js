require("dotenv").config();
const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    return await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

module.exports = connectToDatabase;
