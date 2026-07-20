import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
const curYear = new Date().getFullYear();
export const urlContext = createContext(null);
export const UrlProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get('title_and_abstract.search') || '',
  );
  const filter = searchParams.get('filter') || '';
  const yearMatch = filter.match(/publication_year:([^,]+)/);
  const publicationYear = yearMatch
    ? yearMatch[1]
    : `${curYear - 2}-${curYear}`;
  const [url, setUrl] = useState({
    search: {
      sort: `publication_year:desc`,
      page: parseInt(searchParams.get('page')) || 1,
      per_page: parseInt(searchParams.get('per_page')) || 4,
    },
    filter: {
      publication_year: publicationYear,
      'open_access.is_oa': searchParams.get('open_access.is_oa') || null,
      'title_and_abstract.search':
        searchParams.get('title_and_abstract.search') || '',
      cites: searchParams.get('cites') || '',
      cited_by: searchParams.get('cited_by') || '',
      related_to: searchParams.get('related_to') || '',
    },
  });

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(url.filter).forEach(([key, value]) => {
      if (key === 'publication_year') {
        if (value === '' || value === null) {
          newParams.delete('filter');
        } else {
          newParams.set('filter', `publication_year:${value}`);
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
    <urlContext.Provider value={{ url, setUrl, search, setSearch }}>
      {children}
    </urlContext.Provider>
  );
};
export const useUrl = () => {
  return useContext(urlContext);
};
