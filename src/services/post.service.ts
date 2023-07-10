import {
  CommentDataInterface,
  GetCommentsDataInterface,
  LikeDataInterface,
  PostDataInterface,
  getAllPostsDataInterface,
  getPostsOfSignedInUserDataInterface,
} from "../interfaces/post.interface";
import { getOffset } from "../utils/getOffset";
import { getResponseObject } from "../utils/getResponseObject";
import { query } from "./db.service";

export async function getAll({ page, limit }: getAllPostsDataInterface) {
  const offset = getOffset(parseInt(page), parseInt(limit));
  const results: any = await query(
    `SELECT * FROM posts ORDER BY id DESC LIMIT ? OFFSET ?`,
    [parseInt(limit), offset]
  );
  const userIds = results.map((post: any) => post.user_id);
  const uniqueUserIds = [...new Set(userIds)];

  const uniqueUsers: any = await Promise.all(uniqueUserIds.map(
    async (id: any) =>
      (await query(
        `SELECT id, first_name, last_name, picture_url FROM users WHERE id = ?`,
        [id]
      ))[0]
  ));

  results.forEach((post: any) => {
    post.author = uniqueUsers.find((user: any) => user.id === post.user_id)
  });

  return getResponseObject("Posts of Signed in User.", { posts: results });
}

export async function getAllOfUser({
  userId,
  page,
  limit,
}: getPostsOfSignedInUserDataInterface) {
  const offset = getOffset(parseInt(page), parseInt(limit));
  const results: any = await query(
    `SELECT * FROM posts WHERE user_id = ? ORDER BY id DESC LIMIT ? OFFSET ?`,
    [userId, parseInt(limit), offset]
  );
  return getResponseObject("All Posts", { posts: results });
}

export async function create(postData: PostDataInterface) {
  const results = await query(
    "INSERT into posts (user_id, content, media_url) VALUES (?, ?, ?)",
    [postData.userId, postData.content, postData.mediaUrl]
  );

  if (results.affectedRows)
    return getResponseObject("Post successfully created.", null);
}

export async function like(likeData: LikeDataInterface) {
  const insertResults = await query(
    "INSERT into likes (user_id, post_id) VALUES (?, ?)",
    [likeData.userId, likeData.postId]
  );
  const updateResults = await query(
    "UPDATE posts SET num_likes = num_likes + 1 WHERE id = ?",
    [likeData.postId]
  );

  if (insertResults.affectedRows && updateResults.affectedRows)
    return getResponseObject("Post successfully liked.", null);
}

export async function comment(commentData: CommentDataInterface) {
  const insertResults = await query(
    "INSERT into comments (user_id, post_id, content) VALUES (?, ?, ?)",
    [commentData.userId, commentData.postId, commentData.content]
  );
  const updateResults = await query(
    "UPDATE posts SET num_comments = num_comments + 1 WHERE id = ?",
    [commentData.postId]
  );

  if (insertResults.affectedRows && updateResults.affectedRows)
    return getResponseObject("Post successfully commented on.", null);
}

export async function getComments(getCommentsData: GetCommentsDataInterface) {
  const { postId, page, limit } = getCommentsData
  const offset = getOffset(parseInt(page), parseInt(limit));
  const results: any = await query("SELECT * FROM comments WHERE post_id = ? ORDER BY id DESC LIMIT ? OFFSET ?", [postId, parseInt(limit), offset])

  const userIds = results.map((post: any) => post.user_id);
  const uniqueUserIds = [...new Set(userIds)];

  const uniqueUsers: any = await Promise.all(uniqueUserIds.map(
    async (id: any) =>
      (await query(
        `SELECT id, first_name, last_name, picture_url FROM users WHERE id = ?`,
        [id]
      ))[0]
  ));

  results.forEach((post: any) => {
    post.author = uniqueUsers.find((user: any) => user.id === post.user_id)
  });

  return getResponseObject(`All Comments on post of id ${postId}`, { comments: results });
} 