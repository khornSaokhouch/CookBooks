// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminHeader from "@/app/components/AdminHeader";
import { query } from "@/app/db";

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

export default async function DashboardPage() {
  const userCookie = cookies().get("user");

  if (!userCookie) {
    redirect("/login");
  }

  const user = JSON.parse(userCookie.value);

  if (!user.is_admin) {
    redirect("/"); // Redirect non-admin users to homepage
  }

  const { userCount, recipeCount } = await getDashboardStats();

  return (
    <AdminHeader user={user} activePage="dashboard">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <section className="grid grid-cols-2 gap-6 mb-8">
          {[{ label: "Total Users", value: userCount }, { label: "Total Recipes", value: recipeCount }].map(
            ({ label, value }) => (
              <div key={label} className="bg-white shadow-md rounded-lg p-6 text-center">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
              </div>
            )
          )}
        </section>
      </div>
    </AdminHeader>
  );
}
