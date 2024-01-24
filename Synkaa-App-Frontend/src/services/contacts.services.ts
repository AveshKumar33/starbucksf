import http_common_url from "@/base-url/http-common-url";
import {
  UpdateContactTagType,
  DeleteContactTagType,
  SearchContactType,
} from "@/types/contacts.types";

const searchContact = (name: string) => {
  return http_common_url.get<SearchContactType>(`/users/search?name=${name}`);
};

const updateContactTag = (contactId: string, tagslist: (string | undefined)[]) => {
  if (contactId && tagslist !== undefined) {
    const data = { tagslist };
    return http_common_url.put<UpdateContactTagType>(`/users/updateTaglist?id=${contactId}`, data);
  }
  return null;
};

const deleteContacts = (id: string) => {
  return http_common_url.delete<DeleteContactTagType>(`/users/delete?id=${id}`);
};

const ContactServices = { updateContactTag, deleteContacts, searchContact };

export default ContactServices;
