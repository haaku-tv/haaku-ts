import { BaseEndpoint } from "../core/base.ts";
import type { HaakuConfig } from "../types/class.ts";
import type {
  ApproveUserParameters,
  ApproveUserResponse,
  BanUserParameters,
  BanUserResponse,
  ListUsersParameters,
  ListUsersResponse,
  ResetUserPasswordParameters,
  ResetUserPasswordResponse,
  UnlockUserParameters,
  UnlockUserResponse,
} from "../types/endpoints/admin.ts";
import { objectToParameters } from "../utils/utils.ts";

export class AdminEndpoint extends BaseEndpoint {
  constructor(
    config: HaakuConfig,
  ) {
    super(config);
  }

  async listUsers(
    input: ListUsersParameters | undefined = undefined,
  ): Promise<ListUsersResponse> {
    if (input) {
      return await this.api.get(`/v1/admin/users${objectToParameters(input)}`);
    } else {
      return await this.api.get("/v1/admin/users");
    }
  }

  async approveUser(
    input: ApproveUserParameters,
  ): Promise<ApproveUserResponse> {
    return await this.api.post(`/v1/admin/users/${input.id}/approve`);
  }

  async banUser(input: BanUserParameters): Promise<BanUserResponse> {
    return await this.api.post(`/v1/admin/users/${input.id}/ban`);
  }

  async resetUserPassword(
    input: ResetUserPasswordParameters,
  ): Promise<ResetUserPasswordResponse> {
    return await this.api.post(`/v1/admin/users/${input.id}/password-reset`);
  }

  async unlockUser(input: UnlockUserParameters): Promise<UnlockUserResponse> {
    return await this.api.post(`/v1/admin/users/${input.id}/unlock`);
  }
}
