import { findUserById, findUserByUsername } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();
  const user = await findUserByUsername(db, req.query.username);
  res.json({ user });
});

export default handler;
