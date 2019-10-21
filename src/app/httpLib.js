class Http {
  static async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  static async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }

  static async put(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }

  static async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const resData = await response.json();
    return 'post deleted await';
  }
}

export default Http;
