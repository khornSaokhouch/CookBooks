// app/users/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UsersPage() {
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
              { href: "/users", label: "Users", icon: "people", active: true },
              { href: "/recipes", label: "Recipes", icon: "restaurant_menu" },
              { href: "/events", label: "Events", icon: "event" }].map(
              ({ href, label, icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={`flex items-center px-6 py-3 rounded-lg ${
                      href === "/users"
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
            <img
              src="/profile.png"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">{user.name}</span>
          </div>
        </header>

        
        <h1 className="text-2xl font-semibold mb-4">Users Management</h1>
        <p>Manage users here. This section will allow you to add, edit, or remove users in the system.</p>

         {/* Events Table */}
         <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Password</th>
                <th className="py-3 px-6 text-left">Date Created</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {[
                { id: '001451', name: 'Chan Ratha', email: 'vibolsen2002@gmail.com', password: '6084er01', dateCreated: '13/06/2023', role: 'Admin', status: 'Available' },
                { id: '001452', name: 'Chan Ratha', email: 'vibolsen2002@gmail.com', password: '6084er01', dateCreated: '13/06/2023', role: 'User', status: 'Banned' },
                // Add more rows as needed
              ].map((event) => (
                <tr key={event.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{event.id}</td>
                  <td className="py-3 px-6 text-left">{event.name}</td>
                  <td className="py-3 px-6 text-left">{event.email}</td>
                  <td className="py-3 px-6 text-left">{event.password}</td>
                  <td className="py-3 px-6 text-left">{event.dateCreated}</td>
                  <td className="py-3 px-6 text-left">{event.role}</td>
                  <td className="py-3 px-6 text-left">{event.status}</td>
                  <td className="py-3 px-6 text-left">
                    <a href="#" className="text-blue-600 hover:underline">Edit</a>
                    <span className="mx-2">|</span>
                    <a href="#" className="text-red-600 hover:underline">Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
