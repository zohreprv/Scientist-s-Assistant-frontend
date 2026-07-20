import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
export const authorUrlContext = createContext(null);
export const AuthorUrlProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [url, setUrl] = useState({
    search: {
      page: parseInt(searchParams.get('page')) || 1,
      per_page: parseInt(searchParams.get('per_page')) || 4,
    },
    filter: {},
  });
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
    <authorUrlContext.Provider value={{ url, setUrl }}>
      {children}
    </authorUrlContext.Provider>
  );
};
export const useAuthorUrl = () => {
  return useContext(authorUrlContext);
};
