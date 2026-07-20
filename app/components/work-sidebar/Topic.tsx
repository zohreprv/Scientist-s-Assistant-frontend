import { useQuery } from '@tanstack/react-query';
import { useUrl } from '../../../Context/UrlContext';
import { fetchWorks } from '../../api/api';
import { FiTag } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import TopicModal from '../filters/TopicModal';
import { useSelectedTopics } from '../../../Context/TopicContext';
const Topic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedTopic, setSelectedTopic } = useSelectedTopics();
  const { url, setUrl } = useUrl();
  const [urlObj, setUrlObj] = useState({
    filter: { ...url.filter },
    search: { group_by: 'primary_topic.id' },
  });
  const { data } = useQuery({
    queryKey: ['topic', urlObj],
    queryFn: () => fetchWorks(urlObj),
  });
  return (
    <>
      <h2 className="sidefilter-heading">
        <FiTag size={20} />
        Topic
      </h2>
      <div>
        {data?.group_by?.slice(0, 5).map((item) => (
          <div key={item.key} className="flex justify-between ">
            <div>
              <input
                type="checkbox"
                name={item.key.replace('https://openalex.org/', '')}
                id={item.key}
                className="mr-1"
                checked={selectedTopic.includes(
                  item.key.replace('https://openalex.org/', ''),
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTopic((prev) => [...prev, e.target.name]);
                  } else {
                    setSelectedTopic(
                      selectedTopic.filter((i) => i !== e.target.name),
                    );
                  }
                  setUrl({
                    ...url,
                    search: {
                      ...url.search,
                      page: 1,
                    },
                  });
                }}
              />
              <label className="sidebar" htmlFor={item.key}>
                {item.key_display_name}
              </label>
            </div>
            <p>{item.count.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row-reverse">
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
      <TopicModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Topic;
