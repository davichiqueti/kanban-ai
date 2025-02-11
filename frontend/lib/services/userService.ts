
import api from "./api";

export const signup = async (userData: { name: string, username: string, email: string, password: string }) => {

  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;

  } catch (error) {
    console.error("Error signing up", error)
  }
}

export const login = async (userData: { username: string, password: string }) => {

  try {

    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", userData.username);
    formData.append("password", userData.password);

    const response = await api.post("/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;

  } catch (error) {
    console.error("Error signing up", error)
  }
}
