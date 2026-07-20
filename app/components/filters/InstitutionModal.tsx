import Modal from '../Modal';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchAuthors, fetchInstitutions } from '../../api/api';
import { RxCross2 } from 'react-icons/rx';
import { useAuthorSide } from '../../../Context/AuthorSideContext';
import { FiSearch } from 'react-icons/fi';
import { useAuthorUrl } from '../../../Context/AuthorUrlContext';
const InstitutionModal = ({ isModalOpen, setIsModalOpen }) => {
  const { selectedInstitution, setSelectedInstitution } = useAuthorSide();
  const [urlObj] = useState({
    filter: {},
    search: { group_by: 'last_known_institutions.id' },
  });
  const [search, setSearch] = useState('');
  const { data } = useQuery({
    queryKey: ['institution', search],
    queryFn: () => {
      if (search === '') {
        return fetchAuthors('', urlObj);
      } else {
        return fetchInstitutions(search);
      }
    },
    retry: 2,
    enabled: isModalOpen,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedInstitution((prev) => [...prev, e.target.name]);
    } else {
      setSelectedInstitution(
        selectedInstitution.filter((i) => i !== e.target.name),
      );
    }
  };
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="flex justify-between items-center px-2">
        <FiSearch className="text-primary" />
        <input
          type="text"
          placeholder="Search Institutions"
          className="w-3/4 placeholder:text-gray-600 outline-0 p-1"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          role="search"
          aria-label="search topics"
        />
        <div
          className="modal-btn"
          onClick={() => {
            setIsModalOpen(false);
            setSearch('');
          }}
          role="button"
          aria-label="close topic modal"
        >
          <RxCross2 size={18} />
        </div>
      </div>
      <div className="border-b border-gray-300 m-2 -mx-2"></div>
      <form>
        <div className="overflow-y-scroll h-100 scrollbar-custom">
          {search === ''
            ? data?.group_by.map((item, index) => (
                <div
                  className="flex justify-between items-center p-1 px-2 text-sm rounded hover:bg-gray-200"
                  key={item.key}
                >
                  <input
                    type="checkbox"
                    name={item.key.replace('https://openalex.org/', '')}
                    className="mr-1"
                    id={item.key}
                    checked={selectedInstitution.includes(
                      item.key.replace('https://openalex.org/', ''),
                    )}
                    onChange={handleOnChange}
                    aria-describedby={index}
                  />
                  <label
                    className="block w-full"
                    htmlFor={item.key}
                    id={index}
                    aria-hidden={true}
                  >
                    {item.key_display_name}
                  </label>
                </div>
              ))
            : data?.results.map((item) => (
                <div
                  className="flex justify-between items-center p-1 px-2 text-sm rounded hover:bg-gray-200"
                  key={item.id}
                >
                  <input
                    type="checkbox"
                    name={item.id.replace('https://openalex.org/', '')}
                    className="mr-1"
                    id={item.id}
                    checked={selectedInstitution.includes(
                      item.id.replace('https://openalex.org/', ''),
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedInstitution((prev) => [
                          ...prev,
                          e.target.name,
                        ]);
                      } else {
                        setSelectedInstitution(
                          selectedInstitution.filter(
                            (i) => i !== e.target.name,
                          ),
                        );
                      }
                    }}
                  />

                  <label key={item.id} className="block" htmlFor={item.id}>
                    {item.display_name}
                  </label>
                </div>
              ))}
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <button
            className=" px-2 py-1 text-sm text-gray-800 rounded cursor-pointer hover:bg-gray-400"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
              setSearch('');
            }}
          >
            Back
          </button>
          {/* <button
            className=" px-2 py-1 text-sm text-gray-800 rounded cursor-pointer border border-gray-500 hover:bg-gray-400"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Apply
          </button> */}
        </div>
      </form>
    </Modal>
  );
};

export default InstitutionModal;
