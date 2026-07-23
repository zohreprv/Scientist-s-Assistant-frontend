import { useQuery } from '@tanstack/react-query';
import { useUrl } from '../../../Context/UrlContext';
import { fetchWorks, fetchTopics } from '../../api/api';
import { FiTag } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import TopicModal from '../filters/TopicModal';
import { useWorkSide } from '../../../Context/WorkSideContext';
const Topic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedTopic, setSelectedTopic } = useWorkSide();
  const { url, setUrl } = useUrl();
  const [urlObj, setUrlObj] = useState({
    filter: { ...url.filter },
    search: { group_by: 'primary_topic.id' },
  });
  const { data } = useQuery({
    queryKey: ['topic', urlObj],
    queryFn: () => fetchWorks(urlObj),
  });
  const [urlselected, setUrlSelected] = useState({});
  useEffect(() => {
    setUrlSelected((prev) => ({
      search: {},
      filter: {
        id: selectedTopic.join('|') || '',
      },
    }));
  }, [selectedTopic]);
  const { data: selectedData } = useQuery({
    queryKey: ['selected-countries', urlselected],
    queryFn: () => fetchTopics(urlselected),
    enabled: selectedTopic.length > 0,
    placeholderData: (previousData) => {
      if (previousData?.results?.length < 5) {
        return previousData;
      } else {
        return null;
      }
    },
  });
  const handleOnChange = (e) => {
    if (e.target.checked) {
      setSelectedTopic((prev) => [...prev, e.target.name]);
    } else {
      setSelectedTopic(selectedTopic.filter((i) => i !== e.target.name));
    }
    setUrl({
      ...url,
      search: {
        ...url.search,
        page: 1,
      },
    });
  };
  return (
    <div>
      <h2 className="sidefilter-heading">
        <FiTag size={20} />
        Topic
      </h2>
      <div className="h-[30vh]">
        {selectedTopic.length > 0 &&
          selectedData?.results.map((item) => (
            <div key={item.id} className="flex justify-between ">
              <div>
                <input
                  type="checkbox"
                  name={item.id.replace('https://openalex.org/', '')}
                  id={item.id.replace('https://openalex.org/', '')}
                  className="mr-1"
                  checked={selectedTopic.includes(
                    item.id.replace('https://openalex.org/', ''),
                  )}
                  onChange={handleOnChange}
                />
                <label
                  className="sidebar"
                  htmlFor={item.id.replace('https://openalex.org/', '')}
                >
                  {item.display_name}
                </label>
              </div>
              <p>{item.works_count.toLocaleString()}</p>
            </div>
          ))}
        {selectedTopic.length === 0 &&
          data?.group_by.slice(0, 5).map((item) => (
            <div key={item.key} className="flex justify-between ">
              <div>
                <input
                  type="checkbox"
                  name={item.key.replace('https://openalex.org/', '')}
                  id={item.key.replace('https://openalex.org/', '')}
                  className="mr-1"
                  checked={selectedTopic.includes(
                    item.key.replace('https://openalex.org/', ''),
                  )}
                  onChange={handleOnChange}
                />
                <label
                  className="sidebar"
                  htmlFor={item.key.replace('https://openalex.org/', '')}
                >
                  {item.key_display_name}
                </label>
              </div>
              <p>{item.count.toLocaleString()}</p>
            </div>
          ))}
      </div>
      <div className="flex flex-row-reverse mt-5">
        <button
          className="sidebar-more-btn"
          onClick={(e) => {
            setIsModalOpen(true);
          }}
          role="button"
          aria-haspopup="true"
          aria-expanded={isModalOpen}
        >
          More...
        </button>
      </div>
      <TopicModal
        data={data}
        selectedData={selectedData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Topic;
