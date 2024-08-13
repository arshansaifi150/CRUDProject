import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { 
    type: Date,
    default: Date.now
  },
});

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User",userSchema)

export default User

