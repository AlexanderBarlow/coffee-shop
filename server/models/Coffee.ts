import { Schema, model, Document } from 'mongoose';

interface ICoffee extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
}

const coffeeSchema = new Schema<ICoffee>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Coffee = model<ICoffee>('Coffee', coffeeSchema);

export default Coffee;
