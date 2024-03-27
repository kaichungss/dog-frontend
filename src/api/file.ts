import { httpUpload } from "./request";

const URI = "/system/file/";

// file upload interface
export const upload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return await httpUpload<string>(URI + 'upload', formData)
};
