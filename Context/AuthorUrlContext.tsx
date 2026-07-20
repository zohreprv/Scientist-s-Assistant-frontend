import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useDebounce } from 'use-debounce';

export const authorUrlContext = createContext(null);
export const AuthorUrlProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 1000);

  const [url, setUrl] = useState({
    search: {
      page: parseInt(searchParams.get('page')) || 1,
      per_page: parseInt(searchParams.get('per_page')) || 4,
    },
    filter: {
      'display_name.search': searchParams.get('display_name.search') || '',
    },
  });
  useEffect(() => {
    setUrl((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        'display_name.search': debouncedSearch,
      },
    }));
  }, [debouncedSearch]);
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(url.filter).forEach(([key, value], index) => {
      if (index === 0) {
        if (value === '' || value === null) {
          newParams.delete('filter');
        } else {
          newParams.set('filter', `${key}=${value}`);
        }
      } else {
        if (value === '' || value === null) {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      }
    });
    Object.entries(url.search).forEach(([key, value]) => {
      if (value === '' || value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
  }, [url]);
  return (
    <authorUrlContext.Provider value={{ url, setUrl, search, setSearch }}>
      {children}
    </authorUrlContext.Provider>
  );
};
export const useAuthorUrl = () => {
  return useContext(authorUrlContext);
};
