import {Error as CanisterError} from './actor/idl/cover.did.d';
export class ErrorResponse {
  code: string;

  message: string;

  details: unknown;

  constructor(code: string, message: string, details?: unknown) {
    this.code = code;
    this.message = message;
    this.details = details;
  }
}

export const UnexpectedError: ErrorResponse = new ErrorResponse(
  'ERR_000',
  'Internal server error',
  'Something went wrong'
);
export const throwBadInputRequest = (details: unknown): ErrorResponse =>
  new ErrorResponse('ERR_001', 'Bad request input', details);
export const ValidateRepoFail: ErrorResponse = new ErrorResponse('ERR_002', 'Bad credentials or repo not found');
export const GetCoverMetadataFailed: ErrorResponse = new ErrorResponse('ERR_003', 'Failed to get cover metadata');
export const GetCanisterInfoFailed: ErrorResponse = new ErrorResponse('ERR_004', 'Failed to get canister info');
export const UnauthorizedCaller: ErrorResponse = new ErrorResponse('ERR_005', 'Unauthorized canister controller');
export const InvalidCaller: ErrorResponse = new ErrorResponse('ERR_006', 'Invalid caller principal');
export const InvalidSignature: ErrorResponse = new ErrorResponse('ERR_007', 'Invalid signature');
export const BuildConfigNotFound: ErrorResponse = new ErrorResponse('ERR_008', 'Build Config Not Found');
export const InvalidTimestamp: ErrorResponse = new ErrorResponse('ERR_009', 'Expired or invalid timestamp');
export const throwCanisterResponseError = (err: CanisterError): ErrorResponse =>
  new ErrorResponse('ERR_010', 'Canister error', err);
