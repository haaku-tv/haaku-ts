import { User } from "./generic.ts";

export type ListUsersResponse = {
    users: User[],
    total: number,
    limit: number,
    offset: number,
}

export type ListUsersParameters = {
    limit: number,
    offset: number,
}

export type ApproveUserParameters = {
    id: string
}

export type ApproveUserResponse = Omit<User, 'last_active_at'>

export type BanUserParameters = {
    id: string
}

export type BanUserResponse = Omit<User, 'last_active_at'>

export type ResetUserPasswordParameters = {
    id: string
}

export type ResetUserPasswordResponse = {
    user_id: string,
    token: string,
    expires_at: Date,
    url_path: string,
    delivery: string
}

export type UnlockUserParameters = {
    id: string
}

export type UnlockUserResponse = Omit<User, 'last_active_at'>