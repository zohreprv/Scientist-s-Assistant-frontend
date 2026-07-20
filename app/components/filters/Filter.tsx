import { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate, useLocation } from 'react-router';
import { useUrl } from '../../../Context/UrlContext';
import { useAuthorUrl } from '../../../Context/AuthorUrlContext';
import { useSearchParams } from 'react-router';

const Filter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchMode = location?.pathname === '/works' ? 'works' : 'authors';
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef(null);
  const worksContext = useUrl();
  const authorContext = useAuthorUrl();

  const { url, setUrl, search, setSearch } =
    searchMode === 'works' ? worksContext : authorContext;

  const handleChange = (e) => {
    navigate(`/${e.target.value}`);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setFilterOpen(false);
      }
    };

    if (filterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterOpen]);

  return (
    <div
      className="p-3 flex justify-between bg-gray-300 text-gray-600 rounded-lg
     border border-gray-300 lg:divide-x divide-gray-800 shadow-gray-300 shadow"
      role="search"
    >
      <input
        type="text"
        placeholder={`Search scholary ${searchMode === 'works' ? 'works' : 'authors'}`}
        className="w-3/4 placeholder:text-gray-600 outline-0 p-1"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        aria-label={`Search for ${searchMode === 'works' ? 'works' : 'authors'}`}
      />

      <div className="relative" ref={dropdownRef}>
        <button
          className="flex justify-between items-center bg-darkgray
                     text-white mb-1 px-4 py-1 rounded cursor-pointer 
                     gap-2"
          onClick={() => {
            setFilterOpen(!filterOpen);
          }}
          role="button"
          aria-label="select search mode"
          aria-expanded={filterOpen}
          aria-controls="search-mode-options"
        >
          <span className="capitalize hidden lg:block">{searchMode}</span>
          <IoIosArrowDown
            size={20}
            className={`cursor-pointer duration-400 ${filterOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {filterOpen && (
          <div
            className="absolute w-30 md:w-45 flex flex-col bg-gray-200 rounded
                   text-gray-700 p-3 space-y-2 border border-gray-300 right-0 lg:left-0 z-100"
            id="search-mode-options"
            role="listbox"
            aria-label="Search mode options"
          >
            <div className="flex justify-between " role="option">
              <label htmlFor="work" className="w-full hover:cursor-pointer">
                Work
              </label>
              <input
                type="radio"
                name="filter"
                id="work"
                value={'works'}
                checked={searchMode === 'works'}
                onChange={handleChange}
                className="hover:cursor-pointer"
                aria-label="work"
                role="radio"
              />
            </div>
            <div className="flex justify-between " role="option">
              <label htmlFor="author" className="w-full hover:cursor-pointer">
                Author
              </label>
              <input
                type="radio"
                name="filter"
                id="author"
                value={'authors'}
                checked={searchMode === 'authors'}
                onChange={handleChange}
                className="hover:cursor-pointer"
                aria-label="author"
                role="radio"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
