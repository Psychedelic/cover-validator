export class ErrorResponse {
  code: string;
  message: string;
  details: unknown;

  constructor(code: string, message: string, details?: unknown) {
    (this.code = code), (this.message = message), (this.details = details);
  }
}

export const UnexpectedError: ErrorResponse = new ErrorResponse(
  "ERR_000",
  "Internal server error",
  "Somthing went wrong"
);
export const BadInputRequest = (details: unknown): ErrorResponse =>
  new ErrorResponse("ERR_001", "Bad request input", details);
export const ValidateRepoFail: ErrorResponse = new ErrorResponse("ERR_002", "Bad credentials or repo not found");
export const InvalidRepoPermission: ErrorResponse = new ErrorResponse("ERR_003", "Invalid repo permission");
export const GettingCanisterInfoFailed: ErrorResponse = new ErrorResponse("ERR_004", "Failed to get canister info");
export const UnauthorizedPrincipal: ErrorResponse = new ErrorResponse("ERR_005", "Unauthorized canister controller");
export const InvalidSignature: ErrorResponse = new ErrorResponse("ERR_006", "Invalid signature");
