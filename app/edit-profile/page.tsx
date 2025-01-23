import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Edit from "../components/Edit";

export default async function EditProfile() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  return (
    <div>
      <Navbar user={user} />
      {/* Other components go here */}
      <Edit />
      <Footer />
    </div>
  );
}
