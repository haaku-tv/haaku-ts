export type SignupPolicies = "approval"

export type UserStatuses = "active" | "banned"

export type User = {
    id: string,
    email: string,
    username: string,
    status: UserStatuses,
    is_admin: boolean,
    created_at: Date,
    last_active_at: Date,
}