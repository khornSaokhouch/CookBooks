import Link from "next/link";
import { cookies } from "next/headers";
import { logout } from "@/app/actions";

export default async function Navbar() {
  const userCookie = await cookies().get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;
  const isLoggedIn = userCookie !== undefined; // Adjust this based on how you store user inf

  return (
    <div className="div">
      <nav className="shadow-md">
        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[110px]">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="CookBook Logo"
                  className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-contain "
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-10 text-lg">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="/recipe"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Recipe
              </Link>
              <Link
                href="/about-us"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                About Us
              </Link>
            </div>

            {/* Right Section - Search Bar and Profile/Login */}
            <div className="flex items-center space-x-20">
              {/* Search Bar */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="border border-gray-500 rounded-full pl-4 pr-10 py-3 text-sm"
                  placeholder="Search by name"
                />
              </div>

              {/* Add Recipe Button */}
              <Link
                href={isLoggedIn ? "/add-recipe" : "/login"}
                className="text-lg font-medium text-blue-600 hover:text-blue-800"
              >
                + Add a Recipe
              </Link>

              {/* Profile or Login Button */}
              <div className="flex items-center space-x-4">
                {user && (
                  <>
                    {/* Save/Favorites Button - Only for Logged-in Users */}
                    <Link href="/save" className="hover:text-gray-700">
                      <span className="material-icons text-gray-600 w-5 h-5">
                        bookmark_border
                      </span>
                    </Link>

                    {/* Profile Avatar */}
                    <Link href="/profile">
                      <img
                        src={user.avatar || "/default-avatar.png"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-300"
                      />
                    </Link>

                    {/* Logout Button */}
                    <form action={logout} method="POST">
                      <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition"
                      >
                        Logout
                      </button>
                    </form>
                  </>
                )}

                {!user && (
                  // Login Button for Guests
                  <Link
                    href="/login"
                    className="bg-blue-500 text-white px-4 py-2 rounded-full text-lg hover:bg-blue-600 transition"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="text-lg ">
        <ul className="space-x-10 ml-[180px] py-4 ">
          <Link
            href="/event"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Event
          </Link>
          <Link
            href="/popular"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Popular
          </Link>
          <Link
            href="/soup"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Soup
          </Link>
          <Link
            href="/stir-frieds"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Stir Frieds
          </Link>
          <Link
            href="/occasions"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Occasions
          </Link>
          <Link
            href="/drinks"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Drinks
          </Link>
          <Link
            href="/dessert"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Dessert
          </Link>
        </ul>
      </div>
    </div>
  );
}
