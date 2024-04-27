import { httpPost } from "./request";
import { ItemData } from "../components/Item";
import { CommentData } from "../components/Comment";
import { ORG } from "./register";

const URI = "/system/view/";

export interface ListData {
  count: number;
  list: ItemData[];
}

export interface CommentInsertResult {
  insertId: number;
}

const ITEMS_PER_PAGE = 6;
export const list = async (currentPage: number, searchName: string, size: string[], breed: string[]) => {
  return await httpPost<ListData>(URI + "list", {currentPage, limit: ITEMS_PER_PAGE, name: searchName, size, breed});
};
export const detail = async (id: number) => {
  return await httpPost<ItemData[]>(URI + "detail", {id});
};

export const moreList = async (currentPage: number, searchName: string, size: string[], breed: string[]) => {
  return await httpPost<ItemData>(URI + "moreList", {
    currentPage,
    limit: ITEMS_PER_PAGE,
    name: searchName,
    size,
    breed
  });
};

export const clickData = async (dog_id: number) => {
  return await httpPost<ListData>(URI + "click", {dog_id});
};

export const commentList = async (dog_id: number) => {
  return await httpPost<CommentData[]>(URI + 'comment_data', {dog_id})
};

export const addComment = async (dog_id: number, comment: string) => {
  return await httpPost<CommentInsertResult>(URI + 'comment', {dog_id, comment})
};

export const deleteComment = async (id: number) => {
  return await httpPost<string>(URI + 'delete_comment', {id})
};

export const updateUser = async (formData: { code: string; role: string; username: string, org_id: number }) => {
  return await httpPost<ORG[]>(URI + "updateUser", formData)
};

export const breedList = async () => {
  let list: string[] = [];
  try {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    const message = data.message;
    for (const messageKey in message) {
      const messageElement = message[messageKey];
      if (messageElement.length > 0) {
        for (let i = 0; i < messageElement.length; i++) {
          list.push(messageElement[i] + " " + messageKey);
        }
      } else {
        list.push(messageKey);
      }
    }
  } catch (error) {
    console.error('Error fetching dog image:', error);
  }
  return list;
};




