import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useQuery } from '@tanstack/react-query';
import { fetchWorks } from '../../api/api';
import { useUrl } from '../../../Context/UrlContext';
import Modal from '../Modal';
import { FiSearch } from 'react-icons/fi';
import { useDebounce } from 'use-debounce';
const TypeModal = ({ isModalOpen, setIsModalOpen }) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);

  const { url, setUrl } = useUrl();
  const [types, setTypes] = useState([]);
  const [urlObj, setUrlObj] = useState({
    search: {
      group_by: 'type',
      q: '',
    },
    filter: {},
  });
  const { data } = useQuery({
    queryKey: ['types', urlObj],
    queryFn: () => fetchWorks(urlObj),
    retry: 2,
    enabled: isModalOpen,
  });

  useEffect(() => {
    setUrlObj({
      ...urlObj,
      search: {
        ...urlObj.search,
        q: debouncedSearch,
      },
    });
  }, [debouncedSearch]);

  const handleOnChange = (e) => {
    if (e.target.checked) {
      setTypes((prev) => [...prev, e.target.value]);
    } else {
      setTypes((prev) => prev.filter((t) => t !== e.target.value));
    }
  };

  useEffect(() => {
    setUrl({
      search: { ...url.search, page: 1 },
      filter: { ...url.filter, type: types.join('|') },
    });
  }, [types]);

  return (
    <div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <div className="flex justify-between items-center px-2">
          <FiSearch className="text-primary" />
          <input
            type="text"
            placeholder="Search types"
            className="w-3/4 placeholder:text-gray-600 outline-0 p-1"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            role="search"
            aria-label="search types"
          />
          <div
            className="modal-btn"
            onClick={() => {
              setIsModalOpen(false);
              setSearch('');
            }}
            role="button"
            aria-label="close type modal"
          >
            <RxCross2 size={18} />
          </div>
        </div>
        <div className="border-b border-gray-300 m-2 -mx-2"></div>

        <div className="h-115 overflow-y-scroll scrollbar-custom p-1 my-3">
          {data?.group_by.map((type, index) => (
            <div
              className="flex justify-between items-center p-1 px-2 text-sm rounded hover:bg-gray-200"
              key={type.key_display_name}
            >
              <div className="flex items-center w-full">
                <input
                  type="checkbox"
                  name="type"
                  id={type.key_display_name}
                  value={type.key_display_name}
                  checked={types.includes(type.key_display_name)}
                  onChange={handleOnChange}
                  aria-describedby={index}
                />
                <label
                  htmlFor={type.key_display_name}
                  className="flex-1"
                  id={index}
                  aria-hidden={true}
                >
                  {type.key_display_name}
                </label>
              </div>
              <span>{type.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default TypeModal;
