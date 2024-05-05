export interface ILoginSuccessResponce {
  statusCode: number;
  data: IData;
  message: string;
  success: boolean;
  }

export interface IData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  userrole: string;
  __v: number;
  watchHistory: any[]; // Replace 'any' with the actual type if you know it
}

export interface ILoginRequest {
  email: string;
  password: string;
}
