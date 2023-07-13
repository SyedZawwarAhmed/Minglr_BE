export interface UserSignupDataInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  pictureUrl: string | null;
}

export interface UserSigninDataInterface {
  email: string;
  password: string;
}

export interface UpdateUserPictureUrlDataInterface {
  userId: string | number;
  pictureUrl: string;
}
