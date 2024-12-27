// app/users/page.tsx

import { Metadata } from 'next';
import { query } from '@/app/db'; // Import the query function
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'User Management',
  description: 'Manage your users',
};

const UsersPage = async () => {
  let users = [];

  try {
    users = await query('SELECT * FROM users'); // Fetching user data
  } catch (error) {
    console.error('Database error:', error);
  }

  return (
    <div className="container mx-auto bg-white rounded-lg shadow-md p-6 mt-5">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter..."
          className="border p-2 rounded"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">User Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Password</th>
            <th className="py-2 px-4 border">Date Created</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border">{user.id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.password}</td>
              <td className="py-2 px-4 border">{new Date(user.date_created).toLocaleDateString()}</td>
              <td className="py-2 px-4 border">{user.role}</td>
              <td className="py-2 px-4 border">{user.status}</td>
              <td className="py-2 px-4 border">
                <Link href={`/users/edit/${user.id}`}>
                  <a className="text-blue-500 hover:underline">Edit</a>
                </Link>
                &nbsp;|&nbsp;
                <Link href={`/users/delete/${user.id}`}>
                  <a className="text-red-500 hover:underline">Delete</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4">
        <nav>
          <ul className="flex list-none">
            <li className="mr-2"><a className="border p-2 rounded" href="#">1</a></li>
            <li className="mr-2"><a className="border p-2 rounded" href="#">2</a></li>
            <li className="mr-2"><a className="border p-2 rounded" href="#">3</a></li>
            {/* Add more pagination items as needed */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UsersPage;