import { Schema, model, Document } from "mongoose";
import { userProfileType } from "./user.types";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  role: "USER" | "ADMIN";
  name: string;
  email: string;
  password: string;
  profilePic?: string;
  birthday?: Date;
  gender?: string;
  address?: string;
  city?: string;
  zipCode?: number;
  payingMethods?: [Object];
  createdAt: Date;
  updatedAt: Date;

  profile: userProfileType;
  comparePassword: (password: string) => Promise<boolean>;

  emailConfirmToken?: String,
  emailConfirmExpires?: Date,
  isActive?:Boolean,
}

const payingMethodsSchema = new Schema({
  accounNumber: {
    type: Number,
    unique: true,
  },
  cardFranchise: {
    type: String,
  },
});

const UserSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    emailConfirmToken: String,
    emailConfirmExpires : Date,
    isActive:Boolean,
    password: {
      type: String,
      required: true,
      min: 10,
    },
    profilePic: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["female", "masculine", "other"],
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
    payingMethods: [
      {
        type: payingMethodsSchema,
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Middlewares
UserSchema.pre("save", async function save(next: Function) {
  const user = this as UserDocument;

  try {
    if (!user.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    next(error);
  }
});

// Virtuals
UserSchema.virtual('profile').get(function profile() {
  const {name, role, email, profilePic, birthday, gender, address, city, zipCode, payingMethods } = this;

  return {
    name, role, email, profilePic, birthday, gender, address, city, zipCode, payingMethods
  };

});

//Methods
async function comparePassword(
  this: UserDocument,
  candidatePassword: string,
  next: Function
): Promise<boolean> {
  const user = this;

  try {
    const match = await bcrypt.compare(candidatePassword, user.password);

    return match;
  } catch (error: any) {
    next(error);
    return false;
  }
}

UserSchema.methods.comparePassword = comparePassword;

const User = model<UserDocument>("User", UserSchema);

export default User;
