import BarChart from './charts/BarChart';
import DoughnutChart from './charts/DoughnutChart';
const AuthorsStats = ({ data }) => {
  if (!data) return;
  const year = data.counts_by_year.map((i) => i.year);
  const citeByYear = data.counts_by_year.map((i) => i.cited_by_count);
  const workByYear = data.counts_by_year.map((i) => i.works_count);

  return (
    <section
      className="h-fit border border-gray-500 p-5 rounded-lg"
      aria-label="Author statistics"
    >
      <div className="space-y-2 text-gray-300">
        <p>
          <strong>Works count: </strong>
          {data.works_count}
        </p>
        <p>
          <strong>Citation count: </strong>
          {data.cited_by_count}
        </p>
        <p>
          <strong>H-index: </strong>
          {data.summary_stats.h_index}
        </p>
        <p>
          <strong>I10-index: </strong>
          {data.summary_stats.i10_index}
        </p>
        <div aria-label="Citation and works by year charts">
          <BarChart
            xData={year}
            yData={citeByYear}
            label={'Citation by year'}
          />

          <div className="sr-only">
            <h4>Citation by year data</h4>
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Citations</th>
                </tr>
              </thead>
              <tbody>
                {year.map((y, index) => (
                  <tr key={y}>
                    <td>{y}</td>
                    <td>{citeByYear[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <BarChart xData={year} yData={workByYear} label={'Works by year'} />

          <div className="sr-only">
            <h4>Works by year data</h4>
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Number of Works</th>
                </tr>
              </thead>
              <tbody>
                {year.map((y, index) => (
                  <tr key={y}>
                    <td>{y}</td>
                    <td>{workByYear[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorsStats;
