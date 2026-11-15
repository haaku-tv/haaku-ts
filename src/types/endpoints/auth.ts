import { SignupPolicies } from "./generic.ts";

export type AuthConfigResponse = {
    mode: string,
    local_auth: boolean,
    signup_policy: SignupPolicies,
    first_run: boolean,
    password_min_length: number,
    password_kdf: string,
    password_reset_delivery: string,
    session: {
        token_prefix: string,
        transport: "bearer",
        ttl_seconds: number
    }
}