import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  email: { required: true, type: String },
  phone: { required: true, type: Number },
  password: { required: true, type: String },
});

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;
