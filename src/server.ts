import mongoose, { Schema } from "mongoose";
import { config } from "dotenv";

config();

mongoose.connect(`mongodb+srv://shivresides:${process.env.MONGO_DB_PASS}@second-brain.4jq3gmh.mongodb.net/todo-app`)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("DB connection failed:", err));

const userSchema = new Schema({
    username: String,
    password: String
});

const todoSchema = new Schema({
    title: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'UserTable', required: true }
});

const userModel = mongoose.model("UserTable", userSchema);
const todoModel = mongoose.model("TodoTable", todoSchema);

const models = { userModel, todoModel };

export default models;