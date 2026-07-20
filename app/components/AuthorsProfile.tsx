import { useState } from 'react';
const AuthorsProfile = ({ data }) => {
  if (!data) return;
  const [affiliationsLength, setAffiliationsLength] = useState(5);
  const affiliations = data.affiliations.slice(0, affiliationsLength);
  return (
    <div className="border border-gray-500 p-5 rounded-lg space-y-2">
      <div className="text-gray-100">
        <strong>
          {data.last_known_institutions?.length > 1
            ? 'Institutions: '
            : 'Institution: '}
        </strong>
        {data.last_known_institutions?.map((i) => i.display_name).join(', ')}
      </div>
      <div className="text-gray-400">
        <strong>
          {data.affiliations?.length > 1
            ? 'Observed institutions: '
            : 'Observed instutution: '}
        </strong>
        <span>
          {affiliations.map((a) => a.institution?.display_name).join(', ')}
          <button
            className={`ml-2 underline underline-offset-2 cursor-pointer hover:text-blue-500
                    ${data.affiliations.length < 5 ? 'hidden' : ''}
                    `}
            onClick={() => {
              affiliationsLength < data.affiliations?.length
                ? setAffiliationsLength(data.affiliations?.length)
                : setAffiliationsLength(5);
            }}
          >
            {affiliationsLength < data.affiliations?.length
              ? `+${data.affiliations.length - affiliationsLength} more`
              : 'Less'}
          </button>
        </span>
      </div>
      {data.orcid && (
        <p className="text-gray-400">
          <strong>ORCID: </strong>
          <a href={data.orcid} target="_blank" rel="noopener noreferrer">
            {data.orcid}
          </a>
        </p>
      )}
    </div>
  );
};

export default AuthorsProfile;
