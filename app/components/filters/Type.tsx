import { useRef, useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { fetchWorks } from '../../api/api';
const Type = ({ urlObj, setUrlObj, setWorks }) => {
  const formRef = useRef(null);
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
  const componentRef = useRef(null);
  const dropdownRef = useRef(null);
  const [urlObjAuthor, setUrlObjAuthor] = useState({
    search: {
      group_by: 'type',
    },
    filter: {
      'author.id': urlObj.filter['author.id'],
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ['types', urlObjAuthor],
    queryFn: () => fetchWorks(urlObjAuthor),
    retry: 2,
    enabled: !!urlObj.filter['author.id'],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTypeFilterOpen(false);
    const formData = new FormData(formRef.current);
    const selectedTypes = formData.getAll('type');
    setWorks([]);
    setUrlObj({
      search: { ...urlObj.search, page: 1 },
      filter: { ...urlObj.filter, type: selectedTypes.join('|') },
    });
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(e.target as Node)
      ) {
        setIsTypeFilterOpen(false);
      }
    };

    if (isTypeFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTypeFilterOpen]);
  const types = urlObj.filter?.type?.split('|');
  if (!data) return;
  return (
    <div className="relative" ref={componentRef}>
      <button
        className="flex justify-between items-center bg-gray-700
                 text-white mb-1 px-4 py-1 rounded cursor-pointer
                 space-x-2"
        onClick={() => {
          setIsTypeFilterOpen(!isTypeFilterOpen);
        }}
        role="button"
        aria-label="select type"
        aria-controls="type-filter-form"
        aria-haspopup={true}
        aria-expanded={isTypeFilterOpen}
      >
        <span>
          {types?.length > 1
            ? `${types?.length} types`
            : types?.length === 1 && types[0] !== ''
              ? types[0][0].toUpperCase() + types[0].slice(1)
              : 'Type'}
        </span>
        <IoIosArrowDown
          className={`duration-400 ${isTypeFilterOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute w-45 flex flex-col bg-gray-200 rounded
            text-gray-700 p-3 space-y-2 border border-gray-300
            ${isTypeFilterOpen ? 'opacity-100' : 'opacity-0 -z-10'}
            `}
        ref={dropdownRef}
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          role="form"
          aria-label="type options"
          id="type-filter-form"
        >
          {data.group_by.map((type) => (
            <div className="flex justify-between" key={type.key_display_name}>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="type"
                  id={type.key_display_name}
                  value={type.key_display_name}
                  aria-label={type.key_display_name}
                  aria-checked={types?.includes(type.key_display_name)}
                />
                <label htmlFor={type.key_display_name}>
                  {type.key_display_name}
                </label>
              </div>
              <span>{type.count.toLocaleString()}</span>
            </div>
          ))}
          <button
            className=" px-2 py-1 text-sm text-gray-800 rounded cursor-pointer border border-gray-500 hover:bg-gray-400"
            role="button"
            aria-label="apply type filter"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default Type;
