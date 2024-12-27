import bcrypt from 'bcrypt'
import { query } from '@/app/db'

async function createAdminUser() {
  const adminEmail = 'admin@gmail.com' // Replace with your admin email
  const adminPassword = 'khouch1234' // Replace with your chosen strong password
  const adminName = 'Admin'

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(adminPassword, saltRounds)

  try {
    // Check if the admin user already exists
    const existingUser = await query('SELECT * FROM users WHERE email = ?', [adminEmail]) as any[]

    if (existingUser.length > 0) {
      // Update existing admin user
      await query('UPDATE users SET name = ?, password = ?, is_admin = TRUE WHERE email = ?', [adminName, hashedPassword, adminEmail])
      console.log('Admin user updated successfully')
    } else {
      // Create new admin user
      await query('INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, TRUE)', [adminName, adminEmail, hashedPassword])
      console.log('Admin user created successfully')
    }
  } catch (error) {
    console.error('Error creating/updating admin user:', error)
  }
}

createAdminUser()

