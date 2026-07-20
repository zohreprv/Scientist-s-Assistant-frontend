import Modal from '../Modal';
import { useUrl } from '../../../Context/UrlContext';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchWorks, fetchTopics } from '../../api/api';
import { RxCross2 } from 'react-icons/rx';
import { useSelectedTopics } from '../../../Context/TopicContext';
import { FiSearch } from 'react-icons/fi';
const TopicModal = ({ isModalOpen, setIsModalOpen }) => {
  const { selectedTopic, setSelectedTopic } = useSelectedTopics();
  const { url, setUrl } = useUrl();
  const [urlObj] = useState({
    filter: {},
    search: { group_by: 'primary_topic.id' },
  });
  const [search, setSearch] = useState('');
  const { data } = useQuery({
    queryKey: ['topic', search],
    queryFn: () => {
      if (search === '') {
        return fetchWorks(urlObj);
      } else {
        return fetchTopics(search);
      }
    },
    retry: 2,
    enabled: isModalOpen,
  });
  useEffect(() => {
    setUrl({
      ...url,
      filter: {
        ...url.filter,
        'primary_topic.id': selectedTopic.join('|'),
      },
    });
  }, [selectedTopic]);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTopic((prev) => [...prev, e.target.name]);
    } else {
      setSelectedTopic(selectedTopic.filter((i) => i !== e.target.name));
    }
  };
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="flex justify-between items-center px-2">
        <FiSearch className="text-primary" />
        <input
          type="text"
          placeholder="Search topics"
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
                    checked={selectedTopic.includes(
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
                    checked={selectedTopic.includes(
                      item.id.replace('https://openalex.org/', ''),
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTopic((prev) => [...prev, e.target.name]);
                      } else {
                        setSelectedTopic(
                          selectedTopic.filter((i) => i !== e.target.name),
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

export default TopicModal;
