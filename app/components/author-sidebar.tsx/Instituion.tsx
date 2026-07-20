import { useQuery } from '@tanstack/react-query';
import { fetchAuthors } from '../../api/api';
import { BiSolidInstitution } from 'react-icons/bi';
import { useState } from 'react';
import { useAuthorSide } from '../../../Context/AuthorSideContext';
import { useAuthorUrl } from '../../../Context/AuthorUrlContext';
import InstitutionModal from '../filters/InstitutionModal';

const Institution = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { url, setUrl } = useAuthorUrl();
  const { selectedInstitution, setSelectedInstitution } = useAuthorSide();
  const [urlObj, setUrlObj] = useState({
    filter: {},
    search: { group_by: 'last_known_institutions.id' },
  });
  const { data } = useQuery({
    queryKey: ['institution', urlObj],
    queryFn: () => fetchAuthors('', urlObj),
  });

  return (
    <>
      <h2 className="sidefilter-heading">
        <BiSolidInstitution size={20} />
        <span>Institution</span>
      </h2>
      <div>
        {data?.group_by.slice(0, 5).map((item) => (
          <div key={item.key} className="flex justify-between ">
            <div>
              <input
                type="checkbox"
                name={item.key.replace('https://openalex.org/', '')}
                id={item.key}
                className="mr-1"
                checked={selectedInstitution.includes(
                  item.key.replace('https://openalex.org/', ''),
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedInstitution((prev) => [...prev, e.target.name]);
                  } else {
                    setSelectedInstitution(
                      selectedInstitution.filter((i) => i !== e.target.name),
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
      <InstitutionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default Institution;
