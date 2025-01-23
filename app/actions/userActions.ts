'use server';

import { query } from '@/app/lib/db';

// Fetch user by ID
export async function getUserById(userId: number) {
  try {
    const rows = await query('SELECT * FROM user WHERE user_id = ?', [userId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data.');
  }
}

// Update user by ID
export async function updateUser(userId: number, userData: any) {
  try {
    const { user_name, email, about_me, image_url } = userData;

    // Check if the email already exists for another user (skip if it belongs to the same user)
    const existingUserWithEmail = await query(
      'SELECT * FROM user WHERE email = ? AND user_id != ?',
      [email, userId]
    );

    if (existingUserWithEmail.length > 0) {
      return { error: 'Email already exists. Please use a different email.' };
    }

    // Update user data
    await query(
      'UPDATE user SET user_name = ?, email = ?, about_me = ?, image_url = ? WHERE user_id = ?',
      [user_name, email, about_me, image_url, userId]
    );

    return { message: 'Profile updated successfully!' };
  } catch (error) {
    console.error('Error updating user data:', error);
    throw new Error('Failed to update user data.');
  }
}
