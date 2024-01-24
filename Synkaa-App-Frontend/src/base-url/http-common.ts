const API_BASE_URL = "http://localhost:5000";

async function createRequest<T>(url: string, method: string, body?: any): Promise<T> {
  let adminData: { email?: string } = {};
  const adminString = localStorage.getItem("Admin");
  if (adminString) {
    adminData = JSON.parse(adminString);
  }

  const headers: Record<string, string> = {
    "Content-type": "application/json",
  };

  if (adminData && adminData.email) {
    headers["Admin-Email"] = adminData.email;
  }

  const config = {
    method,
    headers,
    body: JSON.stringify(body),
  };

  return await fetch(`${API_BASE_URL}${url}`, config).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json() as Promise<T>;
  });
}

const http_common = {
  get: <T>(url: string) => createRequest<T>(url, "GET"),
  post: <T>(url: string, body: any) => createRequest<T>(url, "POST", body),
  put: <T>(url: string, body: any) => createRequest<T>(url, "PUT", body),
  delete: <T>(url: string) => createRequest<T>(url, "DELETE"),
};

export default http_common;
