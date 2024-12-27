import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/app/db'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const users = await query('SELECT * FROM users WHERE email = ?', [email]) as any[]
    const user = users[0]

    if (user && await bcrypt.compare(password, user.password)) {
      // Don't include the password in the response
      const { password, ...userWithoutPassword } = user
      return NextResponse.json({ 
        message: 'Login successful',
        user: userWithoutPassword
      })
    } else {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 })
  }
}

