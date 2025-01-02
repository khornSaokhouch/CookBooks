// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { query } from "@/app/db";
import Link from "next/link";

async function getDashboardStats() {
  try {
    const [userCountResult, recipeCountResult] = await Promise.all([
      query("SELECT COUNT(*) as count FROM users", []),
      query("SELECT COUNT(*) as count FROM recipes", []),
    ]);

    return {
      userCount: userCountResult[0].count,
      recipeCount: recipeCountResult[0].count,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { userCount: 0, recipeCount: 0 };
  }
}

export default async function Dashboard() {
  const userCookie = cookies().get("user");

  if (!userCookie) {
    redirect("/login");
  }

  let user;
  try {
    user = JSON.parse(userCookie.value);
  } catch (e) {
    console.error("Error parsing user cookie:", e);
    redirect("/login");
  }

  if (!user.is_admin) {
    redirect("/");
  }

  const { userCount, recipeCount } = await getDashboardStats();

  const sidebarLinks = [
    { href: "/", label: "Home", icon: "home" },
    { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
    { href: "/users", label: "Users", icon: "people" },
    { href: "/recipes", label: "Recipes", icon: "restaurant_menu" },
    { href: "/events", label: "Events", icon: "event" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-center">
          <img src="/logo.png" alt="CookBook Logo" className="w-[90px] mx-auto" />
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            {sidebarLinks.map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    href === "/dashboard"
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
            className="border border-gray-300 rounded-lg w-full max-w-md px-4 py-2"
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

        {/* Dashboard Stats */}
        <section>
          <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-lg font-medium">Users</h2>
              <p className="text-3xl font-bold">{userCount}</p>
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-lg font-medium">Recipes</h2>
              <p className="text-3xl font-bold">{recipeCount}</p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto p-6">
      <header className="bg-gray-100 p-5 rounded-lg text-center">
        <h1 className="text-xl font-semibold">Hello, Austine Robertson</h1>
        <p className="text-gray-600">Get FREE delivery on every weekend.</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mr-2 hover:bg-blue-600">+ Post Events</button>
        <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded mt-4 hover:bg-blue-500 hover:text-white">Check Events</button>
      </header>
      
      <section className="my-8">
        <h2 className="text-lg font-semibold mb-4">Recipe Category</h2>
        <div className="flex justify-center gap-4">
          <div className="bg-gray-200 p-3 rounded text-center">Soup</div>
          <div className="bg-gray-200 p-3 rounded text-center">Stir fries</div>
          <div className="bg-gray-200 p-3 rounded text-center">Drinks</div>
          <div className="bg-gray-200 p-3 rounded text-center">Desserts</div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Occasion</h2>
        <div className="flex justify-center gap-4">
          <div className="bg-gray-200 p-3 rounded text-center">Birthday</div>
          <div className="bg-gray-200 p-3 rounded text-center">Phchum ben</div>
          <div className="bg-gray-200 p-3 rounded text-center">Luna New Year</div>
        </div>
      </section>
    </div>

      </main>
    </div>
  );
}
