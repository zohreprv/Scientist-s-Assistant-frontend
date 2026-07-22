const API_URL = import.meta.env.VITE_API_URL;
export async function fetchWorks(urlObj) {
  const params = objectUrl(urlObj);
  const res = await fetch(`${API_URL}/api/works?${params.toString()}`);
  const data = await res.json();
  return data;
}
export async function fetchTopics(urlObj) {
  const params = objectUrl(urlObj);

  const res = await fetch(`${API_URL}/api/topics?${params.toString()}`);
  const data = await res.json();
  return data;
}
export async function fetchCountries(urlObj) {
  const params = objectUrl(urlObj);

  const res = await fetch(`${API_URL}/api/countries?${params.toString()}`);
  const data = await res.json();
  return data;
}
export async function fetchInstitutions(urlObj) {
  const params = objectUrl(urlObj);

  const res = await fetch(`${API_URL}/api/institutions?${params.toString()}`);
  const data = await res.json();
  return data;
}
export async function fetchAuthors(id, urlObj) {
  const params = objectUrl(urlObj);
  const res = await fetch(
    `${API_URL}/api/authors${id ? `/${id}` : ''}?${params.toString()}`,
  );
  const data = await res.json();
  return data;
}

const objectUrl = (urlObj) => {
  const filterPart = [];
  for (let [key, value] of Object.entries(urlObj.filter)) {
    if (value && value !== '') {
      filterPart.push(`${key}:${value}`);
    }
  }
  const params = new URLSearchParams();
  if (filterPart.length > 0) {
    params.set('filter', filterPart.join(','));
  }
  Object.entries(urlObj.search).forEach(([key, value]) => {
    if (value && value !== '') {
      params.set(key, value);
    }
  });
  return params;
};
