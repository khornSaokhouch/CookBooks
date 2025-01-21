'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { query } from '@/app/db';
import bcrypt from 'bcrypt';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  console.log('Login attempt:', { email, password }); // Debug log

  if (!email || !password) {
    console.log('Email and password are required.'); // Debug log
    return { error: 'Email and password are required.' };
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log('Admin credentials are not configured.'); // Debug log
    return { error: 'Admin credentials are not configured.' };
  }

  // Admin login
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    console.log('Admin login successful.'); // Debug log
    try {
      await cookies().set('user', JSON.stringify({
        id: 'admin',
        user_name: 'Admin',
        email: ADMIN_EMAIL,
        role: 'Admin',
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      console.log('Admin cookie set successfully.'); // Debug log
      return redirect('/dashboard');
    } catch (error) {
      console.error('Failed to set admin cookie:', error); // Debug log
      return { error: 'Failed to set admin cookie. Please try again.' };
    }
  }

  // Regular user login
  let user;
  try {
    console.log('Fetching user from database...'); // Debug log
    const users = await query('SELECT * FROM user WHERE email = ?', [email]) as any[];
    console.log('Query result:', users); // Debug log
    user = users[0];

    if (!user) {
      console.log('User not found.'); // Debug log
      return { error: 'User not found.' };
    }

    console.log('User found:', user); // Debug log
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Invalid password.'); // Debug log
      return { error: 'Invalid password.' };
    }

    console.log('Password match successful.'); // Debug log
    try {
      await cookies().set('user', JSON.stringify({
        id: user.user_id.toString(),
        user_name: user.user_name,
        email: user.email,
        role: user.role,
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      console.log('Cookie set successfully.'); // Debug log
    } catch (error) {
      console.error('Failed to set cookie:', error); // Debug log
      return { error: 'Failed to set cookie. Please try again.' };
    }
  } catch (error) {
    console.error('Login error:', error); // Debug log
    return { error: 'An error occurred during login. Please try again.' };
  }

  // Redirect based on user role
  if (user.role === 'Admin') {
    console.log('Redirecting to /dashboard'); // Debug log
    return redirect('/dashboard');
  } else {
    console.log('Redirecting to /'); // Debug log
    return redirect('/');
  }
}

export async function register(formData: FormData) {
  const user_name = formData.get('name') as string; // Use `user_name` instead of `name`
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  console.log('Registration attempt:', { user_name, email, password }); // Debug log

  if (!user_name || !email || !password) {
    console.log('All fields are required.'); // Debug log
    return { error: 'All fields are required.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    console.log('Checking if email already exists...'); // Debug log
    const existingUser = await query('SELECT * FROM user WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      console.log('Email already exists.'); // Debug log
      return { error: 'Email already exists. Please use a different email.' };
    }

    console.log('Inserting new user into the database...'); // Debug log
    await query(
      'INSERT INTO user (user_name, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)',
      [user_name, email, hashedPassword, 'User', true]
    );

    console.log('Registration successful.'); // Debug log
    return { success: true };
  } catch (error) {
    console.error('Registration error:', error); // Debug log
    return { error: 'Registration failed. Please try again.' };
  }
}

export async function logout() {
  const user = cookies().get('user');
  if (!user) {
    return redirect('/');
  }

  cookies().delete('user');
  return redirect('/');
}