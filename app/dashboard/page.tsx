import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { query } from "@/app/db";
import Link from "next/link";

// Consolidated database calls into one function for efficiency
async function getDashboardStats() {
  const [userCountResult, recipeCountResult] = await Promise.all([
    query("SELECT COUNT(*) as count FROM users", []),
    query("SELECT COUNT(*) as count FROM recipes", []),
  ]);

  return {
    userCount: userCountResult[0].count,
    recipeCount: recipeCountResult[0].count,
  };
}

export default async function DashboardPage() {
  const userCookie = cookies().get("user");

  if (!userCookie) {
    redirect("/login");
  }

  const user = JSON.parse(userCookie.value);

  if (!user.is_admin) {
    redirect("/");
  }

  const { userCount, recipeCount } = await getDashboardStats();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-center">
          <img
            src="/logo.png"
            alt="CookBook Logo"
            className="w-[90px] mx-auto"
          />
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            {[
              { href: "/", label: "Home", icon: "home" },
              { href: "/dashboard", label: "Dashboard", icon: "dashboard", active: true },
              { href: "/users", label: "Users", icon: "people" },
              { href: "/recipes", label: "Recipes", icon: "restaurant_menu" },
              { href: "/events", label: "Events", icon: "event" },
            ].map(({ href, label, icon, active }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="material-icons mr-3">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <header className="flex items-center justify-between mb-8">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-[250px] py-2 m-auto"
          />
          <div className="flex items-center space-x-4">
            <img
              src="/profile.png"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">{user.name}</span>
          </div>
        </header>

        {/* Welcome Banner */}
        <section
          className="relative bg-cover bg-center rounded-lg shadow-md p-8 mb-8"
          style={{ backgroundImage: "url('/banner.png')" }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Hello, {user.name}
          </h1>
          <p className="text-white mb-4">Get FREE delivery on every weekend.</p>
          <div className="flex space-x-4">
            <Link href="/post-event">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                aria-label="Post Events"
              >
                + Post Events
              </button>
            </Link>
            <Link href="/events">
              <button
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
                aria-label="Check Events"
              >
                Check Events
              </button>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 gap-6 mb-8">
          {[
            { label: "Total Users", value: userCount },
            { label: "Total Recipes", value: recipeCount },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white shadow-md rounded-lg p-6 text-center"
            >
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </section>

        {/* Recipe Categories & Occasions */}
        <section className="grid grid-cols-2 gap-8">
          {/* Recipe Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recipe Categories</h2>
              <Link href="/categories" className="text-blue-600">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Soup", image: "/soup.png" },
                { name: "Drinks", image: "/drinks.png" },
                { name: "Drinks", image: "/drinks.png" },
                { name: "Drinks", image: "/drinks.png" },
                { name: "Drinks", image: "/drinks.png" },
                { name: "Drinks", image: "/drinks.png" },
              ].map(({ name, image }) => (
                <div
                  key={name}
                  className="bg-white rounded-lg shadow-md p-4 text-center"
                >
                  <img
                    src={image}
                    alt={name}
                    className="w-16 h-16 mx-auto mb-2"
                  />
                  <p className="font-medium">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Occasions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Occasions</h2>
              <Link href="/occasions" className="text-blue-600">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Birthday", image: "/soup.png" },
                { name: "Birthday", image: "/soup.png" },
                { name: "Birthday", image: "/soup.png" },
                { name: "Birthday", image: "/soup.png" },
                { name: "Lunar New Year", image: "/drinks.png" },
              ].map(({ name, image }) => (
                <div
                  key={name}
                  className="bg-white rounded-lg shadow-md p-4 text-center"
                >
                  <img
                    src={image}
                    alt={name}
                    className="w-16 h-16 mx-auto mb-2"
                  />
                  <p className="font-medium">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
