const API_URL = import.meta.env.VITE_API_URL;
export async function fetchWorks(urlObj) {
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

  const res = await fetch(`${API_URL}/api/works?${params.toString()}`);
  const data = await res.json();
  return data;
}
export async function fetchTopics(search) {
  const res = await fetch(`${API_URL}/api/topics?q=${search}`);
  const data = await res.json();
  return data;
}
export async function fetchInstitutions(search) {
  const res = await fetch(`${API_URL}/api/institutions?q=${search}`);
  const data = await res.json();
  return data;
}
export async function fetchAuthors(id, urlObj) {
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
  const res = await fetch(
    `${API_URL}/api/authors${id ? `/${id}` : ''}?${params.toString()}`,
  );
  // `https://api.openalex.org/authors${id ? `/${id}` : ''}?api_key=HtUWpC1uSyIXKyCKkWwSdK&${params.toString()}`,
  const data = await res.json();
  return data;
}
