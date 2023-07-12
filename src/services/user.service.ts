import { UserSigninDataInterface, UserSignupDataInterface } from "../interfaces/user.interface";
import { comparePassword } from "../utils/comparePassword";
import { generateToken } from "../utils/generateToken";
import { getResponseObject } from "../utils/getResponseObject";
import { query } from "./db.service";

export async function signup(userData: UserSignupDataInterface) {
  console.log(userData)
  const insertResults = await query(
    `INSERT into users (first_name, last_name, email, password, picture_url) VALUES (?, ?, ?, ?, ?)`,
    [
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.pictureUrl,
    ]
  );

  const selectResults = await query("SELECT * FROM users WHERE email = ?", [
    userData.email,
  ]);
  const responseData = { ...selectResults[0] };
  delete responseData.password;

  return getResponseObject("User Successfully Registered.", {
    user: responseData,
  });
}

export async function signin(user: UserSigninDataInterface) {
  const rows = await query("SELECT * FROM users WHERE email = ?", [user.email]);
  if (rows.length > 0) {
    const dbUser = rows[0];
    const isPasswordCorrect = await comparePassword(user.password, dbUser.password)
    if (isPasswordCorrect) {

      const data = {
        time: Date(),
        id: dbUser.id,
        firstName: dbUser.first_name,
        lastName: dbUser.last_name,
        email: dbUser.email,
        pictureUrl: dbUser.picture_url,
        createdAt: dbUser.created_at,
        token: ''
      };

      const token = generateToken(data)
      data.token = token
      return {
        statusCode: 200,
        response: getResponseObject("User Successfully Signed in.", { data }),
      };
    } else {
      return {
        statusCode: 401,
        response: { error: "Invalid Credentials!" },
      };
    }
  } else {
    return {
      statusCode: 400,
      response: { error: "User not registered!" },
    };
  }
}
