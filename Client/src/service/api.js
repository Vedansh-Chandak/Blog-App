import axios from 'axios';
import { API_NOTIFICATION, SERVICE_URL } from '../../constants/configs.js';

// Define the getType function
const getType = (value, body) => {
  if (value.params) {
    return { params: value.params };
  } else if (value.query) {
    return { query: body[value.query] };
  }
  return {};
};
import { getAccessToken } from '../../utils/common-utils.js';
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
    if(config.TYPE.params){
      config.params = config.TYPE.params
    }else if(config.TYPE.query){
      config.url = config.url + '/' + config.TYPE.query;
    }
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
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
      axiosInstance({
          method: value.method,
          url: value.url,
          data: value.method === 'DELETE' ? '' : body,
          responseType: value.responseType,
          headers: {
              authorization: getAccessToken(),
          },
          TYPE: getType(value, body),
          onUploadProgress: function(progressEvent) {
              if (showUploadProgress) {
                  let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  showUploadProgress(percentCompleted);
              }
          },
          onDownloadProgress: function(progressEvent) {
              if (showDownloadProgress) {
                  let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  showDownloadProgress(percentCompleted);
              }
          }
      });
}


export { API };
