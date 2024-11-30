export interface User {
    _id: string
    tel: string,
    email: string,
    username: string,
    password: string,
    phones: string[],
    messages: string[]
    created_at: string,
    updatedAt: string,
    __v: number
}

export interface UserForAuth{
    _id: string;
    username: string;
    email: string;
    password: string;
}

export interface ProfileDetails {
    username: string,
    email: string
}

