import Link from "next/link";
import { cookies } from "next/headers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Card from "./components/card/Card"; // Make sure the path is correct
import BannerSwiper from "./components/slider";

export default async function HomePage() {
  const cookieStore = cookies(); // Await the cookies() API
  const userCookie = cookieStore.get("user")?.value; // Use the cookie store to get the user cookie
  const user = userCookie ? JSON.parse(userCookie) : null;

  const recipes = [
    {
      title: "Egg Fried Rice",
      cookingTime: "15 mins",
      rating: 4,
      image:
        "https://cdn.loveandlemons.com/wp-content/uploads/2024/07/ratatouille.jpg",
    },
    {
      title: "Spaghetti Carbonara",
      cookingTime: "20 mins",
      rating: 5,
      image: "https://i.ibb.co/8BKXgw3/b003.jpg",
    },
    {
      title: "Chicken Curry",
      cookingTime: "30 mins",
      rating: 4,
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
    },
    {
      title: "Beef Tacos",
      cookingTime: "25 mins",
      rating: 5,
      image: "https://www.recipetineats.com/tachyon/2024/12/Thai-sweet-chilli-beef-bowls_0.jpg?resize=450%2C450",
    },
    {
      title: "Caesar Salad",
      cookingTime: "10 mins",
      rating: 3,
      image: "https://www.allrecipes.com/thmb/xvlRRhK5ldXuGcXad8XDM5tTAfE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/223382_chicken-stir-fry_Rita-1x1-1-b6b835ccfc714bb6a8391a7c47a06a84.jpg",
    },
    {
      title: "Vegetable Stir Fry",
      cookingTime: "15 mins",
      rating: 4,
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/01/quesadilla-recipe.jpg",
    },
    {
      title: "Mushroom Risotto",
      cookingTime: "40 mins",
      rating: 5,
      image: "https://pinchofyum.com/wp-content/uploads/Honey-Chipotle-Chicken-Skewers-800x800.jpg",
    },
    {
      title: "Fish Tacos",
      cookingTime: "20 mins",
      rating: 4,
      image: "https://www.spendwithpennies.com/wp-content/uploads/2022/12/1200-The-Best-Meatloaf-Recipe-SpendWithPennies.jpg",
    },
    {
      title: "Caesar Salad",
      cookingTime: "10 mins",
      rating: 3,
      image: "https://www.allrecipes.com/thmb/xvlRRhK5ldXuGcXad8XDM5tTAfE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/223382_chicken-stir-fry_Rita-1x1-1-b6b835ccfc714bb6a8391a7c47a06a84.jpg",
    },
    {
      title: "Vegetable Stir Fry",
      cookingTime: "15 mins",
      rating: 4,
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/01/quesadilla-recipe.jpg",
    },
    {
      title: "Mushroom Risotto",
      cookingTime: "40 mins",
      rating: 5,
      image: "https://pinchofyum.com/wp-content/uploads/Honey-Chipotle-Chicken-Skewers-800x800.jpg",
    },
    {
      title: "Fish Tacos",
      cookingTime: "20 mins",
      rating: 4,
      image: "https://www.spendwithpennies.com/wp-content/uploads/2022/12/1200-The-Best-Meatloaf-Recipe-SpendWithPennies.jpg",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="px-20 rounded-3xl"><BannerSwiper /></div>

      <div className=" p-4 flex justify-between items-center max-w-6xl mx-auto ">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-4">New Post</h1>
          <p className="text-gray-600">
            Satisfy your cravings in a flash! Explore our Quick & Easy Meals for
            effortless recipes without compromising on mouthwatering taste.
          </p>
        </div>
        <Link href="/recipes" className="text-blue-600 hover:underline">
          View All Recipes
        </Link>
      </div>
      <div className="flex flex-col items-center bg-white py-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto ">
          {recipes.map((recipe, index) => (
            <Card key={index} {...recipe} />
          ))}
        </div>
      </div>

      <div className=" p-4 flex justify-between items-center max-w-6xl mx-auto ">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-4">Most Recipe Of The Week</h1>
          <p className="text-gray-600">
            Satisfy your cravings in a flash! Explore our Quick & Easy Meals for
            effortless recipes without compromising on mouthwatering taste.
          </p>
        </div>
        <Link href="/recipes" className="text-blue-600 hover:underline">
          View All Recipes
        </Link>
      </div>
      <div className="flex flex-col items-center bg-white py-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {recipes.map((recipe, index) => (
            <Card key={index} {...recipe} />
          ))}
        </div>
      </div>

      <div className=" p-4 flex justify-between items-center max-w-6xl mx-auto ">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-4">All Recipes</h1>
          <p className="text-gray-600">
            Satisfy your cravings in a flash! Explore our Quick & Easy Meals for
            effortless recipes without compromising on mouthwatering taste.
          </p>
        </div>
        <Link href="/recipes" className="text-blue-600 hover:underline">
          View All Recipes
        </Link>
      </div>
      <div className="flex flex-col items-center bg-white py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {recipes.map((recipe, index) => (
            <Card key={index} {...recipe} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}