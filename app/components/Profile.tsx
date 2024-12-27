// components/Profile.tsx
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';

interface User {
  name: string;
  email: string;
  hobbies: string[];
}

const Profile: React.FC = async () => {
  // Await the cookies() call to get user data
  const userCookie = await cookies().get('user');
  const user: User | null = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="flex space-x-8">
        {/* Sidebar */}
        <div className="w-1/4 py-5">
          <ul className="list-none pl-0 bg-white rounded-lg p-4 shadow-md">
            <li className="mb-2">
              <Link href="/edit-profile" className="block text-blue-600  p-2 rounded hover:bg-slate-300">
                Edit My Profile
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/my-recipes" className="block text-blue-600  p-2 rounded hover:bg-slate-300">
                My Recipes
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/save" className="block text-blue-600  p-2 rounded hover:bg-slate-300">
                Save
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/reset-password" className="block text-blue-600  p-2 rounded hover:bg-slate-300">
                Reset Password
              </Link>
            </li>
            <li>
              <Link href="/log-out" className="block text-blue-600  p-2 rounded hover:bg-slate-300">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
        {/* Profile Information */}
        <div className="w-3/4 bg-white rounded-lg shadow-lg p-4">
          {user ? (
            <div className="flex items-center mb-6">
              <Image
                src="/profile.png" // Replace with the path to the user's image
                alt="User Avatar"
                width={100}
                height={100}
                className="rounded-full border-2 border-blue-500"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">Loading user information...</p>
          )}
          <h2 className="text-lg font-semibold mt-4">About Me</h2>
          <p className="mt-2">
            Hello everyone, my name is {user?.name || 'User'}. It's a pleasure to meet you all! 
            A little bit about myself: I am [age] years old and currently work as [your job/occupation]. 
            In my free time, I enjoy {user?.hobbies && user.hobbies.length > 0 ? user.hobbies.join(', ') : 'various activities'}.
          </p>
          <p className="mt-2">
            I'm excited to be here today and look forward to the pleasure of interaction—getting to know everyone, 
            learning new things, and collaborating on projects. Please feel free to ask me any questions you may have— 
            I'm always happy to chat and share a bit more about myself.
          </p>
          <p className="mt-2">Thank you for your time, and I look forward to our discussions!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;