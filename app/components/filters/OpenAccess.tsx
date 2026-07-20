import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const OpenAccessFilter = ({ urlObj, setUrlObj }) => {
  const [opOpen, setOpOpen] = useState(false);
  const componentRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    setOpOpen(false);
    setUrlObj({
      search: { ...urlObj.search, page: 1 },
      filter: { ...urlObj.filter, 'open_access.is_oa': e.target.value },
    });
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !componentRef.current.contains(e.target as Node)
      ) {
        setOpOpen(false);
      }
    };

    if (opOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [opOpen]);

  return (
    <div className="relative" ref={componentRef}>
      <button
        className="flex justify-between items-center bg-gray-700
             text-white mb-1 px-4 py-1 rounded cursor-pointer
             space-x-2"
        onClick={() => {
          setOpOpen(!opOpen);
        }}
        role="button"
        aria-label="filter based on paper accessibility"
      >
        <span>
          {urlObj.filter['open_access.is_oa'] === 'true'
            ? 'Open Access'
            : urlObj.filter['open_access.is_oa'] === 'false'
              ? 'Not Open Access'
              : 'Access'}
        </span>
        <IoIosArrowDown
          className={`duration-400 ${opOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`absolute w-45 flex flex-col bg-gray-200 rounded
           text-gray-700 p-3 space-y-2 border border-gray-300
           ${opOpen ? 'opacity-100' : 'opacity-0 -z-10'}
           `}
        ref={dropdownRef}
      >
        <div className="flex justify-between">
          <label htmlFor="op" className="w-full hover:cursor-pointer">
            Open Access
          </label>
          <input
            type="radio"
            name="op"
            id="op"
            value={true}
            checked={urlObj.filter['open_access.is_oa'] === 'true'}
            onChange={handleChange}
            className="hover:cursor-pointer"
            role="radio"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="nop" className="w-full hover:cursor-pointer">
            Not Open Access
          </label>
          <input
            type="radio"
            name="op"
            id="nop"
            value={false}
            checked={urlObj.filter['open_access.is_oa'] === 'false'}
            onChange={handleChange}
            className="hover:cursor-pointer"
            role="radio"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="both" className="w-full hover:cursor-pointer">
            Both
          </label>
          <input
            type="radio"
            name="op"
            id="both"
            value={''}
            checked={urlObj.filter['open_access.is_oa'] === null}
            onChange={handleChange}
            className="hover:cursor-pointer"
            role="radio"
          />
        </div>
      </div>
    </div>
  );
};

export default OpenAccessFilter;
