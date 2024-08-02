import { BACKEND_URL } from "./helper";
import { commonRequest } from "./ApiCall";

export const registerFunction = async (data) => {
  return await commonRequest("POST", `${BACKEND_URL}/user/register`, data);
};
export const sentOtpFunction = async (data) => {
  return await commonRequest("POST", `${BACKEND_URL}/user/sendotp`, data);
};
export const userVerify = async (data) => {
  return await commonRequest("POST", `${BACKEND_URL}/user/login`, data);
};
