'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { query } from '@/app/db'
import bcrypt from 'bcrypt'

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Admin credentials (store securely in environment variables)
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'khouch1234';

  // Check admin credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    await cookies().set('user', JSON.stringify({
      id: 'admin',
      name: 'Admin',
      email: ADMIN_EMAIL,
      is_admin: true,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week expiration
    });

    // Return success response
    return { success: true, redirect: '/dashboard' };
  }

  try {
    // Fetch user from the database
    const users = await query('SELECT * FROM users WHERE email = ?', [email]) as any[];
    const user = users[0];

    // Check if user exists and password is correct
    if (user && await bcrypt.compare(password, user.password)) {
      await cookies().set('user', JSON.stringify({
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week expiration
      });

      // Return success response with redirect path
      return { success: true, redirect: user.is_admin ? '/dashboard' : '/' };
    } else {
      // Invalid email or password
      return { error: 'Invalid email or password' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An error occurred during login. Please try again.' };
  }
}

export async function register(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return { error: 'All fields are required.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if email already exists
    const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return { error: 'Email already exists. Please use a different email.' };
    }

    // Insert new user
    await query('INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)', [
      name,
      email,
      hashedPassword,
      false,
    ]);

    // Return success response
    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Registration failed. Please try again.' };
  }
}

export async function logout() {
  cookies().delete('user')
  return redirect('/')
}