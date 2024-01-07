

export interface ILoginSuccessResponce {
    _id :string,
    username : string,
    email : string,
    fullName : string,
    avatar :string,
    coverImage : string,
    createdAt :string,
    updatedAt : string,
    accessToken: string,
    refreshToken : string

}


export interface ILoginRequest {

    email : string,
    password : string
    

}