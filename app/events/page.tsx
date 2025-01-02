// app/events/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function EventsPage() {
  const userCookie = cookies().get("user");

  if (!userCookie) {
    redirect("/login");
  }

  const user = JSON.parse(userCookie.value);

  if (!user.is_admin) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-center">
          <img src="/logo.png" alt="CookBook Logo" className="w-[90px] mx-auto" />
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            {[{ href: "/", label: "Home", icon: "home" },
              { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
              { href: "/users", label: "Users", icon: "people" },
              { href: "/recipes", label: "Recipes", icon: "restaurant_menu" },
              { href: "/events", label: "Events", icon: "event", active: true }].map(
              ({ href, label, icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={`flex items-center px-6 py-3 rounded-lg ${
                      href === "/events"
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
        <h1 className="text-2xl font-semibold mb-4">Events Management</h1>
        <p>Manage events here. This section will allow you to create, update, or delete events.</p>
      </main>
    </div>
  );
}
