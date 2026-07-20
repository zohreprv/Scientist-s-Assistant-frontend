import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-lg w-full mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 transition-all">
        <div className="mb-6">
          <h2 className="font-bold text-7xl text-gray-900 dark:text-white">
            404
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-yellow-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Page Not Found
        </h3>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/works"
          className="inline-block px-8 py-3 bg-linear-to-r  from-yellow-500 to-purple-600 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
