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
    headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  }

  params = {
    ...params,
  };
  params = new URLSearchParams(params).toString();

  url = `${process.env.VUE_APP_BASE_URL}${url}?${params}`;

  const response = await fetch(url, {
    method,
    body,
    headers,
  });
  const data = await response.json();
  if (data.err) {
    throw new Error(data.err);
  }
  return data.payload;
};

export { useHttp };