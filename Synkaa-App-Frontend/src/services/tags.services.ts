import http_common_url from "@/base-url/http-common-url";
import { GetAllTags, PostTag, UpdateTag, DeleteTag } from "@/types/tags.types";

const getAllTags = () => {
  return http_common_url.get<GetAllTags>("/tags/getAllTags");
};

const postTag = (tagValue: string) => {
  const data = { name: tagValue };
  return http_common_url.post<PostTag>("/tags/create", data);
};

const updateTag = (rowId: string, value: string) => {
  const data = { name: value };
  return http_common_url.put<UpdateTag>(`/tags/update?id=${rowId}`, data);
};

const deleteTag = (_id: string) => {
  return http_common_url.delete<DeleteTag>(`/tags/delete?id=${_id}`);
};

const TagsServices = { getAllTags, postTag, updateTag, deleteTag };
export default TagsServices;
