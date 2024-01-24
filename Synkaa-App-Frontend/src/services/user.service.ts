import http_common_url from "@/base-url/http-common-url";
import http_common from "../base-url/http-common";
import CommonData from "../types/common.type";
import UserData from "@/types/user.type";

const getAll = (value: string, limit: number, pageNo: number) => {
  return http_common_url.get<Array<CommonData>>(
    `/users/getAll?search=${value}&limit=${limit}&pageNo=${pageNo}`,
  );
};

const loginAdmin = (email: string) => {
  return http_common_url.get<Array<CommonData>>(`/users/email?email=${email}`);
};

const verifyUser = (phoneNumber: number) => {
  const data = { phoneNumber };
  return http_common_url.post<CommonData>(`/users/verify`, data);
};

const getTestUsers = () => {
  return http_common_url.get<Array<CommonData>>("/users/get-all-testbot-users");
};

const getUserDataForDashboard = (daysReqType: any, fromDay: any, toDay: any) => {
  const data = { daysReqType, fromDay, toDay };
  return http_common_url.post<Array<CommonData>>("/users/last-days-users", data);
};

const createTestUser = (data: any) => {
  return http_common_url.post<UserData>("/users/test-user-create", data);
};
const getUserCount = (id: string) => {
  return http_common_url.get<Array<CommonData>>("/users/count?id=" + id);
};

const getUserChat = (id: string) => {
  return http_common_url.get<Array<CommonData>>(`/chat/get-user-chat?userId=${id}`);
};

const getUserList = () => {
  return http_common_url.get<Array<CommonData>>(`/chat/lastMessage`);
};

const searchChat = (id: string, message: string) => {
  const data = { message };
  return http_common_url.put<Array<CommonData>>(`/chat/search-chat?id=${id}`, data);
};

const deleteConversation = (id: string) => {
  return http_common_url.delete<CommonData>(`/chat/delete?id=${id}`);
};

const get = (id: string) => {
  return http_common.get<CommonData>(`/emp/${id}`);
};

const create = (data: UserData) => {
  return http_common.post<UserData>("/emp", data);
};

const update = (data: UserData, id: any) => {
  return http_common.put<any>(`/emp/${id}`, data);
};

const updateTestBotUserList = (id: string) => {
  const data = { isTestbotdeleted: true };
  return http_common_url.put<CommonData>(`/users/update-testbot-user?id=${id}`, data);
};

const deleteById = (id: string) => {
  return http_common.delete<any>(`/emp/${id}`);
};

const deleteAll = () => {
  return http_common.delete<any>(`/users`);
};

const findByEmail = (email: string) => {
  return http_common.get<Array<UserData>>(`/users?email=${email}`);
};

/***dasdsadasdasd */
const UserServices = {
  getUserCount,
  getAll,
  get,
  getUserDataForDashboard,
  create,
  update,
  deleteById,
  deleteAll,
  findByEmail,
  getUserChat,
  deleteConversation,
  searchChat,
  createTestUser,
  getTestUsers,
  updateTestBotUserList,
  loginAdmin,
  verifyUser,
  getUserList,
};

export default UserServices;
