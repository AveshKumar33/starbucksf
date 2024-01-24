import http_common_url from "@/base-url/http-common-url";
import { PostMessageType } from "@/types/conversation.type";

const postMessage = (
  senderId: string,
  receiverId: string,
  phoneNumber: string,
  message: string | null,
  images: string | null,
  mediaKey: string | null,
) => {
  const data = {
    senderId,
    receiverId,
    phoneNumber,
    ...(message !== null && message !== "" ? { message } : {}),
    ...(images !== null ? { images } : {}),
    ...(mediaKey !== null ? { mediaKey } : {}),
  };
  return http_common_url.post<PostMessageType>("/chat/create", data);
};

const ConversationServices = { postMessage };
export default ConversationServices;
