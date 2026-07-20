import PaperCard from './PaperCard';
import Pagination from './Pagination';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWorks } from '../api/api.js';
import { PuffLoader } from 'react-spinners';
import YearFilter from '~/components/filters/YearFilter';
import OpenAccessFilter from '~/components/filters/OpenAccess';
import Filter from '~/components/filters/Filter';
import PaperDetails from './PaperDetails';
import SortFilter from './filters/Sort';
import { useUrl } from '../../Context/UrlContext';
import TypeModal from './filters/TypeModal';
import TopicModal from './filters/TopicModal';
import SelectedPaperToolbar from './SelectedPaperToolbar';
const Works = () => {
  const [selectedPaper, setSelectedPaper] = useState();
  const [selectedPaperShow, setSelectedPaperShow] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const { url: urlObj, setUrl: setUrlObj } = useUrl();
  const filterFields = ['cites', 'cited_by', 'related_to'];

  const { data, isLoading, error } = useQuery({
    queryKey: ['works', urlObj],
    queryFn: () => fetchWorks(urlObj),
    retry: 2,
  });
  const handlePaperShow = (id) => {
    setSelectedPaper(data.results.find((item) => item.id === id));
    setSelectedPaperShow(true);
  };

  const handleSortChange = (newSort) => {
    setUrlObj({
      ...urlObj,
      search: {
        ...urlObj.search,
        sort: newSort,
        page: 1,
      },
    });
  };
  return (
    <>
      <div className="flex flex-col gap-5 ">
        <div className="max-w-2xl">
          <Filter urlObj={urlObj} setUrlObj={setUrlObj} />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <YearFilter urlObj={urlObj} setUrlObj={setUrlObj} />
          <OpenAccessFilter urlObj={urlObj} setUrlObj={setUrlObj} />
          <div>
            <button
              className="flex justify-between items-center bg-gray-700
             text-white mb-1 px-4 py-1 rounded cursor-pointer
             space-x-2"
              onClick={() => setIsTypeModalOpen(!isTypeModalOpen)}
              role="button"
              aria-haspopup="true"
              aria-expanded={isTypeModalOpen}
            >
              Type
            </button>
            <TypeModal
              isModalOpen={isTypeModalOpen}
              setIsModalOpen={setIsTypeModalOpen}
            />
          </div>
          <div>
            <button
              className="justify-between items-center bg-gray-700
             text-white mb-1 px-4 py-1 rounded cursor-pointer
             space-x-2 lg:hidden"
              onClick={() => setIsTopicModalOpen(!isTopicModalOpen)}
              role="button"
              aria-haspopup="true"
              aria-expanded={isTopicModalOpen}
            >
              Topic
            </button>
            <TopicModal
              isModalOpen={isTopicModalOpen}
              setIsModalOpen={setIsTopicModalOpen}
            />
          </div>
        </div>
      </div>
      <div
        id="selected-paper"
        tabIndex={-1}
        role="dialog"
        aria-hidden={
          !(filterFields.some((field) => urlObj.filter[field]) && selectedPaper)
        }
      >
        {filterFields.some((field) => urlObj.filter[field]) &&
          selectedPaper && (
            <SelectedPaperToolbar
              selectedPaper={selectedPaper}
              selectedPaperShow={selectedPaperShow}
              setSelectedPaperShow={setSelectedPaperShow}
              setSelectedPaper={setSelectedPaper}
            />
          )}
      </div>
      <SortFilter
        sort={urlObj.search.sort}
        handleSortChange={handleSortChange}
      />
      {isLoading && (
        <div className="h-70 flex justify-center items-center">
          <PuffLoader
            color="#36d7b7"
            loading={isLoading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <main className="space-y-5">
        {data?.results.map((item) => (
          <div key={item.id}>
            <PaperCard paper={item} handlePaperShow={handlePaperShow} />
            <button
              className="sr-only"
              onClick={() => {
                if (selectedPaperShow) {
                  setSelectedPaperShow(false);
                } else {
                  handlePaperShow(item.id);
                  setTimeout(() => {
                    document.getElementById('paper-detail')?.focus();
                  }, 1000);
                }
              }}
              aria-label="paper detail"
              role="button"
              aria-haspopup={true}
              aria-expanded={selectedPaperShow}
              aria-controls="paper-detail"
            ></button>
          </div>
        ))}
      </main>
      {data && <Pagination data={data} urlObj={urlObj} setUrlObj={setUrlObj} />}
      <div
        className={`fixed flex flex-col gap-1 bg-white text-black
      top-0 right-0 w-225 max-w-svw h-screen overflow-y-scroll
       transition-transform
       duration-1000 ease-in-out ${selectedPaperShow ? 'translate-x-0' : 'translate-x-full'}
     p-5 z-2000`}
        id="paper-detail"
        role={selectedPaper ? 'dialog' : ''}
        aria-modal="true"
        aria-label="paper detail"
        tabIndex={-1}
      >
        {selectedPaper && (
          <PaperDetails
            paper={selectedPaper}
            setSelectedPaper={setSelectedPaper}
            setUrlObj={setUrlObj}
            urlObj={urlObj}
            paperShow={selectedPaperShow}
            setPaperShow={setSelectedPaperShow}
          />
        )}
      </div>
    </>
  );
};

export default Works;
