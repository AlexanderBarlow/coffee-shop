import * as mongoose from 'mongoose'; // Assuming you are using Mongoose

// Import your Profile and Item models with their corresponding types
import { User, Coffee } from '../models';

// Import your seed data with their corresponding types
import profileSeeds from './profileSeeds.json';
import itemSeeds from './itemSeed.json';

mongoose.connect('your-mongo-uri');

mongoose.connection.once('open', async () => {
  try {
    await User.deleteMany({});
    const allProfiles = await User.create(profileSeeds);

    await Coffee.deleteMany({});
    const allItems = await Coffee.create(itemSeeds);

    //  console.log(allProfiles);
    //  console.log(allItems);

    for (const item of allItems) {
      const person = allProfiles[Math.floor(Math.random() * allProfiles.length)];
      await User.findOneAndUpdate(
        { _id: person._id },
        { $addToSet: { rentable_items: item._id } }
      );
    }

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
