import { httpPost } from "./request";

export interface Item {
  id: number;
  name: string;
  breed: string;
  describe: string;
  image: string;
}

export interface ItemList {
  id: number;
  name: string;
  breed: string;
  describe: string;
  image: string;
  update_time: Date;
}

export interface List {
  count: number;
  list: ItemList[];
}


export const initialItem: Item = {
  id: 0,
  name: '',
  breed: '',
  describe: '',
  image: ''
};

export const ITEMS_PER_PAGE = 5;
// Dog information is added, deleted, modified, and checked
const URI = "/system/publish/";

export const list = async (currentPage: number, searchName: string) => {
  return await httpPost<List>(URI + "list", {currentPage, limit: ITEMS_PER_PAGE, name: searchName});
};
export const save = async (currentItem: Item) => {
  const endpoint = currentItem.id ? URI + "update" : URI + "insert";
  return await httpPost<string>(endpoint, currentItem);
}

export const deleteData = async (id: number) => {
  return await httpPost<string>(URI + "delete", {id});
};



