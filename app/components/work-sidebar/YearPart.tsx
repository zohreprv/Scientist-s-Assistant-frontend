import { useQuery } from '@tanstack/react-query';
import { fetchWorks } from '../../api/api';
import { useUrl } from '../../../Context/UrlContext';
import BarChart from '../charts/BarChart';
import { MdOutlineCalendarMonth } from 'react-icons/md';

const YearPart = () => {
  const { url, setUrl } = useUrl();

  const urlObj = {
    ...url,
    search: { group_by: 'publication_year' },
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ['year_sidebar', urlObj],
    queryFn: () => fetchWorks(urlObj),
    retry: 2,
  });
  if (!data) return;

  const sortedData = data?.group_by.sort(
    (a, b) => b.key_display_name - a.key_display_name,
  );
  const year = sortedData?.map((y) => y.key_display_name);
  const yearCount = sortedData?.map((i) => i.count);
  return (
    <div>
      <div className="sidefilter-heading">
        <MdOutlineCalendarMonth size={20} />
        Year
      </div>
      <BarChart xData={year} yData={yearCount} label="" />
      <div className="sr-only">
        <h4>number of works by year data</h4>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>number of works</th>
            </tr>
          </thead>
          <tbody>
            {year.map((y, index) => (
              <tr key={y}>
                <td>{y}</td>
                <td>{yearCount[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YearPart;
