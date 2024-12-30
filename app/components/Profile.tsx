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
      <h1 className="text-3xl font-bold mb-6 ml-[100px] ">My Profile</h1>
      <div className="flex justify-center space-x-8">
        {/* Sidebar */}
        <nav className="mt-8">
          <ul className="space-y-4">
            {[
              { href: "/", label: "Home", icon: "home", active: true  },
              { href: "/edit-profile", label: "Edit Profile", icon: "edit" },
              { href: "/my-recipes", label: "My Recipes", icon: "work"},
              { href: "/reset-password", label: "Reset Password", icon: "lock" },
              { href: "/save", label: "Save", icon: "save" },
            ].map(({ href, label, icon, active }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="material-icons mr-3">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Profile Information */}
        <div className="w-3/4 bg-white rounded-lg shadow-lg flex flex-col p-4">
          {user ? (
            <div className="flex items-center p-6">
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
          <h2 className="text-2xl font-semibold mt-4 px-10 ">About Me</h2>
          <p className="mt-2 text-center">
            Hello everyone, my name is {user?.name || 'User'}. It's a pleasure to meet you all! 
            A little bit about myself: I am [age] years old and currently work as [your job/occupation]. 
            In my free time, I enjoy {user?.hobbies && user.hobbies.length > 0 ? user.hobbies.join(', ') : 'various activities'}.
          </p>
          <p className="mt-2 ">
            I'm excited to be here today and look forward to the pleasure of interaction—getting to know everyone, 
            learning new things, and collaborating on projects. Please feel free to ask me any questions you may have— 
            I'm always happy to chat and share a bit more about myself.
          </p>
          <p className="mt-2 ">Thank you for your time, and I look forward to our discussions!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;