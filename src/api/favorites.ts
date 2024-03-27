import { httpPost } from "./request";
import { CommentInsertResult, ListData } from "./view";
import { ItemData } from "../components/Item";

const URI = "/system/favorites/";
const ITEMS_PER_PAGE = 5;
export const list = async (currentPage: number, searchName: string) => {
  return await httpPost<ListData>(URI + "list", {currentPage, limit: ITEMS_PER_PAGE, name: searchName});
};

export const moreList = async (currentPage: number, searchName: string) => {
  return await httpPost<ItemData>(URI + "moreList", {currentPage, limit: ITEMS_PER_PAGE, name: searchName});
};
export const addFavorites = async (f: boolean, dog_id: number) => {
  return await httpPost<CommentInsertResult>(URI + 'insert', {dog_id, f})
};
