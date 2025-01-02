import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RecipesPage() {
  const userCookie = cookies().get("user");

  if (!userCookie) {
    redirect("/login");
  }

  const user = JSON.parse(userCookie.value);

  if (!user.is_admin) {
    redirect("/");
  }

  const categories = [
    { name: "Soup", image: "/soup.png" },
    { name: "Stir fries", image: "/burger.png" },
    { name: "Drinks", image: "/drinks.png" },
    { name: "Desserts", image: "/salad.png" },
  ];

  const occasions = [
    { name: "Birthday", image: "/salad.png" },
    { name: "Pchum Ben", image: "/drinks.png" },
    { name: "Luna New Year", image: "/burger.png" },
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
            {[
              { href: "/", label: "Home", icon: "home" },
              { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
              { href: "/users", label: "Users", icon: "people" },
              { href: "/recipes", label: "Recipes", icon: "restaurant_menu", active: true },
              { href: "/events", label: "Events", icon: "event" },
            ].map(({ href, label, icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    href === "/recipes"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="material-icons mr-3">{icon}</span>
                  {label}
                </a>
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
            {/* Replace the default profile image with the uploaded image */}
            <img
              src="/profile.png" // Change this to the correct filename if needed
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">{user.name}</span>
          </div>
        </header>

        <div className="bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Recipes Management</h1>
        <p className="text-gray-600">
          Manage recipes here. Add, edit, or remove recipes from the system.
        </p>
      </header>

      {/* Recipe Category Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recipe Category</h2>
        <div className="grid grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-center mb-2">
                {category.name}
              </h3>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg block mx-auto">
                View
              </button>
            </div>
          ))}
          <div className="flex items-center justify-center bg-gray-100 p-6 rounded-lg border-dashed border-2 border-gray-300">
            <button className="text-orange-500 text-lg font-medium">+ Add Category</button>
          </div>
        </div>
      </section>

      {/* Occasion Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Occasion</h2>
        <div className="grid grid-cols-4 gap-6">
          {occasions.map((occasion) => (
            <div
              key={occasion.name}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={occasion.image}
                alt={occasion.name}
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-center mb-2">
                {occasion.name}
              </h3>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg block mx-auto">
                View
              </button>
            </div>
          ))}
          <div className="flex items-center justify-center bg-gray-100 p-6 rounded-lg border-dashed border-2 border-gray-300">
            <button className="text-orange-500 text-lg font-medium">+ Add Occasion</button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Events</h2>
        <div className="grid grid-cols-4 gap-6">
          {occasions.map((event) => (
            <div
              key={event.name}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-center mb-2">
                {event.name}
              </h3>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg block mx-auto">
                View
              </button>
            </div>
          ))}
          <div className="flex items-center justify-center bg-gray-100 p-6 rounded-lg border-dashed border-2 border-gray-300">
            <button className="text-orange-500 text-lg font-medium">+ Add Event</button>
          </div>
        </div>
      </section>
    </div>

      </main>
    </div>
  );
}
