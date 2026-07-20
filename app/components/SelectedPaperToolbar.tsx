import { RxCross2 } from 'react-icons/rx';
import { useUrl } from '../../Context/UrlContext';
const selectedPaperToolbar = ({
  selectedPaper,
  selectedPaperShow,
  setSelectedPaperShow,
  setSelectedPaper,
}) => {
  const curYear = new Date().getFullYear();
  const filterFields = ['cites', 'cited_by', 'related_to'];
  const { url: urlObj, setUrl: setUrlObj } = useUrl();

  return (
    <div
      className="flex justify-between bg-gray-300 text-gray-800 p-3
         rounded shadow shadow-gray-400"
    >
      <h2 className="text-xl">"{selectedPaper.title}"</h2>
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 text-sm text-gray-800 rounded cursor-pointer border border-gray-500 hover:bg-gray-400"
          onClick={() => setSelectedPaperShow(!selectedPaperShow)}
        >
          See Paper Detail
        </button>
        <button
          className="text-sm text-red-600 cursor-pointer"
          onClick={() => {
            setSelectedPaper(null);
            setUrlObj({
              search: { ...urlObj.search, per_page: 4 },
              filter: {
                ...urlObj.filter,
                publication_year: `${curYear - 2}-${curYear}`,
                ...filterFields.reduce((acc, key) => {
                  return { ...acc, [key]: '' };
                }, {}),
              },
            });
          }}
          aria-label="unselect paper"
        >
          <RxCross2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default selectedPaperToolbar;
