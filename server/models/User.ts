import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  password: string;
  cart: {
    product: string; // Assuming 'product' is an ObjectId string
    quantity: number;
  }[];
  isCorrectPassword: (password: string) => Promise<boolean>; // Declare the method
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId, // Assuming 'product' references 'Coffee'
        ref: 'Coffee',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
