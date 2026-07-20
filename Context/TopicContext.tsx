import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useUrl } from './UrlContext';

const topicContext = createContext(null);

export const TopicProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { url, setUrl } = useUrl();
  const [selectedTopic, setSelectedTopic] = useState(
    searchParams.get('primary_topic.id')
      ? [searchParams.get('primary_topic.id')]
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
  return (
    <topicContext.Provider value={{ selectedTopic, setSelectedTopic }}>
      {children}
    </topicContext.Provider>
  );
};
export const useSelectedTopics = () => {
  return useContext(topicContext);
};
