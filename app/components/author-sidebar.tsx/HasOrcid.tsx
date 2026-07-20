import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAuthors } from '../../api/api';
import DoughnutChart from '../charts/DoughnutChart';
import { FiTag } from 'react-icons/fi';
const HasOrcid = () => {
  const [urlObj] = useState({
    filter: {},
    search: { group_by: 'has_orcid' },
  });
  const { data } = useQuery({
    queryKey: ['has-orcid', urlObj],
    queryFn: () => fetchAuthors('', urlObj),
  });
  const ho = ['Has Orcid', 'Does Not Have Orcid '];
  const hoCount = data?.group_by.map((i) => i.count);
  return (
    <>
      <h2 className="flex items-center gap-2 text-gray-300 uppercase mt-5 mb-5">
        <FiTag size={20} />
        Has Orcid
      </h2>
      {data && (
        <div className="flex items-start gap-4">
          <div className="w-1/4 h-fit" aria-hidden={true}>
            <DoughnutChart xData={ho} yData={hoCount} label="" />
          </div>
          <div className=" text-xl">
            <p>
              {hoCount[0]
                ? (
                    (hoCount[0] * 100) /
                    hoCount.reduce((acc, c) => acc + c, 0)
                  ).toFixed(1)
                : 0}
              %
            </p>
            <p>
              <span className="sr-only">Total: </span>
              {hoCount.reduce((acc, c) => acc + c, 0).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default HasOrcid;
