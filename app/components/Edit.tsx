'use client'; // Add this line to designate the component as a Client Component

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface User {
  name: string;
  email: string;
  hobbies: string[];
}

const Edit: React.FC = () => {
  // State to hold user data
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Refs for form fields
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const aboutMeRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Get the user data from localStorage on the client side
    const userDataString = localStorage.getItem('user');
    const userData: User | null = userDataString ? JSON.parse(userDataString) : null;

    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []); // Empty dependency array to run only once when the component mounts

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get values from refs
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const aboutMe = aboutMeRef.current?.value;

    // Handle profile update logic here
    console.log({
      firstName,
      lastName,
      email,
      aboutMe,
    });
  };

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-bold mb-6 ml-[100px]">My Profile</h1>
      <div className="flex justify-center space-x-8">
        {/* Sidebar */}
        <nav className="mt-8">
          <ul className="space-y-4">
            {[ 
              { href: "/profile", label: "Home", icon: "home" },
              { href: "/edit-profile", label: "Edit Profile", icon: "edit", active: true },
              { href: "/my-recipes", label: "My Recipes", icon: "work" },
              { href: "/reset-password", label: "Reset Password", icon: "lock" },
              { href: "/save", label: "Save", icon: "save" },
            ].map(({ href, label, icon, active }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`}
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
          {loading ? (
            <p className="text-gray-700">Loading user information...</p>
          ) : user ? (
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
            <p className="text-gray-700">No user data available.</p>
          )}
          <h2 className="text-2xl font-semibold mt-4 px-10">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="px-10 py-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">First Name</label>
              <input
                type="text"
                ref={firstNameRef}
                className="w-full border border-gray-300 rounded-md p-2"
                required
                defaultValue={user?.name} // Pre-fill the form fields if user data exists
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Last Name</label>
              <input
                type="text"
                ref={lastNameRef}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                ref={emailRef}
                className="w-full border border-gray-300 rounded-md p-2"
                required
                defaultValue={user?.email} // Pre-fill email field
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">About Me</label>
              <textarea
                ref={aboutMeRef}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Tell us about yourself"
                rows={4}
                defaultValue={user ? 'Your current description goes here' : ''} // Pre-fill About Me field
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
