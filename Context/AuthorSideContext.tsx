import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useAuthorUrl } from './AuthorUrlContext';

const authorSideContext = createContext(null);
export const AuthorSideProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { url, setUrl } = useAuthorUrl();

  const [selectedInstitution, setSelectedInstitution] = useState(
    searchParams.get('last_known_institutions.id')
      ? [...searchParams.get('last_known_institutions.id')?.split('|')]
      : [],
  );
  const [selectedCountry, setSelectedCountry] = useState(
    searchParams.get('last_known_institutions.country_code')
      ? [
          ...searchParams
            .get('last_known_institutions.country_code')
            ?.split('|'),
        ]
      : [],
  );
  useEffect(() => {
    setUrl((prev) => ({
      search: {
        ...prev.search,
        // page: 1,
      },
      filter: {
        ...prev.filter,
        'last_known_institutions.id': selectedInstitution.join('|'),
      },
    }));
  }, [selectedInstitution]);
  useEffect(() => {
    setUrl((prev) => ({
      search: {
        ...prev.search,
        // page: 1,
      },
      filter: {
        ...prev.filter,
        'last_known_institutions.country_code': selectedCountry.join('|'),
      },
    }));
  }, [selectedCountry]);
  return (
    <authorSideContext.Provider
      value={{
        selectedInstitution,
        setSelectedInstitution,
        selectedCountry,
        setSelectedCountry,
      }}
    >
      {children}
    </authorSideContext.Provider>
  );
};
export const useAuthorSide = () => {
  return useContext(authorSideContext);
};
