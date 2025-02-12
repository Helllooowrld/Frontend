export type BaseType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

export interface User extends BaseType {
  fullName: string;
  gender: GenderEnum;
  email: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface PostResponse extends BaseType {
  content: string;
  likesCount: number;
  author: User;
}

// export interface PostResponsePagination {
//   posts: PostResponse[];
//   nextCursor?: string;
// }
