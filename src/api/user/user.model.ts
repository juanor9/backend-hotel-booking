import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  role: 'USER' | 'ADMIN';
  name: string;
  email: string;
  password: string;
  profilePic?: string;
  birthday: Date;
  gender?: string;
  address?: string;
  city?: string;
  zipCode?: number;
  payingMethods?: [Object];
  createdAt: Date;
  updatedAt: Date;
}

const payingMethodsSchema = new Schema({
  accounNumber: {
    type: Number,
    unique: true,
  },
  cardFranchise: {
    type: String,
  }
})

const UserSchema = new Schema ({
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
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
    required: true,
  },
  gender: {
    type: String,
    enum: ['female', 'masculine', 'other'],
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
    }
  ],
}, {
  timestamps: true,
})

UserSchema.pre('save', async function save(next: Function) {
  const user = this as UserDocument;

  try {
    if(!user.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    next(error);
  }
})

const User = model<UserDocument>('User', UserSchema);

export default User;
