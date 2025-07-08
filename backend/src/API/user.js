import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/users/private/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateUserProfile = async ({
  firstName,
  lastName,
  username,
  bio,
  avatar,
}) => {
  const token = localStorage.getItem("token");
  const response = await api.put("/users/private/profile",{firstName,lastName,username,bio,avatar}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data
};

export const deleteAccount = async () => {
  const token = localStorage.getItem("token");
  const response = await api.delete("/users/private/account", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.clear()
  return response.data
};


