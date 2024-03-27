import { httpPost } from "./request";
import { ItemData } from "../components/Item";
import { CommentData } from "../components/Comment";

const URI = "/system/view/";

export interface ListData {
  count: number;
  list: ItemData[];
}

export interface CommentInsertResult {
  insertId: number;
}

const ITEMS_PER_PAGE = 5;
// home page information interface
export const list = async (currentPage: number, searchName: string) => {
  return await httpPost<ListData>(URI + "list", {currentPage, limit: ITEMS_PER_PAGE, name: searchName});
};

export const moreList = async (currentPage: number, searchName: string) => {
  return await httpPost<ItemData>(URI + "moreList", {currentPage, limit: ITEMS_PER_PAGE, name: searchName});
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



