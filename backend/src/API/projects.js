import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const createProject = async ({ projectName, description }) => {
  const token = localStorage.getItem("token");
  const res = await api.post(
    "/projects",
    { projectName, description },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
