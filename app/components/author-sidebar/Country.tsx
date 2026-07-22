import { useQuery } from '@tanstack/react-query';
import { fetchAuthors, fetchCountries } from '../../api/api';
import { IoGlobeOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useAuthorSide } from '../../../Context/AuthorSideContext';
import { useAuthorUrl } from '../../../Context/AuthorUrlContext';
import CountryModal from '../filters/CountryModal';
const Country = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { url, setUrl } = useAuthorUrl();
  const { selectedCountry, setSelectedCountry } = useAuthorSide();
  const [urlObj, setUrlObj] = useState({
    filter: {},
    search: { group_by: 'last_known_institutions.country_code' },
  });
  const { data } = useQuery({
    queryKey: ['country', urlObj],
    queryFn: () => fetchAuthors('', urlObj),
  });
  const [urlselected, setUrlSelected] = useState({});
  useEffect(() => {
    setUrlSelected((prev) => ({
      search: {},
      filter: {
        id:
          selectedCountry.map((i) => i.replace('/countries', '')).join('|') ||
          '',
      },
    }));
  }, [selectedCountry]);
  const { data: selectedData } = useQuery({
    queryKey: ['selected-countries', urlselected],
    queryFn: () => fetchCountries(urlselected),
    enabled: selectedCountry.length > 0,
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
      setSelectedCountry((prev) => [...prev, e.target.name]);
    } else {
      setSelectedCountry(selectedCountry.filter((i) => i !== e.target.name));
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
        <IoGlobeOutline size={20} />
        <span>Country</span>
      </h2>
      <div>
        {selectedCountry.length > 0 &&
          selectedData?.results.map((item) => (
            <div key={item.id} className="flex justify-between ">
              <div>
                <input
                  type="checkbox"
                  name={item.id.replace('https://openalex.org/', '')}
                  id={item.id.replace('https://openalex.org/', '')}
                  className="mr-1"
                  checked={selectedCountry.includes(
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
        {selectedCountry.length === 0 &&
          data?.group_by.slice(0, 5).map((item) => (
            <div key={item.key} className="flex justify-between ">
              <div>
                <input
                  type="checkbox"
                  name={item.key.replace('https://openalex.org/', '')}
                  id={item.key.replace('https://openalex.org/', '')}
                  className="mr-1"
                  checked={selectedCountry.includes(
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
      <CountryModal
        data={data}
        selectedData={selectedData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default Country;
