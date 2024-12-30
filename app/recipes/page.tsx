// app/recipes/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminHeader from "@/app/components/AdminHeader";

export default async function RecipesPage() {
  const userCookie = cookies().get("user");

  if (!userCookie) {
    redirect("/login");
  }

  const user = JSON.parse(userCookie.value);

  if (!user.is_admin) {
    redirect("/"); // Redirect non-admin users to homepage
  }

  return (
    <AdminHeader user={user} activePage="recipes">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6">Recipes</h1>
        {/* List of recipes or other content here */}
      </div>
    </AdminHeader>
  );
}
