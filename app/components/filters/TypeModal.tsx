import { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useQuery } from '@tanstack/react-query';
import { fetchWorks } from '../../api/api';
import { useUrl } from '../../../Context/UrlContext';
import Modal from '../Modal';
import { FiSearch } from 'react-icons/fi';
import { useWorkSide } from '../../../Context/WorkSideContext';
const TypeModal = ({ isModalOpen, setIsModalOpen }) => {
  const [search, setSearch] = useState('');
  const form = useRef(null);
  const { selectedType, setSelectedType } = useWorkSide();
  const [urlObj, setUrlObj] = useState({
    search: {
      group_by: 'type',
    },
    filter: {},
  });
  const { data } = useQuery({
    queryKey: ['types', urlObj],
    queryFn: () => fetchWorks(urlObj),
    retry: 2,
    enabled: isModalOpen,
  });
  const { data: dataOnSearch } = useQuery({
    queryKey: ['type', search],
    queryFn: () =>
      fetchWorks({
        filter: {},
        search: { q: search, group_by: 'type' },
      }),
    retry: 2,
    enabled: !!search,
    placeholderData: (previousData) => previousData,
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const checkedTypes = formData.getAll('type');
    setSelectedType(checkedTypes);
    setIsModalOpen(false);
    document.querySelectorAll('.scrollbar-custom').forEach((element) => {
      element.scrollTop = 0;
    });
  };

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
              form.current.reset();
              document
                .querySelectorAll('.scrollbar-custom')
                .forEach((element) => {
                  element.scrollTop = 0;
                });
            }}
            role="button"
            aria-label="close type modal"
          >
            <RxCross2 size={18} />
          </div>
        </div>
        <div className="border-b border-gray-300 m-2 -mx-2"></div>
        <form ref={form}>
          <div className="h-115 overflow-y-scroll scrollbar-custom p-1 my-3">
            {search === '' &&
              selectedType?.map((type, index) => (
                <div
                  className="flex justify-between items-center p-1 px-2 text-sm rounded hover:bg-gray-200"
                  key={type}
                >
                  <div className="flex items-center w-full">
                    <input
                      type="checkbox"
                      name="type"
                      id={type}
                      value={type}
                      defaultChecked={selectedType.includes(type)}
                      aria-describedby={index}
                    />
                    <label
                      htmlFor={type}
                      className="flex-1"
                      id={index}
                      aria-hidden={true}
                    >
                      {type}
                    </label>
                  </div>
                </div>
              ))}
            {search === ''
              ? data?.group_by
                  .filter((t) =>
                    selectedType.length > 0
                      ? !selectedType.some((st) => st === t.key_display_name)
                      : true,
                  )
                  .map((type, index) => (
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
                          defaultChecked={selectedType.includes(
                            type.key_display_name,
                          )}
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
                    </div>
                  ))
              : dataOnSearch?.group_by
                  .filter((t) =>
                    selectedType.length > 0
                      ? !selectedType.some((st) => st === t.key_display_name)
                      : true,
                  )
                  .map((type, index) => (
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
                          defaultChecked={selectedType.includes(
                            type.key_display_name,
                          )}
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
    </div>
  );
};

export default TypeModal;
