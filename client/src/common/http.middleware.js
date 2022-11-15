const useHttp = async (url, method = 'GET', body = null, params = {}, json = true) => {
  if (body) {
    if (json) {
      body = JSON.stringify(body);
    } else {
      const formData = new FormData();
      Object.keys(body).forEach(key => formData.append(key, body[key]));
      body = formData;
    }
  }

  const headers = {};
  if (json) {
    headers['Content-Type'] = 'application/json';
  }

  params = {
    ...params,
    // token: localStorage.getItem('token'),
  };
  params = new URLSearchParams(params).toString();

  url = `${process.env.VUE_APP_BASE_URL}${url}?${params}`;

  const response = await fetch(url, {
    method,
    body,
    headers,
  });
  const data = await response.json();
  if (data.ok === false) {
    throw new Error(payload.error);
  }
  return data.payload;
};

export { useHttp };