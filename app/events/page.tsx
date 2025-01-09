// app/events/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { query } from "@/app/db";
import Link from "next/link";
import Image from "next/image";

// Fetch events from the database
async function getEvents() {
  try {
    const events = await query("SELECT * FROM events", []);
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const userCookie = cookies().get("user");

  // Redirect if user is not logged in
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

  // Redirect if user is not an admin
  if (!user.is_admin) {
    redirect("/");
  }

  // Fetch events from the database
  const events = await getEvents();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-center">
          <Image
            src="/logo.png"
            alt="CookBook Logo"
            width={90}
            height={90}
            className="mx-auto"
          />
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            {[
              { href: "/", label: "Home", icon: "home" },
              { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
              { href: "/users", label: "Users", icon: "people" },
              { href: "/recipes", label: "Recipes", icon: "restaurant_menu" },
              { href: "/events", label: "Events", icon: "event", active: true },
            ].map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    href === "/events"
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
            <Image
              src="/profile.png"
              alt="Admin Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-medium">{user.name}</span>
          </div>
        </header>

        <h1 className="text-2xl font-semibold mb-4">Events Management</h1>
        <p>Manage events here. This section will allow you to create, update, or delete events.</p>

        {/* Add Event Button */}
        <div className="flex mt-8 items-center justify-center bg-gray-100 p-6 rounded-lg border-dashed border-2 border-gray-300 w-[500px] h-[200px]">
          <Link
            href="/post-event"
            className="text-orange-500 text-lg font-medium"
          >
            + Add Event
          </Link>
        </div>

        {/* Events Table */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Events List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {events.map((event) => (
                  <tr key={event.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{event.id}</td>
                    <td className="py-3 px-6 text-left">{event.name}</td>
                    <td className="py-3 px-6 text-left">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-left">{event.description}</td>
                    <td className="py-3 px-6 text-left">
                      <Link
                        href={`/events/edit/${event.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <span className="mx-2">|</span>
                      <Link
                        href={`/events/delete/${event.id}`}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}