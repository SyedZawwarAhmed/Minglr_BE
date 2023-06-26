import {
  CommentDataInterface,
  LikeDataInterface,
  PostDataInterface,
} from "../interfaces/post.interface";
import { getResponseObject } from "../utils/getResponseObject";
import query from "./db.service";

export async function getAll() {}

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
