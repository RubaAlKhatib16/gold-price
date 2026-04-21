const BASE_URL = "http://127.0.0.1:8000/api";

const getToken = () => localStorage.getItem("token");

export const fetchDashboard = async () => {
  const res = await fetch(`${BASE_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: "application/json",
    },
  });

  return res.json();
};