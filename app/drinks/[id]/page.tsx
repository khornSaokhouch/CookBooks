'use client';

import React, { useEffect, useState } from 'react';
import { getDrinkRecipeById } from '@/app/actions/drinkActions';
import { useParams } from 'next/navigation';
import { FaStar } from 'react-icons/fa';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

interface Recipe {
  recipe_id: number;
  recipe_name: string;
  description: string;
  prep_time: number;
  cook_time: number;
  image_url: string;
  rating: number;
  ingredients: string;
  author: string;
  date: string;
}

const DrinkPage: React.FC = () => {
  const { id: recipeId } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchDrinkRecipe = async () => {
      try {
        const data = await getDrinkRecipeById(Number(recipeId)); // Convert to number if needed
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching drink recipe:', error);
        setError('Failed to load recipe.'); // Set error message
      }
    };

    if (recipeId) {
      fetchDrinkRecipe();
    }
  }, [recipeId]);

  if (error) {
    return <p>{error}</p>; // Show error message if there's an error
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar user={null} /> {/* Pass user prop if available */}
      <div className="p-8 bg-gray-100 min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">{recipe.recipe_name}</h1>
          <div className="flex justify-center items-center mt-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={`h-5 w-5 ${index < recipe.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({recipe.rating})</span>
            </div>
            <span className="mx-4 text-gray-600">by {recipe.author}</span>
            <span className="text-gray-600">{recipe.date}</span>
          </div>
          <div className="mt-4">
            <button className="mr-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Save
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Rate
            </button>
          </div>
        </div>

        {/* Main Image Section */}
        <div className="flex justify-center mb-8">
          <img
            className="w-full max-w-xl h-auto rounded-lg shadow-lg"
            src={recipe.image_url}
            alt={recipe.recipe_name}
          />
        </div>

        {/* Overview Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 mb-4">{recipe.description}</p>

          <h3 className="text-xl font-semibold mb-2">Prep Time</h3>
          <p className="text-gray-700 mb-4">{recipe.prep_time} mins</p>

          <h3 className="text-xl font-semibold mb-2">Cook Time</h3>
          <p className="text-gray-700 mb-4">{recipe.cook_time} mins</p>

          <h3 className="text-xl font-semibold mb-2">Total Time</h3>
          <p className="text-gray-700 mb-4">{recipe.prep_time + recipe.cook_time} mins</p>

          <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc list-inside mb-4">
            {recipe.ingredients.split(',').map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient.trim()}</li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DrinkPage;