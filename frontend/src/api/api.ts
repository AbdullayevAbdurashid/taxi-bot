export function api(params) {
  const { url, method, data } = params;
  return fetch(import.meta.env.VITE_API_ENDPOINT+url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => {
        throw new Error(error.message || 'Something went wrong');
      });
    }
    return res.json();
  });
}

const apiMethods = {
  get(url) {
    return api({ url, method: 'GET' });
  },
  post(url, data) {
    return api({ url, method: 'POST', data });
  },
  put(url, data) {
    return api({ url, method: 'PUT', data });
  },
  delete(url) {
    return api({ url, method: 'DELETE' });
  },
};

export default apiMethods;
