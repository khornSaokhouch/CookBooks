import Link from "next/link";
import Image from "next/image";

// Rename the function to a valid identifier
export default function NotFoundPage() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-100 p-6 flex items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto">
        {/* Left Side: Text Information */}
        <div className="md:flex-1 text-center md:text-left md:pr-10">
          <h2 className="mt-4 text-9xl font-bold text-gray-800 animate-bounce">
            404
          </h2>
          <h3 className="mt-4 text-4xl font-semibold text-gray-700">
            Oops! Page Not Found
          </h3>
          <p className="mt-4 text-xl text-gray-600 max-w-md">
            It looks like you&apos;ve wandered off the path. Don&apos;t worry,
            we&apos;ll help you find your way back!
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Go Back Home
            </Link>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="md:flex-1 mt-10 md:mt-0 animate-float">
          <Image
            src="/Programming.gif"
            alt="404 illustration"
            width={600}
            height={450}
            className="w-full h-auto max-w-lg transform hover:rotate-6 transition-transform duration-500 mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
}
