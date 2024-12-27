'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { query } from '@/app/db'
import bcrypt from 'bcrypt'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Check for admin credentials
  if (email === 'admin@gmail.com' && password === 'khouch1234') {
    cookies().set('user', JSON.stringify({
      id: 'admin',
      name: 'Admin',
      email: 'admin@gmail.com',
      is_admin: true
    }), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' })
    
    redirect('/dashboard')
  }

  // Regular user login process
  const users = await query('SELECT * FROM users WHERE email = ?', [email]) as any[]
  const user = users[0]

  if (user && await bcrypt.compare(password, user.password)) {
    cookies().set('user', JSON.stringify({
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      is_admin: user.is_admin
    }), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' })
    
    if (user.is_admin) {
      redirect('/dashboard')
    } else {
      redirect('/')
    }
  } else {
    return { error: 'Invalid email or password' }
  }
}

export async function register(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await query('INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, false])
    redirect('/login')
  } catch (error) {
    console.error('Registration error:', error)
    return { error: 'Registration failed. Please try again.' }
  }
}

export async function logout() {
  cookies().delete('user')
  redirect('/')
}

