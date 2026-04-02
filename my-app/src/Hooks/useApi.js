import { useState } from "react";

import axiosPrivateInstance from "../api/axiosPrivateInstance";
import axiosPublicInstance from "../api/axiosPublicInstance"



const getMethod = (url, type, axiosInstance, data = {}) => {
  switch (type.toLowerCase()) {
    case "get":
      return axiosInstance.get(url);
    case "post":
      return axiosInstance.post(url, data);
    case "patch":
      return axiosInstance.patch(url, data);
    case "put":
      return axiosInstance.put(url, data);
    case "delete":
      return axiosInstance.delete(url, { data });
    default:
      throw new Error(`Unsupported request type: ${type}`);
  }
};

const useApi = (
  url,
  type,
  isPublic = false,
  reqData = {},
  callbackAfterAPICall,
//   hideSuccess = false,
//   hideError = false
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (reqDataManual) => {
    try {
      setLoading(true);
      const axiosInstance = isPublic ? axiosPublicInstance : axiosPrivateInstance;
      const payload = reqDataManual || reqData;

      const response = await getMethod(url, type, axiosInstance, payload);

      setData(response.data);
      if (callbackAfterAPICall) callbackAfterAPICall(response.data, null);
    } catch (err) {
      setError(err);
      if (callbackAfterAPICall) callbackAfterAPICall(null, err);
      console.log("Useapi error",err)
    } finally {
      setLoading(false);
    }
  };


  return { fetchData, data, loading, error };
};

export default useApi;
