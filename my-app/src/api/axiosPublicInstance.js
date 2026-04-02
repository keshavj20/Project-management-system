import axios from "axios";


const axiosPublicInstance = axios.create({
  withCredentials: true,
});


axiosPublicInstance.interceptors.request.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

//creating response interceptor
axiosPublicInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosPublicInstance;
