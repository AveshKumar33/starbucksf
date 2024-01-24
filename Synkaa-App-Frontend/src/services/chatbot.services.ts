import http_common_url from "@/base-url/http-common-url";
import { GetChatbotTypes, PostChatbotTypes, UpdateChatbotTypes } from "@/types/chatbot.types";

const postChatbot = (name: string, chatData: any) => {
  const data = { name, chatData };
  return http_common_url.post<PostChatbotTypes>("/chatbot/create", data);
};

const testChatot = (
  chatbotId: string,
  senderId: string,
  receiverId: string,
  phoneNumber: string,
  userName: string,
) => {
  const data = {
    id: chatbotId,
    senderId: senderId,
    receiverId: receiverId,
    phoneNumber: phoneNumber,
    userName: userName,
  };
  return http_common_url.post<PostChatbotTypes>("/chatbot/send-testbot", data);
};

const getAllChatbot = (value: string, limit: number, pageNo: number) => {
  return http_common_url.get<GetChatbotTypes>(
    `/chatbot/getAll?search=${value}&limit=${limit}&pageNo=${pageNo}`,
  );
};

const getChatbotDetail = (id: string) => {
  return http_common_url.get<GetChatbotTypes>(`/chatbot?id=${id}`);
};

const getAttachQrCount = (id: string) => {
  return http_common_url.get<GetChatbotTypes>(`/qrcode/count-chatbot?chatbotId=${id}`);
};

const updateChatbotName = (id: string, name: string) => {
  const data = { name };
  return http_common_url.put<UpdateChatbotTypes>(`/chatbot/update?id=${id}`, data);
};

const publishTestBot = (id: string) => {
  const data = { status: true };
  return http_common_url.put<UpdateChatbotTypes>(`/chatbot/update?id=${id}`, data);
};

const updateChatbotStatus = (id: string, status: boolean) => {
  const data = { status };
  return http_common_url.put<UpdateChatbotTypes>(`/chatbot/update?id=${id}`, data);
};

const updateChatData = (id: string, chatData: any) => {
  const data = { chatData };
  return http_common_url.put<UpdateChatbotTypes>(`/chatbot/update?id=${id}`, data);
};

const deleteChatbot = (id: string) => {
  const data = { isDeleted: true };
  return http_common_url.put<UpdateChatbotTypes>(`/chatbot/update?id=${id}`, data);
};

const ChatbotServices = {
  getAllChatbot,
  postChatbot,
  testChatot,
  getChatbotDetail,
  getAttachQrCount,
  updateChatbotName,
  updateChatbotStatus,
  updateChatData,
  deleteChatbot,
  publishTestBot,
};
export default ChatbotServices;
