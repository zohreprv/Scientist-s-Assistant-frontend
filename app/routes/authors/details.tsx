import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';
import { fetchAuthors, fetchWorks } from '../../api/api.js';
import { IoArrowBack, IoPersonOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import type { Route } from './+types/details';
import AuthorsProfile from '~/components/AuthorsProfile';
import AuthorsWorks from '~/components/AuthorsWorks';
import AuthorsStats from '~/components/AuthorsStats';
import SortFilter from '~/components/filters/Sort';
import Type from '~/components/filters/Type';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Author Details' },
    {
      name: 'description',
      content: 'author detail page including profile and works',
    },
  ];
}

export default function AuthorDetailsPage() {
  const { authorId } = useParams();

  const [works, setWorks] = useState([]);
  const [urlObj, setUrlObj] = useState({
    search: {
      sort: `publication_year:desc`,
      page: 1,
      per_page: 10,
    },
    filter: {
      'author.id': authorId,
    },
  });
  const [urlObjAuthor, setUrlObjAuthor] = useState({
    search: {},
    filter: {},
  });
  const { data } = useQuery({
    queryKey: ['authorDetail', authorId],
    queryFn: () => fetchAuthors(authorId, urlObjAuthor),
    retry: 2,
    enabled: !!authorId,
  });

  const { data: workData } = useQuery({
    queryKey: ['authorsWorks', urlObj],
    queryFn: () => fetchWorks(urlObj),
    retry: 2,
    enabled: !!authorId,
  });
  // `&filter=author.id:${authorId}&sort=publication_date:desc&page=${page}&per_page=${perPage}`,

  useEffect(() => {
    if (data?.display_name) {
      document.title = data.display_name;
    }
  }, [data]);

  useEffect(() => {
    if (workData?.results) {
      setWorks((prev) => [...prev, ...workData.results]);
    }
  }, [workData]);

  const handleSortChange = (newSort) => {
    setWorks([]);
    setUrlObj({
      ...urlObj,
      search: {
        ...urlObj.search,
        sort: newSort,
        page: 1,
      },
    });
  };

  const handleShowMore = () => {
    setUrlObj({
      ...urlObj,
      search: {
        ...urlObj.search,
        page: urlObj.search.page + 1,
      },
    });
  };
  return (
    <div className="mx-auto p-5 py-10 md:px-25 space-y-5">
      <div className="flex items-center space-x-1 mb-5 text-gray-50">
        <Link
          to="/authors"
          role="link"
          aria-label="link back to author search page"
        >
          <IoArrowBack size={20} />
        </Link>
        <div className="flex items-center gap-1" aria-hidden={true}>
          <IoPersonOutline />
          <span>Author</span>
        </div>
      </div>

      {data && (
        <h1 className="text-gray-100 font-bold text-3xl mb-2">
          {data.display_name}
        </h1>
      )}
      {/* desktop */}
      <div className="lg:mx-auto gap-5 hidden lg:flex ">
        <div className=" flex-1 space-y-5">
          <AuthorsProfile data={data} />
          <div className="flex gap-2 items-center">
            <SortFilter
              sort={urlObj.search.sort}
              handleSortChange={handleSortChange}
            />
            <Type urlObj={urlObj} setUrlObj={setUrlObj} setWorks={setWorks} />
          </div>
          <AuthorsWorks
            works={works}
            workData={workData}
            urlObj={urlObj}
            handleShowMore={handleShowMore}
          />
        </div>

        <div className="max-w-lg" aria-live="polite" aria-atomic="true">
          <AuthorsStats data={data} />
        </div>
      </div>
      {/* mobile */}
      <div className="mx-auto block lg:hidden">
        <div className="space-y-5">
          <AuthorsProfile data={data} />
          <AuthorsStats data={data} />
          <div className="flex gap-2 items-center">
            <SortFilter
              sort={urlObj.search.sort}
              handleSortChange={handleSortChange}
            />
            <Type urlObj={urlObj} setUrlObj={setUrlObj} setWorks={setWorks} />
          </div>
          <AuthorsWorks
            works={works}
            workData={workData}
            urlObj={urlObj}
            handleShowMore={handleShowMore}
          />

          <AuthorsWorks
            works={works}
            workData={workData}
            urlObj={urlObj}
            handleShowMore={handleShowMore}
          />
        </div>
      </div>
    </div>
  );
}
