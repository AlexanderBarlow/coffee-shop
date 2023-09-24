import { Schema, model, } from 'mongoose';
import mongoose, { Document, Model } from 'mongoose';

export interface ICoffee extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
}

const coffeeSchema = new mongoose.Schema<ICoffee>({
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

interface CoffeeModel extends Model<ICoffee> {}

// Create and export the Coffee model based on the schema
const Coffee = mongoose.model<ICoffee, CoffeeModel>('Coffee', coffeeSchema);

export default Coffee;
