import mongoose, { Document, Schema } from "mongoose";

export enum Role {
  SUPER_ADMIN = "admin",
  REGULAR_USER = "user",
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

const UserSchema: Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Role,
    default: "user",
  },
});

export default mongoose.model<IUser>("User", UserSchema);
