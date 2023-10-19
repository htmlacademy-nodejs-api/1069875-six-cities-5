import { Document, Schema, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 15,
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    require: true,
  },
  avatarUrl: String,
  isPro: {
    type: Boolean,
    require: true,
  },
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
