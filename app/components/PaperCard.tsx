import { FaUnlockAlt, FaLock } from 'react-icons/fa';
import { MdOutlineFormatQuote } from 'react-icons/md';
import { RxPeople } from 'react-icons/rx';

const PaperCard = ({ paper, handlePaperShow }) => {
  const a = paper.abstract_inverted_index;
  let arr;
  if (a) {
    const max = Math.max(...Object.values(a).flat());
    arr = Array.from({ length: max });
    for (const [word, positions] of Object.entries(a)) {
      for (const pos of positions) {
        arr[pos] = word;
      }
    }
  }
  return (
    <div className="border border-gray-400 rounded-lg p-5 space-y-2">
      <h2
        className="text-xl font-semibold text-gray-200 md:text-2xl cursor-pointer"
        onClick={() => handlePaperShow(paper.id)}
      >
        {paper.title}
      </h2>

      <div className="flex flex-col  gap-1 md:flex-row md:items-center">
        <div className="text-gray-200">
          {paper.authorships
            .slice(0, 3)
            .map((a) => a.author.display_name)
            .join(', ')}
          {paper.authorships.length > 3 && (
            <span className="text-gray-500 ml-2">
              +{paper.authorships.length - 3}
            </span>
          )}
        </div>
        <span className="text-gray-500">
          {new Date(paper.publication_date).toLocaleDateString()}
        </span>
        <span className="flex justify-center items-center w-fit gap-1 bg-green-950 rounded p-1 text-sm text-green-500">
          {paper.open_access.is_oa === true ? (
            <>
              Open Access <FaUnlockAlt />
            </>
          ) : (
            <>
              Closed Access <FaLock />
            </>
          )}
        </span>
      </div>
      <div className="text-gray-500 line-clamp-3">{arr && arr.join(' ')}</div>
      <div className="flex gap-4 mt-4">
        <div className="flex items-center gap-1 text-gray-500">
          <MdOutlineFormatQuote />
          {paper.cited_by_count}{' '}
          {paper.cited_by_count > 1 ? 'citations' : 'citation'}
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <RxPeople />
          {paper.authorships.length}{' '}
          {paper.authorships.length > 1 ? 'authors' : 'author'}
        </div>
      </div>
    </div>
  );
};

export default PaperCard;
