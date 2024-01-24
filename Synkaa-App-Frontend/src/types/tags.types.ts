export interface GetTagData {
  _id: string;
  name: string;
}

export interface GetAllTags {
  success: boolean;
  data: GetTagData[];
}

export interface PostTag {
  success: boolean;
  message: string;
}

export interface UpdateTag {
  success: boolean;
  message: string;
}

export interface DeleteTag {
  success: boolean;
  message: string;
}
