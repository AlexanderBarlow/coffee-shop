import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  cart: {
    product: string; // Assuming 'product' is an ObjectId string
    quantity: number;
  }[];
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

const User = model<IUser>('User', userSchema);

export default User;
