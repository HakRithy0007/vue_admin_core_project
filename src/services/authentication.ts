import axios from "@/utils/axios";

const baseURL = import.meta.env.VITE_CNPOKER_API_URL;

// Function to handle login
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, {
      auth: {
        username,
        password,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error during login: " + error.message);
    } else {
      throw new Error("Unknown error during login");
    }
  }
};
