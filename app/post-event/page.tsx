'use client'; // Specify that this is a Client Component

import { useRouter } from 'next/navigation'; // Correct import for useRouter

export default function PostEventPage() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      // Redirect to events page on success
      router.push('/events');
    } catch (error) {
      console.error(error);
      alert('Error posting event: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Post Events</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Event Title *</label>
            <input
              type="text"
              name="title"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your event title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Event Image or Banner</label>
            <div className="border-dashed border-2 border-gray-300 rounded-md p-4 text-center">
              <input
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                id="image-upload"
                required
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <span className="text-gray-500">+ Add a photo</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description Of This Event</label>
            <textarea
              name="description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Describe your event."
              rows={4}
              required
            />
          </div>

          <div className="flex justify-between mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button type="button" className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">Draft</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}