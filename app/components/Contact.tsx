export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <p className="mb-6">Say something to start a live chat!</p>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            rows="4"
          ></textarea>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Send Message
        </button>
      </div>
      <div className="mt-6 flex space-x-4">
        <a href="#" className="text-blue-600" key="facebook">
          Facebook
        </a>
        <a href="#" className="text-blue-600" key="twitter">
          Twitter
        </a>
        <a href="#" className="text-blue-600" key="linkedin">
          LinkedIn
        </a>
      </div>
    </div>
  );
}
