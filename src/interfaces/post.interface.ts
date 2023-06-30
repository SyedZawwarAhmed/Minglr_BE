export interface getAllPostsDataInterface {
  page: string;
  limit: string;
}
export interface getPostsOfSignedInUserDataInterface {
  userId: string | number;
  page: string;
  limit: string;
}

export interface PostDataInterface {
  userId: number | string;
  content: string;
  mediaUrl: string | null;
}

export interface LikeDataInterface {
  userId: string | number;
  postId: string | number;
}

export interface CommentDataInterface {
  userId: string | number;
  postId: string | number;
  content: string;
}
