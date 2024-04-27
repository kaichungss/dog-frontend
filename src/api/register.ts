import { httpPost } from "./request";

export interface ORG {
  id: number;
  name: string;
}

const URI = "/register/";
export const registerCode = async (email: string) => {
  return await httpPost<string>(URI + "code", {email});
};

export const registerInsert = async (formData: { password: string; code: string; role: string; email: string; username: string, org_id: number }) => {
  return await httpPost<string>(URI + "insert", formData)
};

export const orgName = async () => {
  return await httpPost<ORG[]>(URI + "orgName", {})
};

