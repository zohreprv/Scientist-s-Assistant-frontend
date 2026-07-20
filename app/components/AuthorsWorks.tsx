import AuthorWorkCard from './AuthorWorkCard';
import { IoArrowDown } from 'react-icons/io5';

const AuthorsWorks = ({ works, workData, urlObj, handleShowMore }) => {
  if (works.length === 0) return;
  return (
    <>
      <div className="border border-gray-500 p-5 rounded-lg space-y-2 divide-y divide-gray-400">
        {works.map((p) => (
          <AuthorWorkCard paper={p} key={p.id} />
        ))}
      </div>
      {workData?.meta.count > workData?.meta.page * workData?.meta.per_page && (
        <button
          className={`flex items-center gap-1 mx-auto cursor-pointer
        hover:underline hover:underline-offset-2 text-gray-300 ${urlObj.per_page * urlObj.page >= workData?.meta.count && 'hidden'}`}
          onClick={handleShowMore}
        >
          <IoArrowDown />
          Show more
        </button>
      )}
    </>
  );
};

export default AuthorsWorks;
