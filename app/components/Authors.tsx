import { fetchAuthors } from '../api/api.js';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import AuthorCard from './AuthorCard';
import Pagination from './Pagination';
import Filter from './filters/Filter';
import { useAuthorUrl } from '../../Context/AuthorUrlContext.js';
import InstitutionModal from './filters/InstitutionModal.js';
import CountryModal from './filters/CountryModal.js';
const Authors = () => {
  const { url: urlObj, setUrl: setUrlObj } = useAuthorUrl();
  const [isInsModalOpen, setIsInsModalOpen] = useState(false);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['authors', urlObj],
    queryFn: () => fetchAuthors('', urlObj),
    // enabled: debouncedAuthorSearch?.length > 3,
    retry: (failureCount) => failureCount < 2,
  });
  return (
    <>
      <div>
        <div className="max-w-2xl">
          <Filter urlObj={urlObj} setUrlObj={setUrlObj} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <button
            className="flex justify-between items-center bg-gray-700
             text-white mb-1 px-4 py-1 rounded cursor-pointer
             space-x-2 lg:hidden "
            onClick={() => setIsInsModalOpen(!isInsModalOpen)}
            role="button"
            aria-haspopup="true"
            aria-expanded={isInsModalOpen}
          >
            Institution
          </button>
          <InstitutionModal
            isModalOpen={isInsModalOpen}
            setIsModalOpen={setIsInsModalOpen}
          />
        </div>

        <div>
          <button
            className="flex justify-between items-center bg-gray-700
             text-white mb-1 px-4 py-1 rounded cursor-pointer
             space-x-2 lg:hidden "
            onClick={() => setIsCountryModalOpen(!isCountryModalOpen)}
            role="button"
            aria-haspopup="true"
            aria-expanded={isCountryModalOpen}
          >
            Country
          </button>
          <CountryModal
            isModalOpen={isCountryModalOpen}
            setIsModalOpen={setIsCountryModalOpen}
          />
        </div>
      </div>
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
      {data?.results.map((author) => (
        <AuthorCard author={author} key={author.id} />
      ))}
      <Pagination data={data} urlObj={urlObj} setUrlObj={setUrlObj} />
    </>
  );
};

export default Authors;
