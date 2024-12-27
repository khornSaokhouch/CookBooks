import Link from 'next/link'
import { cookies } from 'next/headers'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import '@fortawesome/fontawesome-free/css/all.min.css';



export default function HomePage() {
  const userCookie = cookies().get('user')?.value
  const user = userCookie ? JSON.parse(userCookie) : null


  return (
    <div>
      <Navbar />
      <Footer />
    </div>
  )
}

