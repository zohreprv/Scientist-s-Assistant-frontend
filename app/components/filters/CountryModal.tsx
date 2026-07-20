import Modal from '../Modal';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchAuthors } from '../../api/api';
import { RxCross2 } from 'react-icons/rx';
import { useAuthorSide } from '../../../Context/AuthorSideContext';
import { FiSearch } from 'react-icons/fi';
const CountryModal = ({ isModalOpen, setIsModalOpen }) => {
  const { selectedCountry, setSelectedCountry } = useAuthorSide();
  const [search, setSearch] = useState('');
  const [urlObj, setUrlObj] = useState({
    filter: {},
    search: { group_by: 'last_known_institutions.country_code' },
  });
  useEffect(() => {
    setUrlObj({
      ...urlObj,
      search: {
        ...urlObj.search,
        q: search,
      },
    });
  }, [search]);
  const { data } = useQuery({
    queryKey: ['country', search],
    queryFn: () => fetchAuthors('', urlObj),
    retry: 2,
    enabled: isModalOpen,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCountry((prev) => [...prev, e.target.name]);
    } else {
      setSelectedCountry(selectedCountry.filter((i) => i !== e.target.name));
    }
  };
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="flex justify-between items-center px-2">
        <FiSearch className="text-primary" />
        <input
          type="text"
          placeholder="Search Countries"
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
          {data?.group_by.map((item, index) => (
            <div
              className="flex justify-between items-center p-1 px-2 text-sm rounded hover:bg-gray-200"
              key={item.key}
            >
              <input
                type="checkbox"
                name={item.key.replace('https://openalex.org/', '')}
                className="mr-1"
                id={item.key}
                checked={selectedCountry.includes(
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
        </div>
      </form>
    </Modal>
  );
};

export default CountryModal;
