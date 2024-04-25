import { httpPost } from "./request";

export interface Message {
  id?: number;
  text?: string;
  sender_id?: number;
  receive_id?: number;
  sender_name?: string;
  receive_name?: string;
  insert_time: Date;
}

export interface User {
  id: number;
  username: string;
}

const URI = "/system/chat/";
export const list = async (receivedId: number) => {
  return await httpPost<Message[]>(URI + "list", {receivedId});
};

export const addChat = async (message: Message) => {
  return await httpPost<string>(URI + 'addChat', message)
};

export const userList = async (name: string) => {
  return await httpPost<User[]>(URI + "userList", {name});
};
