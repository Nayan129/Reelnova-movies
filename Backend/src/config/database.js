import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("connected to DB");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
}

export default connectToDB;
