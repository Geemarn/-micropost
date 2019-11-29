class EasyHttp {
  //make http GET request
  async get(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  //make http POST request
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
  }

  //make http PUT request
  async update(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
  }

  //make http DELETE request
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    });

    const result = await "resource deleted...";
    return result;
  }
}

export const http = new EasyHttp();
