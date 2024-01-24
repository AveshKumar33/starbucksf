const getToken = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-token`)
    .then(async (response) => {
      const data = await response.json();
      return data.token;
    })
    .catch((error) => {
      console.log(error);
    });
};

async function createRequest<T>(url: string, method: string, body?: any): Promise<T> {
  const jwt = await getToken();

  let adminData: { email?: string } = {};
  const adminString = localStorage.getItem("Admin");
  if (adminString) {
    adminData = JSON.parse(adminString);
  }

  const headers: Record<string, string> = {
    "Content-type": "application/json",
    Authorization: `Bearer ${jwt}`,
  };

  if (adminData && adminData.email) {
    headers["Admin-Email"] = adminData.email;
  }

  const config = {
    method,
    headers,
    body: body,
  };

  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, config)
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        return error;
      }
      return response.json() as Promise<T>;
    })
    .catch((error) => {
      throw new Error("Error: ", error);
    });
}

const http_without_json_url = {
  get: <T>(url: string) => createRequest<T>(url, "GET", undefined),
  post: <T>(url: string, body: any) => createRequest<T>(url, "POST", body),
  put: <T>(url: string, body: any) => createRequest<T>(url, "PUT", body),
  delete: <T>(url: string) => createRequest<T>(url, "DELETE"),
};

export default http_without_json_url;
