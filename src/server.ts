import mongoose from "mongoose";
import app from "./app";

const port = 4050;

// Database connection
async function dbConnection() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/practice");
    console.log("DB connection established");

    app.listen(port, () => {
      console.log(`Hello Server running on port ${port}`);
    });
  } catch (error) {
    console.log(`Failed to connect to DB`, error);
  }
}
dbConnection();
