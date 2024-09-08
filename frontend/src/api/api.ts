import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/* eslint-disable @typescript-eslint/no-explicit-any */
type ApiParams<T = any> = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: T;
  token?: string;
  isFormData? : boolean; // JWT token can be passed here
};
async function api<T>({ url, method, data, token, isFormData }: ApiParams): Promise<T> {
  const headers: Record<string, string> = {};
  // Set Content-Type based on whether the data is FormData or JSON
  if (isFormData) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }


  // Add Authorization header if token is provided
  if (token) {
    headers['Authorization'] = `JWT ${token}`;
  }

  // Axios request configuration
  const config: AxiosRequestConfig = {
    url: `${import.meta.env.VITE_API_ENDPOINT}${url}`,
    method,
    headers,
    data: isFormData ? data : JSON.stringify(data),
  };
  try {
    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorData = error.response.data;

      // Collect all error messages from the error object
      const errorMessages = Object.entries(errorData)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');

      throw new Error(errorMessages || 'Something went wrong');
    } else {
      console.error('Error:', error.message);
      throw new Error('Network error');
    }
  }
}

const apiMethods = {
  get<T>(url: string, token?: string): Promise<T> {
    return api<T>({ url, method: 'GET', token });
  },
  post<T,R>(url: string, data: any, token?: string, isFormData?): Promise<T> {
    return api<T>({ url, method: 'POST', data, token,isFormData });
  },
  put<T>(url: string, data: any, token?: string): Promise<T> {
    return api<T>({ url, method: 'PUT', data, token });
  },
  delete<T>(url: string, token?: string): Promise<T> {
    return api<T>({ url, method: 'DELETE', token });
  },
};

export default apiMethods;
