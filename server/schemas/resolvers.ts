import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../utils/auth';
import  User, { IUser } from '../models/User';
import Coffee, { ICoffee } from '../models/Coffee';

const resolvers = {
  Query: {
    profiles: async (): Promise<IUser[]> => {
      const allProfiles = await User.find();
      console.log(allProfiles);
      return allProfiles;
    },

    profile: async (_: any, { profileId }: { profileId: string }): Promise<IUser | null> => {
      return await User.findOne({ _id: profileId });
    },
    items: async (): Promise<ICoffee[]> => {
      return await Coffee.find();
    },
    item: async (_: any, { itemId }: { itemId: string }): Promise<ICoffee | null> => {
      return await Coffee.findOne({ _id: itemId });
    },
  },

  Mutation: {
    addProfile: async (_: any, { email, password }: { email: string; password: string }) => {
      const profile = await User.create({ email, password });
      const token = signToken(profile);
      return { token, profile };
    },

    removeProfile: async (_: any, { profileId }: { profileId: string }) => {
      return User.findOneAndDelete({ _id: profileId });
    },

    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile found with this email address");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(profile);

      return { token, profile };
    },

    addItem: async (
      _: any,
      { itemName, description, itemPrice, city }: { itemName: string; description: string; itemPrice: number; city: string }
    ) => {
      console.log({ itemName, description, itemPrice, city });
      const newItem = await Coffee.create({
        itemName,
        description,
        itemPrice,
        city,
      });
      return newItem;
    },
  },
};

export default resolvers;
