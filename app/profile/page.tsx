import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Profile from "../components/Profile"

export default function profile () {
    return (
        <div>
            <Navbar />
            <div className="">
            <Profile/>
            </div>
            <Footer />
        </div>
    )
}