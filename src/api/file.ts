import { httpUpload } from "./request";

const URI = "/system/file/";

export const upload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return await httpUpload<string>(URI + 'upload', formData)
};
