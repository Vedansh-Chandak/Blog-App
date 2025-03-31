import axios from 'axios';
import { API_NOTIFICATION, SERVICE_URL } from '../../constants/configs.js';

// Ensure the protocol is correct
const API_URL = 'http://localhost:8000';
;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function(response) {
    return processResponse(response);
  },
  function(error) {
    return Promise.reject(processError(error));
  }
);

const processResponse = (response) => {
  if (response.status === 200) {
    return {
      isSuccess: true,
      data: response.data
    };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      code: response?.code,
      msg: response?.msg
    };
  }
};

const processError = (error) => {
  if (error.response) {
    console.error("Error in response:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION.responseFailure,
      code: error.response.status
    };
  } else if (error.request) {
    console.error("Error in request:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION.requestFailure,
    };
  } else {
    console.error("Error in connection:", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION.networkError,
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URL)) {
  API[key] = (body, showUploadProcess, showDownloadProcess) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType || "json",
      onUploadProgress: function (progressEvent) {
        if (showUploadProcess && progressEvent.total) {
          let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          showUploadProcess(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProcess && progressEvent.total) {
          let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          showDownloadProcess(percentageCompleted);
        }
      }
    }).catch(error => {
      console.error('API Error:', error);
      return error.response?.data || { error: 'Unknown error' };
    });
}



export { API };
