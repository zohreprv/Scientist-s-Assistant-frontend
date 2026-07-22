import Modal from '../Modal';
import { useUrl } from '../../../Context/UrlContext';
import { useQuery } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import { fetchWorks } from '../../api/api';
import { RxCross2 } from 'react-icons/rx';
import { useWorkSide } from '../../../Context/WorkSideContext';
import { FiSearch } from 'react-icons/fi';
const TopicModal = ({ data, selectedData, isModalOpen, setIsModalOpen }) => {
  const { selectedTopic, setSelectedTopic } = useWorkSide();
  const { url, setUrl } = useUrl();

  const [search, setSearch] = useState('');
  const form = useRef(null);

  const { data: dataOnSearch } = useQuery({
    queryKey: ['topic', search],
    queryFn: () =>
      fetchWorks({
        filter: {},
        search: { search: search, group_by: 'primary_topic.id' },
      }),
    retry: 2,
    enabled: !!search,
    placeholderData: (previousData) => previousData,
  });
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const checkedTopics = formData.getAll('topic');
    setSelectedTopic(checkedTopics);
    setIsModalOpen(false);
    document.querySelectorAll('.scrollbar-custom').forEach((element) => {
      element.scrollTop = 0;
    });
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
            form.current.reset();
            document
              .querySelectorAll('.scrollbar-custom')
              .forEach((element) => {
                element.scrollTop = 0;
              });
          }}
          role="button"
          aria-label="close topic modal"
        >
          <RxCross2 size={18} />
        </div>
      </div>
      <div className="border-b border-gray-300 m-2 -mx-2"></div>
      <form ref={form}>
        <div className="overflow-y-scroll h-100 scrollbar-custom">
          {search === '' &&
            selectedData?.results.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-1 px-2 text-sm rounded hover:bg-gray-200"
              >
                <div>
                  <input
                    type="checkbox"
                    name="topic"
                    id={item.id}
                    value={item.id.replace('https://openalex.org/', '')}
                    className="mr-1"
                    defaultChecked={selectedTopic.includes(
                      item.id.replace('https://openalex.org/', ''),
                    )}
                  />
                  <label className="block w-full" htmlFor={item.id}>
                    {item.display_name}
                  </label>
                </div>
              </div>
            ))}
          {search === ''
            ? data?.group_by
                ?.filter((item) =>
                  selectedTopic.length > 0
                    ? !selectedData?.results.some((s) => s.id === item.key)
                    : true,
                )
                .map((item, index) => (
                  <div
                    className="flex justify-between items-center p-1 px-2 text-sm rounded hover:bg-gray-200"
                    key={item.key}
                  >
                    <input
                      type="checkbox"
                      value={item.key.replace('https://openalex.org/', '')}
                      name="topic"
                      className="mr-1"
                      id={item.key}
                      defaultChecked={selectedTopic.includes(
                        item.key.replace('https://openalex.org/', ''),
                      )}
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
            : dataOnSearch?.group_by
                ?.filter((item) =>
                  selectedTopic.length > 0
                    ? !selectedData?.results.some((s) => s.id === item.key)
                    : true,
                )
                .map((item) => (
                  <div
                    className="flex justify-between items-center p-1 px-2 text-sm rounded hover:bg-gray-200"
                    key={item.key}
                  >
                    <input
                      type="checkbox"
                      value={item.key.replace('https://openalex.org/', '')}
                      name="topic"
                      className="mr-1"
                      id={item.key}
                      defaultChecked={selectedTopic.includes(
                        item.key.replace('https://openalex.org/', ''),
                      )}
                    />

                    <label
                      key={item.key}
                      className="block w-full"
                      htmlFor={item.key}
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
              form.current.reset();
              document
                .querySelectorAll('.scrollbar-custom')
                .forEach((element) => {
                  element.scrollTop = 0;
                });
            }}
          >
            Back
          </button>
          <button
            className=" px-2 py-1 text-sm text-gray-800 rounded cursor-pointer border border-gray-500 hover:bg-gray-400"
            onClick={handleOnSubmit}
          >
            Apply
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TopicModal;
