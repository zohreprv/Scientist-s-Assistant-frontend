import { Link } from 'react-router';
const ErrorPage = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="text-center max-w-lg w-full mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 transition-all space-y-5">
        {/* <h1 className="text-6xl font-bold text-gray-500 dark:text-white">
          {statusCode}
        </h1> */}
        <h2 className="text-2xl text-gray-800 font-semibold mt-4">
          something went wrong
        </h2>
        {/* <p className="text-gray-600 dark:text-gray-400 mt-2"></p> */}
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
export default ErrorPage;
