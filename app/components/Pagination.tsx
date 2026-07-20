const Pagination = ({ data, urlObj, setUrlObj }) => {
  if (!data) return null;
  if (data.meta.count === 0 || data.results.length === 0)
    return <p>No match found</p>;
  const page = urlObj.search.page;
  const perPage = urlObj.search.per_page;
  const total = data.meta.count < perPage * 5 ? data.meta.count : perPage * 5;
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = Array.from({ length: totalPages }).map((_, i) => i + 1);

  return (
    <nav className="flex justify-center gap-1.5" role="navigation">
      {pageNumbers.map((n) => (
        <button
          className={`text-white w-6 h-6 text-center rounded
            ${page === n ? 'bg-blue-400' : 'bg-blue-600'}
          cursor-pointer`}
          onClick={() => {
            setUrlObj({
              ...urlObj,
              search: { ...urlObj.search, page: n },
            });
          }}
          key={n}
          aria-label={`page ${n}`}
        >
          {n}
        </button>
      ))}{' '}
    </nav>
  );
};

export default Pagination;
