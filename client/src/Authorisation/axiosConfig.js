import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080',
});

// Create a function to get the axios instance with auth
export const useAxiosWithAuth = () => {
  const { getToken } = useAuth();

  const axiosWithAuth = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080',
  });

  axiosWithAuth.interceptors.request.use(async (config) => {
    try {
      console.log('Getting token from Clerk...');
      const token = await getToken();
      console.log('Token received:', token ? 'Yes' : 'No');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Authorization header set:', config.headers.Authorization ? 'Yes' : 'No');
      } else {
        console.log('No token available from Clerk');
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    console.log('Request config:', {
      url: config.url,
      method: config.method,
      hasAuthHeader: !!config.headers.Authorization
    });
    return config;
  });

  axiosWithAuth.interceptors.response.use(
    (response) => {
      console.log('Response received:', response.status);
      return response;
    },
    (error) => {
      console.error("Response Error:", error);
      console.error("Response Error Details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
      if (error.response && error.response.status === 401) {
        // Handle unauthorized - Clerk will handle this automatically
        console.log("Unauthorized request");
      }
      return Promise.reject(error);
    }
  );

  return axiosWithAuth;
};

// Default axios instance (without auth for public endpoints)
axiosInstance.interceptors.request.use((config) => {
  console.log("Request Config:", config);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
