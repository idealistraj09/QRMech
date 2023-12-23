// pages/api/fetchUserData.js

import mongoose from 'mongoose';
import { Users } from './user';

export default async function handler(req, res) {
  try {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(Users); 
    const users = await Users.find({ username: 'duqidij' });

    await mongoose.disconnect();

    res.status(200).send(users);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send({ error: 'Error fetching data' });
  }
}
