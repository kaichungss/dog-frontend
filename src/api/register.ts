import { httpPost } from "./request";

export const registerCode = async (email: string) => {
  return await httpPost<string>("/register/code", {email});
};

// registration interface
export const registerInsert = async (formData: { password: string; code: string; role: string; email: string; username: string }) => {
  return await httpPost<string>("/register/insert", formData)
};
