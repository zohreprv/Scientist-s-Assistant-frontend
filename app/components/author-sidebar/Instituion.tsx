import { useQuery } from '@tanstack/react-query';
import { fetchAuthors, fetchInstitutions } from '../../api/api';
import { BiSolidInstitution } from 'react-icons/bi';
import { useEffect, useState } from 'react';
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
  const [urlselected, setUrlSelected] = useState({});
  useEffect(() => {
    setUrlSelected((prev) => ({
      search: {},
      filter: { id: selectedInstitution.join('|') || '' },
    }));
  }, [selectedInstitution]);
  const { data: selectedData } = useQuery({
    queryKey: ['selected-institution', urlselected],
    queryFn: () => fetchInstitutions(urlselected),
    enabled: selectedInstitution.length > 0,
    placeholderData: (previousData) => {
      if (previousData?.results.length < 5) {
        return previousData;
      } else {
        return null;
      }
    },
  });
  useEffect(() => {
    setUrlObj((prev) => ({
      ...prev,
      filter: {
        'last_known_institutions.country_code':
          url.filter['last_known_institutions.country_code'],
      },
    }));
  }, [url]);
  const handleOnChange = (e) => {
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
  };
  return (
    <>
      <h2 className="sidefilter-heading">
        <BiSolidInstitution size={20} />
        <span>Institution</span>
      </h2>
      <div>
        {selectedInstitution.length > 0 &&
          selectedData?.results.map((item) => (
            <div key={item.id} className="flex justify-between ">
              <div>
                <input
                  type="checkbox"
                  name={item.id.replace('https://openalex.org/', '')}
                  id={item.id.replace('https://openalex.org/', '')}
                  className="mr-1"
                  checked={selectedInstitution.includes(
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
        {selectedInstitution.length === 0 &&
          data?.group_by.slice(0, 5).map((item) => (
            <div key={item.key} className="flex justify-between ">
              <div>
                <input
                  type="checkbox"
                  name={item.key.replace('https://openalex.org/', '')}
                  id={item.key.replace('https://openalex.org/', '')}
                  className="mr-1"
                  checked={selectedInstitution.includes(
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
        data={data}
        selectedData={selectedData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default Institution;
