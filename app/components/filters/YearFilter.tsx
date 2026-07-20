import { useRef, useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
const YearFilter = ({ urlObj, setUrlObj }) => {
  const curYear = new Date().getFullYear();
  const [yearOpen, setYearOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const componentRef = useRef(null);
  const y = urlObj.filter.publication_year.split('-');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !componentRef.current.contains(e.target as Node)
      ) {
        setIsFormOpen(false);
        setYearOpen(false);
      }
    };

    if (yearOpen || isFormOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [yearOpen, isFormOpen]);

  const handleApply = (e) => {
    e.preventDefault();
    const from = Number(fromInputRef.current.value);
    const to = Number(toInputRef.current.value);

    setIsFormOpen(false);
    setUrlObj({
      search: { ...urlObj.search, page: 1 },
      filter: {
        ...urlObj.filter,
        publication_year: `${from}-${to}`,
      },
    });
  };
  const handleClear = () => {
    setYearOpen(false);
    setIsFormOpen(false);
    setUrlObj({
      search: {
        ...urlObj.search,
        page: 1,
      },
      filter: {
        ...urlObj.filter,
        publication_year: '',
      },
    });
  };
  const handlePresetSelect = (value) => {
    setYearOpen(false);
    setUrlObj({
      search: { ...urlObj.search, page: 1 },
      filter: {
        ...urlObj.filter,
        publication_year: value,
      },
    });
  };
  return (
    <div className="relative" ref={componentRef}>
      <div
        className="flex justify-between items-center bg-darkgray
             text-white mb-1 px-4 py-1 rounded 
             space-x-2"
        role="button"
        aria-label="select publication year interval"
        aria-expanded={isFormOpen}
        ref={dropdownRef}
      >
        <span aria-label="selected interval">
          {urlObj.filter.publication_year ? `${y[0]} - ${y[1]}` : 'Year'}
        </span>
        <button
          className={`cursor-pointer duration-400 ${yearOpen || isFormOpen ? 'rotate-180' : ''}`}
          onClick={() => {
            setYearOpen(!yearOpen);
            setIsFormOpen(false);
          }}
          aria-label="expand year interval selection form"
          role="button"
          aria-haspopup={true}
          aria-controls="year-filter-options"
        >
          <IoIosArrowDown />
        </button>
        {urlObj.filter.publication_year && (
          <button
            className="cursor-pointer"
            onClick={handleClear}
            aria-label="remove year filter"
            role="button"
          >
            <RxCross2 />
          </button>
        )}
      </div>
      {isFormOpen && (
        <form
          className={`absolute w-65 flex flex-col bg-gray-200 rounded
           text-gray-700 p-3 space-y-2 border border-gray-300 z-500`}
          aria-label="publication year filter "
          role="form"
          id="year-filter-form"
        >
          <div className="flex gap-2">
            <input
              type="number"
              id="from"
              defaultValue={urlObj.filter.publication_year ? `${y[0]}` : ''}
              ref={fromInputRef}
              className="w-20 bg-gray-300 outline-0 rounded border  border-gray-400 
                  px-2 py-1/2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              aria-label="begin year interval"
            />
            to
            <input
              type="number"
              id="to"
              ref={toInputRef}
              defaultValue={urlObj.filter.publication_year ? `${y[1]}` : ''}
              className="w-20 bg-gray-300 outline-0 rounded border  border-gray-400 
                  px-2 py-1/2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              aria-label="end year interval"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              className=" px-2 py-1 text-sm text-gray-800 rounded cursor-pointer hover:bg-gray-400"
              onClick={(e) => {
                e.preventDefault();
                setIsFormOpen(false);
              }}
              role="button"
              aria-label="cancel setting interval"
            >
              Back
            </button>
            <button
              className=" px-2 py-1 text-sm text-gray-800 rounded cursor-pointer border border-gray-500 hover:bg-gray-400"
              onClick={handleApply}
              role="button"
              aria-label="apply interval"
            >
              Apply
            </button>
          </div>
        </form>
      )}
      {yearOpen && (
        <div
          className={`absolute w-45 flex flex-col bg-gray-200 rounded
           text-gray-700 p-3 space-y-2 border border-gray-300 z-500
           }
           `}
          role="menu"
          aria-label="year filter options"
          id="year-filter-options"
        >
          <button
            className="options"
            onClick={() => handlePresetSelect(`2020-${curYear}`)}
          >
            Since 2020
          </button>
          <button
            className="options"
            onClick={() => handlePresetSelect(`2025-${curYear}`)}
          >
            Since 2025
          </button>
          <button
            className="options"
            aria-controls="year-filter-form"
            aria-expanded={isFormOpen}
            aria-haspopup={true}
            onClick={() => {
              setIsFormOpen(true);
              setYearOpen(false);
            }}
          >
            custom range...{' '}
          </button>
        </div>
      )}
    </div>
  );
};

export default YearFilter;
