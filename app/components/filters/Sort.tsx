import { GoSortAsc } from 'react-icons/go';
import { GoSortDesc } from 'react-icons/go';

const SortFilter = ({ sort, handleSortChange }) => {
  const t =
    sort === 'publication_year:desc'
      ? 'publication_year:asc'
      : 'publication_year:desc';
  return (
    <div className="relative w-fit">
      <button
        className="flex justify-between items-center bg-gray-700
             text-white mb-1 px-1 py-3/4 rounded cursor-pointer
             space-x-2"
        onClick={() => handleSortChange(t)}
        role="button"
        aria-label={`sort publication year ${
          sort === 'publication_year:desc' ? 'descending' : 'ascending'
        }`}
      >
        <span>
          {sort === 'publication_year:asc' ? (
            <GoSortAsc size={20} />
          ) : (
            <GoSortDesc size={20} />
          )}
        </span>
      </button>
    </div>
  );
};

export default SortFilter;
