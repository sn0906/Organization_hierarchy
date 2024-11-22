<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
  {/* Navigation Bar */}
  <nav className="bg-white dark:bg-gray-800 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex-shrink-0">
          <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            Your App Name
          </h1>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-center space-x-4">
            <a className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition">
              Home
            </a>
            {/* Add more nav items */}
          </div>
        </div>
      </div>
    </div>
  </nav>

  {/* Main Content */}
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Card Example */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Card Title
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Your content goes here
      </p>
    </div>

    {/* Button Examples */}
    <div className="mt-6 space-x-4">
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition">
        Primary Button
      </button>
      <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition">
        Secondary Button
      </button>
    </div>

    {/* Form Input Example */}
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Input Label
      </label>
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Enter something..."
      />
    </div>
  </main>

  {/* Footer */}
  <footer className="bg-white dark:bg-gray-800 shadow-inner mt-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <p className="text-center text-gray-500 dark:text-gray-400">
        © 2024 Your App Name. All rights reserved.
      </p>
    </div>
  </footer>
</div> 