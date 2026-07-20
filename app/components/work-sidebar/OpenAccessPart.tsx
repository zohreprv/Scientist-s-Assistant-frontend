import { useQuery } from '@tanstack/react-query';
import { fetchWorks } from '../../api/api.js';
import { useUrl } from '../../../Context/UrlContext';
import DoughnutChart from '../charts/DoughnutChart';
import { FaUnlockAlt } from 'react-icons/fa';
import Logo from '../logo.js';
const SideBar = () => {
  const { url } = useUrl();

  const urlObj = {
    ...url,
    search: { group_by: 'is_oa' },
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ['open-access', urlObj],
    queryFn: () => fetchWorks(urlObj),
    retry: 2,
  });
  const op = ['Open', 'Not Open'];
  const opCount = data?.group_by.map((i) => i.count);
  return (
    <div>
      <Logo />
      {data && !isLoading && !error && (
        <>
          <h2 className="text-gray-300 uppercase mb-5">Access Type</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>All papers</div>
              <div>{data.meta.count.toLocaleString()}</div>
            </div>
            <div className="flex justify-between">
              <div>Open access</div>
              <div>
                {data.group_by
                  .find((g) => g.key_display_name === 'true')
                  ?.count.toLocaleString() || 0}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Closed access</div>
              <div>
                {data.group_by
                  .find((g) => g.key_display_name === 'false')
                  ?.count.toLocaleString() || 0}
              </div>
            </div>
            <div>
              <h2 className="flex gap-2 text-gray-300 uppercase mt-5 mb-5">
                <FaUnlockAlt />
                Open Access
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-1/4 h-fit" aria-hidden={true}>
                  <DoughnutChart xData={op} yData={opCount} label="" />
                </div>
                <div className=" text-xl">
                  <p>
                    {opCount[0]
                      ? (
                          (opCount[0] * 100) /
                          opCount.reduce((acc, c) => acc + c, 0)
                        ).toFixed(1)
                      : 0}
                    %
                  </p>
                  <p>
                    <span className="sr-only">Total: </span>
                    {opCount.reduce((acc, c) => acc + c, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
