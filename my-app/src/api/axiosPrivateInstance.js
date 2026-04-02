import axios from "axios";


const axiosPrivateInstance = axios.create({
  withCredentials: true,
});


axiosPrivateInstance.interceptors.request.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);


axiosPrivateInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosPrivateInstance;