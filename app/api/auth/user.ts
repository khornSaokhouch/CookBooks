// pages/api/users.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.query('SELECT * FROM users');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ message: 'Database error', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}