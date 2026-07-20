import { BsArrowsAngleExpand } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { PiNoteDuotone } from 'react-icons/pi';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';
const PaperDetails = ({
  paper,
  setSelectedPaper,
  urlObj,
  setUrlObj,
  paperShow,
  setPaperShow,
}) => {
  const initAuthorNum = 5;
  const [authorNumber, setAuthorNumber] = useState(initAuthorNum);
  const initAbsLength = 30;
  const [absLength, setAbsLength] = useState(initAbsLength);
  const componentRef = useRef(null);
  const a = paper.abstract_inverted_index;
  let arr;
  if (a) {
    const max = Math.max(...Object.values(a).flat());
    arr = Array.from({ length: max });
    for (let [word, positions] of Object.entries(a)) {
      for (let pos of positions) {
        arr[pos] = word;
      }
    }
  }
  const filterFields = ['cites', 'cited_by', 'related_to'];
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(e.target as Node)
      ) {
        setPaperShow(false);
      }
    };

    if (paperShow) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [paperShow]);

  return (
    <div ref={componentRef}>
      {/* @todo a detail page */}
      <div className="flex flex-row-reverse justify-between">
        {/* <button className="p-1 hover:bg-gray-200 rounded border border-white hover:border-gray-600 cursor-pointer">
          <BsArrowsAngleExpand size={20} />
        </button> */}
        <button
          className="p-1 hover:bg-gray-200 rounded border border-white hover:border-gray-600 cursor-pointer"
          onClick={() => {
            // setPaperShow(false);
            filterFields.some((field) => urlObj.filter[field])
              ? setPaperShow(false)
              : (setPaperShow(false),
                setTimeout(() => {
                  setSelectedPaper(null);
                }, 1000));
          }}
          role="button"
          aria-label="close modal"
        >
          <RxCross2 size={20} />
        </button>
      </div>
      <div className="flex flex-col p-5 divide-y divide-gray-400">
        <div className="flex flex-col gap-5 pb-5">
          <div>
            <div className="flex gap-2 items-center">
              <PiNoteDuotone />
              Work
            </div>
          </div>
          <h3 className="text-xl lg:text-4xl font-bold">{paper.title}</h3>
          <div className="flex gap-2">
            <a
              href={paper.best_oa_location?.landing_page_url}
              rel="noopener noreferrer"
              target="_blank"
              className={`px-3 py-1 w-fit text-white bg-black rounded hover:opacity-70
              cursor-pointer
     ${paper.best_oa_location === null || paper.best_oa_location.landing_page_url === null ? 'hidden' : ''}`}
            >
              HTML
            </a>
            {!paper.open_access.is_oa && paper.doi && (
              <a
                href={paper.doi}
                rel="noopener noreferrer"
                target="_blank"
                className={`flex items-center gap-1 px-3 py-1 w-fit text-white bg-black rounded opacity-60
              cursor-pointer`}
              >
                <FaLock />
                HTML
              </a>
            )}
            <a
              href={paper.best_oa_location?.pdf_url}
              rel="noopener noreferrer"
              target="_blank"
              className={`px-3 py-1 w-fit text-white bg-black rounded hover:opacity-70
              cursor-pointer
     ${paper.best_oa_location === null || paper.best_oa_location.pdf_url === null ? 'hidden' : ''}`}
            >
              PDF
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-1 py-5">
          <p>
            <strong>Year: </strong>
            {paper.publication_year}
          </p>
          <p>
            <strong>Type: </strong>
            {paper.type}
          </p>
          <p className={!arr ? 'hidden' : ''}>
            <strong>Abstract: </strong>
            <span aria-hidden={true}>{arr?.slice(0, absLength).join(' ')}</span>
            <span className="sr-only">{arr?.join(' ')}</span>
            <button
              className={`w-fit hover:underline hover:underline-offset-2
             hover:text-blue-600 hover:cursor-pointer ${!arr || arr.length <= initAbsLength ? 'hidden' : ''}`}
              onClick={() => {
                absLength < arr.length
                  ? setAbsLength(arr.length)
                  : setAbsLength(initAbsLength);
              }}
              aria-hidden={true}
            >
              {' '}
              {absLength < arr?.length ? '...more' : '(less)'}
            </button>
          </p>
          {paper.authorships.length > 0 && (
            <>
              <p aria-hidden={true}>
                <strong>Author: </strong>
                {paper.authorships.slice(0, authorNumber).map((a, index) => {
                  if (a.author?.id) {
                    return (
                      <Link
                        key={index}
                        to={`/authors/${a.author?.id?.replace('https://openalex.org/', '')}`}
                        className="hover:underline hover:underline-offset-2 hover:text-blue-600 hover:cursor-pointer"
                        onClick={() => setSelectedPaper(null)}
                      >
                        {a.author.display_name}
                        {index < paper.authorships.length - 1 ? ', ' : '.'}
                      </Link>
                    );
                  } else {
                    return (
                      <span key={index}>
                        {a.author.display_name}
                        {index < paper.authorships.length - 1 ? ', ' : '.'}
                      </span>
                    );
                  }
                })}
                <button
                  className={`ml-1 hover:underline hover:underline-offset-2
             hover:text-blue-600 hover:cursor-pointer 
             ${paper.authorships.length <= initAuthorNum ? 'hidden' : ''}`}
                  onClick={() => {
                    authorNumber < paper.authorships.length
                      ? setAuthorNumber(paper.authorships.length)
                      : setAuthorNumber(initAuthorNum);
                  }}
                >
                  {authorNumber < paper.authorships.length ? 'more...' : 'less'}
                </button>
              </p>
              <p className="sr-only">
                <strong>Author: </strong>
                {paper.authorships
                  .slice(0, paper.authorships.length)
                  .map((a, index) => {
                    if (a.author?.id) {
                      return (
                        <Link
                          key={index}
                          to={`/authors/${a.author?.id?.replace('https://openalex.org/', '')}`}
                          className="hover:underline hover:underline-offset-2 hover:text-blue-600 hover:cursor-pointer"
                          onClick={() => setSelectedPaper(null)}
                        >
                          {a.author.display_name}
                          {index < paper.authorships.length - 1 ? ', ' : '.'}
                        </Link>
                      );
                    } else {
                      return (
                        <span key={index}>
                          {a.author.display_name}
                          {index < paper.authorships.length - 1 ? ', ' : '.'}
                        </span>
                      );
                    }
                  })}
              </p>
            </>
          )}
          {paper.language && (
            <p>
              <strong>Language: </strong>
              {paper.language &&
                new Intl.DisplayNames(['en'], { type: 'language' }).of(
                  paper.language,
                )}
            </p>
          )}
        </div>
        {(Number(paper.cited_by_count) !== 0 ||
          Number(paper.referenced_works_count) !== 0 ||
          paper.related_works.length !== 0) && (
          <div className="flex flex-col gap-1 py-5">
            {paper.cited_by_count !== 0 && (
              <div>
                <strong>Cited by: </strong>
                <button
                  onClick={() => {
                    setPaperShow(false);
                    setUrlObj({
                      search: {
                        ...urlObj.search,
                        per_page: 10,
                        page: 1,
                      },
                      filter: {
                        ...urlObj.filter,
                        publication_year: '',
                        'title_and_abstract.search': '',
                        cites: paper.id.replace('https://openalex.org/', ''),
                        ...filterFields.reduce((acc, key) => {
                          if (key === 'cites') {
                            return acc;
                          } else {
                            return { ...acc, [key]: '' };
                          }
                        }, {}),
                      },
                    });
                    setTimeout(() => {
                      document.getElementById('selected-paper')?.focus();
                    }, 1000);
                  }}
                  className="w-fit text-blue-600 hover:underline hover:underline-offset-2 cursor-pointer"
                  aria-label={`select to read  ${paper.cited_by_count} works cited this paper`}
                >
                  {paper.cited_by_count}
                </button>
              </div>
            )}
            {paper.referenced_works_count !== 0 && (
              <div>
                <strong>Cites: </strong>
                <button
                  onClick={() => {
                    setPaperShow(false);
                    setUrlObj({
                      search: {
                        ...urlObj.search,
                        per_page: 10,
                        page: 1,
                      },
                      filter: {
                        ...urlObj.filter,
                        publication_year: '',
                        'title_and_abstract.search': '',
                        ...filterFields.reduce((acc, key) => {
                          if (key === 'cited_by') {
                            return acc;
                          } else {
                            return { ...acc, [key]: '' };
                          }
                        }, {}),
                        cited_by: paper.id.replace('https://openalex.org/', ''),
                      },
                    });
                  }}
                  className="w-fit text-blue-600 hover:underline hover:underline-offset-2 cursor-pointer"
                  aria-label={`select to read  ${paper.referenced_works_count} works this paper cited`}
                >
                  {paper.referenced_works_count}
                </button>
              </div>
            )}

            {paper.related_works.length !== 0 && (
              <div>
                <strong>Related to: </strong>
                <button
                  onClick={() => {
                    setPaperShow(false);
                    setUrlObj({
                      search: {
                        ...urlObj.search,
                        per_page: 10,
                        page: 1,
                      },
                      filter: {
                        ...urlObj.filter,
                        publication_year: '',
                        'title_and_abstract.search': '',
                        ...filterFields.reduce((acc, key) => {
                          if (key === 'related_to') {
                            return acc;
                          } else {
                            return { ...acc, [key]: '' };
                          }
                        }, {}),
                        related_to: paper.id.replace(
                          'https://openalex.org/',
                          '',
                        ),
                      },
                    });
                  }}
                  className="w-fit text-blue-600 hover:underline hover:underline-offset-2 cursor-pointer"
                  aria-label={`select to read  ${paper.related_works.length} works related to this paper `}
                >
                  {paper.related_works.length}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1 py-5">
          {paper.primary_topic && (
            <div>
              <strong>Topic: </strong>
              <button
                // onClick={() => {
                //   setUrlObj({
                //     search: {
                //       ...urlObj.search,
                //       per_page: 10,
                //       page: 1,
                //     },
                //     filter: {
                //       ...urlObj.filter,
                //       publication_year: '',
                //       ...filterFields.reduce((acc, key) => {
                //         if (key === 'related_to') {
                //           return acc;
                //         } else {
                //           return { ...acc, [key]: '' };
                //         }
                //       }, {}),
                //       related_to: paper.id.replace('https://openalex.org/', ''),
                //     },
                //   });
                // }}
                className="w-fit text-blue-600 hover:underline hover:underline-offset-2 cursor-pointer"
                aria-label={`select to read about topic ${paper.primary_topic.display_name}`}
              >
                {paper.primary_topic.display_name}
              </button>
            </div>
          )}
          {paper.primary_topic?.field && (
            <div>
              <strong>Field: </strong>
              <button
                // onClick={() => {
                //   setUrlObj({
                //     search: {
                //       ...urlObj.search,
                //       per_page: 10,
                //       page: 1,
                //     },
                //     filter: {
                //       ...urlObj.filter,
                //       publication_year: '',
                //       ...filterFields.reduce((acc, key) => {
                //         if (key === 'related_to') {
                //           return acc;
                //         } else {
                //           return { ...acc, [key]: '' };
                //         }
                //       }, {}),
                //       related_to: paper.id.replace('https://openalex.org/', ''),
                //     },
                //   });
                // }}
                className="w-fit text-blue-600 hover:underline hover:underline-offset-2 cursor-pointer"
                aria-label={`select to read about field ${paper.primary_topic.field.display_name}`}
              >
                {paper.primary_topic.field.display_name}
              </button>
            </div>
          )}
          {paper.primary_topic?.domain && (
            <div>
              <strong>Domain: </strong>
              <button
                // onClick={() => {
                //   setUrlObj({
                //     search: {
                //       ...urlObj.search,
                //       per_page: 10,
                //       page: 1,
                //     },
                //     filter: {
                //       ...urlObj.filter,
                //       publication_year: '',
                //       ...filterFields.reduce((acc, key) => {
                //         if (key === 'related_to') {
                //           return acc;
                //         } else {
                //           return { ...acc, [key]: '' };
                //         }
                //       }, {}),
                //       related_to: paper.id.replace('https://openalex.org/', ''),
                //     },
                //   });
                // }}
                className="w-fit text-blue-600 hover:underline hover:underline-offset-2 cursor-pointer"
                aria-label={`select to read about domain ${paper.primary_topic.domain.display_name}`}
              >
                {paper.primary_topic.domain.display_name}
              </button>
            </div>
          )}
          {paper.primary_topic?.subfield && (
            <div>
              <strong>Subfield: </strong>
              <button
                // onClick={() => {
                //   setUrlObj({
                //     search: {
                //       ...urlObj.search,
                //       per_page: 10,
                //       page: 1,
                //     },
                //     filter: {
                //       ...urlObj.filter,
                //       publication_year: '',
                //       ...filterFields.reduce((acc, key) => {
                //         if (key === 'related_to') {
                //           return acc;
                //         } else {
                //           return { ...acc, [key]: '' };
                //         }
                //       }, {}),
                //       related_to: paper.id.replace('https://openalex.org/', ''),
                //     },
                //   });
                // }}
                className="w-fit text-blue-600 hover:underline hover:underline-offset-2 cursor-pointer"
                aria-label={`select to read about subfield ${paper.primary_topic.subfield.display_name}`}
              >
                {paper.primary_topic.subfield.display_name}
              </button>
            </div>
          )}
          {paper.sustainable_development_goals.length > 0 && (
            <div>
              <strong>SDG: </strong>
              {paper.sustainable_development_goals.map((s, index) => (
                <>
                  <button
                    // onClick={() => {
                    //   setUrlObj({
                    //     search: {
                    //       ...urlObj.search,
                    //       per_page: 10,
                    //       page: 1,
                    //     },
                    //     filter: {
                    //       ...urlObj.filter,
                    //       publication_year: '',
                    //       ...filterFields.reduce((acc, key) => {
                    //         if (key === 'related_to') {
                    //           return acc;
                    //         } else {
                    //           return { ...acc, [key]: '' };
                    //         }
                    //       }, {}),
                    //       related_to: paper.id.replace('https://openalex.org/', ''),
                    //     },
                    //   });
                    // }}
                    className="w-fit text-blue-600 hover:underline hover:underline-offset-2 cursor-pointer"
                    aria-label={`select to read about sustainable development goals ${s.display_name}`}
                  >
                    {s.display_name}
                  </button>
                  {index < paper.sustainable_development_goals.length - 1
                    ? ', '
                    : ''}
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaperDetails;
