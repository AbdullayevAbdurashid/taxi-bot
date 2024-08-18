/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/driverService.js
import apiMethods from './api';
// Define the interfaces

// Correctly typing the API call
// Define the interfaces
interface AuthRequest {
  phone_number: string;
  password: string;
}

interface AuthResponse {
  [key:string]:any;
}
interface IFetchResponse {
  id: number;
  title: string;
  readOnly: true;
  getrequest_type: string;
  user: number;
  request: number;
}

interface IPostRequest {
  getrequest_type: 'yolovchi_olish' | 'yolovchi_'; // Replace 'Option1' and 'Option2' with actual enum values
  request: number;
}

// Correctly typing the API call
export const verifyDriver = async (
  phone_number: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await apiMethods.post<AuthRequest, AuthResponse>('/users/login/', {
      phone_number,
      password,
    });
    return response;
  } catch (error: any) {
    throw new Error(error || 'Xatolik yuz berdi');
  }
};

export const fetchUserProfile = async (token) => {
  return apiMethods.get <AuthResponse>('/users/profile/',token)
};

export const fetchSearchResults = async (where, whereTo) => {
  return apiMethods.get<AuthResponse>(`/search/?where=${where}&whereTo=${whereTo}`);
};

export const postGetRequest = async (userId, selectedRequestId,token,type):Promise<IPostRequest[]> => {
  return apiMethods.post('/getrequests/', {
    user: userId,
    request: selectedRequestId,
    getrequest_type: type,
  },token);
};

export const fetchGetRequests = async (token):Promise<IFetchResponse[]> => {
  return apiMethods.get('/getrequests/',token);
};

export const fetchRequestDetails = async (requestId) => {
  return apiMethods.get(`/requests/${requestId}/`);
};
export const sendNewUser = async(data,token) =>{
return apiMethods.post("/requests/",data, token)

}
export const registerNewDriver = async (formData) =>{
  const isFormData = true;

return apiMethods.post("/users/register/",formData, "" ,isFormData )

}
export const fetchDriverOrders = async (token) => {
  return apiMethods.get('/yolovchi_olish/',token);
};
