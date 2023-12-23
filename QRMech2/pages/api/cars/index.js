// Example code for handling the /api/cars endpoint in Next.js API route
// This assumes you have a MongoDB database connected and a 'Car' model/schema

import { getMongoDb } from '@/api-lib/mongodb';
import { slugUsername } from '@/lib/user';
import cars from '../user'
const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username } = req.query;
  console.log(username);
  try {
    // Connect to your database (assuming you have a db connection utility)
    await getMongoDb();
    
    // Fetch car details based on the provided username
    const cars = await cars.find({ username: 'duqidij' }).exec();
    
    console.log(cars);
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export default handler;
