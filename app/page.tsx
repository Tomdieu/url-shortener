
export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h1 className="text-3xl font-semibold mb-4">URL Shortener</h1>
        <p className="text-gray-600 mb-6">Shorten your long URLs quickly and easily.</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            placeholder="Enter your URL"
            className="flex-1 border border-gray-300 rounded-md p-2"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Shorten
          </button>
        </div>

        <div className="mt-4">
          <p className="text-gray-500">Already have a shortened URL? Enter it below:</p>
          <input
            type="text"
            placeholder="Shortened URL"
            className="w-full border border-gray-300 rounded-md p-2 mt-2"
          />
        </div>
      </div>
    </div>
  )
}
