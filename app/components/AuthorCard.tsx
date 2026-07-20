import { Link } from 'react-router';
const AuthorCard = ({ author }) => {
  return (
    <div className="border border-gray-400 rounded-lg p-5 space-y-2">
      <Link
        to={`/authors/${author.id.replace('https://openalex.org/', '')}`}
        target="_blank"
        className="block cursor-pointer"
      >
        <h2 className="font-semibold text-gray-200 text-2xl">
          {author.full_name}
        </h2>
      </Link>
      <div className="flex flex-col gap-4">
        <div className="text-gray-200 line-clamp-3">
          {author.last_known_institutions
            ?.map((i) => i.display_name)
            .join(', ')}
        </div>
        <a
          href={author.orcid}
          className="block cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-gray-500">{author.orcid}</span>
        </a>
        <span className="text-sm text-gray-500">
          {author.topics?.map((t) => t.display_name).join(', ')}
        </span>
      </div>
    </div>
  );
};

export default AuthorCard;
