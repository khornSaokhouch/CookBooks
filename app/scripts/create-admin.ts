import bcrypt from 'bcrypt';
import { query } from '@/app/lib/db';

async function createAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'; // Use environment variable
  const adminPassword = process.env.ADMIN_PASSWORD || '123'; // Use environment variable
  const adminName = 'Admin';

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

  try {
    // Check if the admin user already exists
    const existingUser = await query('SELECT * FROM user WHERE email = ?', [adminEmail]) as any[];

    if (existingUser.length > 0) {
      // Update existing admin user
      await query('UPDATE user SET user_name = ?, password = ?, role = "Admin", status = "Active" WHERE email = ?', [adminName, hashedPassword, adminEmail]);
      console.log('Admin user updated successfully');
    } else {
      // Create new admin user
      await query('INSERT INTO user (user_name, email, password, role, status) VALUES (?, ?, ?, "Admin", "Active")', [adminName, adminEmail, hashedPassword]);
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating/updating admin user:', error);
  }
}

createAdminUser();
