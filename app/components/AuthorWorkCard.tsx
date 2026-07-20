import { MdOutlineFormatQuote } from 'react-icons/md';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../components/ui/tooltip';

const AuthorWorkCard = ({ paper }) => {
  return (
    <div className="p-5">
      <div className="flex flex-col mb-2 justify-between md:items-center gap-1 md:flex-row">
        <div className="flex flex-col">
          <h2 className="text-md md:text-xl text-white md:font-semibold hover:cursor-pointer">
            {paper.title}
          </h2>
          <a
            href={paper.doi}
            rel="noopener noreferrer"
            target="_blank"
            className="font-light text-sm w-fit text-blue-400 ml-2 hover:underline hover:underline-offset-2 cursor-pointer"
            role="link"
            aria-label="doi"
          >
            {paper.doi}
          </a>
        </div>
        {paper.best_oa_location?.pdf_url && (
          <a
            href={paper.best_oa_location.pdf_url}
            rel="noopener noreferrer"
            target="_blank"
            className="px-3 py-1/2 w-fit border border-gray-200 bg-gray-300
             text-gray-800 rounded hover:bg-gray-400 hover:border-gray-600
              cursor-pointer"
          >
            PDF
          </a>
        )}
      </div>
      <div className="text-gray-300">
        <span>
          {paper.publication_year} &bull;{' '}
          {paper.authorships
            .slice(0, 2)
            .map((a) => a.author.display_name)
            .join(', ')}
          , et al. &bull;{' '}
        </span>

        <Tooltip>
          <TooltipTrigger
            className="inline-flex items-center gap-2 ml-1 hover:underline
           hover:underline-offset-2 cursor-pointer "
            aria-label={`cited by ${paper.cited_by_count?.toLocaleString() || 0} works `}
          >
            <span className="flex items-center gap-1">
              {<MdOutlineFormatQuote color="#b4a4f4" aria-hidden="true" />}
              <span aria-hidden="true">
                {paper.cited_by_count.toLocaleString() || 0}
              </span>
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-neutral-200 text-neutral-950 dark:bg-neutral-50 [&_svg]:bg-neutral-200 [&_svg]:fill-neutral-200 dark:[&_svg]:bg-neutral-50 dark:[&_svg]:fill-neutral-50">
            {`cited by ${paper.cited_by_count.toLocaleString()} works`}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default AuthorWorkCard;
