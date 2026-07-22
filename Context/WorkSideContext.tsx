import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useUrl } from './UrlContext';

const workSideContext = createContext(null);

export const WorkSideProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { url, setUrl } = useUrl();
  const [selectedTopic, setSelectedTopic] = useState(
    searchParams.get('primary_topic.id')
      ? [...searchParams.get('primary_topic.id')?.split('|')]
      : [],
  );
  const [selectedType, setSelectedType] = useState(
    searchParams.get('last_known_institutions.country_code')
      ? [...searchParams.get('type')?.split('|')]
      : [],
  );
  useEffect(() => {
    setUrl({
      ...url,
      filter: {
        ...url.filter,
        'primary_topic.id': selectedTopic.join('|'),
      },
    });
  }, [selectedTopic]);
  useEffect(() => {
    setUrl({
      search: { ...url.search, page: 1 },
      filter: { ...url.filter, type: selectedType.join('|') },
    });
  }, [selectedType]);
  return (
    <workSideContext.Provider
      value={{ selectedTopic, setSelectedTopic, selectedType, setSelectedType }}
    >
      {children}
    </workSideContext.Provider>
  );
};
export const useWorkSide = () => {
  return useContext(workSideContext);
};
