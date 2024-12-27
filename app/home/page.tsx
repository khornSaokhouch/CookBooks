import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { logout } from '@/app/actions'

export default async function HomePage() {
  const userId = cookies().get('user')?.value

  if (!userId) {
    redirect('/home')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your Cookbook</h1>
        <p className="mb-4">This is your personal cookbook. You can add, edit, and view your recipes here.</p>
        <form action={logout}>
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  )
}

