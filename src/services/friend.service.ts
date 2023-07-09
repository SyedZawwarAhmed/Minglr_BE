import { getFriendsOfSignedInUserDataInterface } from "../interfaces/friend.interface";
import { getOffset } from "../utils/getOffset";
import { getResponseObject } from "../utils/getResponseObject";
import { query } from "./db.service";

export async function getAllOfUser({
  userId,
  page,
  limit,
}: getFriendsOfSignedInUserDataInterface) {
  const offset = getOffset(parseInt(page), parseInt(limit));
  const results: any = await query(
    `SELECT friend_id FROM friends WHERE user_id = ? ORDER BY user_id DESC LIMIT ? OFFSET ?`,
    [userId, parseInt(limit), offset]
  );
  return getResponseObject(`All Friends of user with id '${userId}'`, { friend: results });
}
