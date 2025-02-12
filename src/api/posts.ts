import api from "@/config/axios";
import { apiRequest } from "@/lib/utils";

export interface PostInputData {
  content: string;
}

export interface UpdatePostInputData {
  id: string;
  content?: string;
  like?: boolean;
}

interface QueryParams {
  [key: string]: string;
}

export const getPosts = (queryParams: QueryParams) => {
  let params: QueryParams = {};
  console.log(queryParams.searchTerm);
  if (queryParams.searchTerm) params["search"] = queryParams.searchTerm;
  // if (queryParams.cursor) params["cursor"] = queryParams.cursor;
  // console.log(params)
  return apiRequest(api.get("/posts", { params }));
};

export const createPostApi = (createPostData: PostInputData) =>
  apiRequest(api.post(`/posts/create`, createPostData));

export const updatePostApi = (updatePostData: UpdatePostInputData) =>
  apiRequest(api.patch(`/posts/${updatePostData.id}`, updatePostData));

export const deletePostApi = (id: string) =>
  apiRequest(api.delete(`/posts/${id}`));
