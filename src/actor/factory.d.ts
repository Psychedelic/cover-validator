import type {Principal} from "@dfinity/principal";
export interface AddBuildConfig {
  canister_id: Principal;
  dfx_version: string;
  optimize_times: number;
  canister_name: string;
  commit_hash: string;
  repo_url: string;
  rust_version: string;
}
export interface AddProvider {
  id: Principal;
  memo: [] | [string];
  name: string;
}
export interface AddRequest {
  canister_id: Principal;
  build_settings: BuildSettings;
}
export interface AddVerification {
  wasm_checksum: string;
  source_snapshot_url: string;
  canister_id: Principal;
  git_repo: string;
  git_ref: string;
  git_sha: string;
  build_log_url: string;
}
export interface BuildConfig {
  updated_at: string;
  canister_id: Principal;
  created_at: string;
  user_id: Principal;
  dfx_version: string;
  optimize_times: number;
  canister_name: string;
  commit_hash: string;
  repo_url: string;
  rust_version: string;
}
export interface BuildSettings {
  git_repo: string;
  git_ref: string;
  git_sha: string;
}
export interface Error {
  debug_log: [] | [string];
  code: string;
  message: string;
}
export interface Progress {
  request_id: bigint;
  status: ProgressStatus;
  wasm_checksum: [] | [string];
  updated_at: [] | [string];
  source_snapshot_url: [] | [string];
  canister_id: Principal;
  git_repo: [] | [string];
  git_ref: [] | [string];
  git_sha: [] | [string];
  build_log_url: [] | [string];
  percentage: [] | [number];
  started_at: string;
}
export type ProgressStatus = {Error: null} | {Init: null} | {Finished: null} | {InProgress: null};
export interface Provider {
  id: Principal;
  updated_at: string;
  updated_by: Principal;
  memo: [] | [string];
  name: string;
  created_at: string;
  created_by: Principal;
}
export interface Request {
  request_id: bigint;
  canister_id: Principal;
  created_at: string;
  created_by: Principal;
  build_settings: BuildSettings;
}
export type Result = {Ok: null} | {Err: Error};
export type Result_1 = {Ok: Array<Request>} | {Err: Error};
export interface UpdateBuildConfig {
  dfx_version: string;
  optimize_times: number;
  canister_name: string;
  commit_hash: string;
  repo_url: string;
  rust_version: string;
}
export interface UpdateProgress {
  request_id: bigint;
  status: ProgressStatus;
  wasm_checksum: [] | [string];
  source_snapshot_url: [] | [string];
  canister_id: Principal;
  git_repo: [] | [string];
  git_ref: [] | [string];
  git_sha: [] | [string];
  build_log_url: [] | [string];
  percentage: [] | [number];
}
export interface Verification {
  wasm_checksum: string;
  updated_at: string;
  updated_by: Principal;
  source_snapshot_url: string;
  canister_id: Principal;
  created_at: string;
  created_by: Principal;
  git_repo: string;
  git_ref: string;
  git_sha: string;
  build_log_url: string;
}
export interface _SERVICE {
  addAdmin: (arg_0: Principal) => Promise<Result>;
  addBuildConfig: (arg_0: AddBuildConfig, arg_1: Principal) => Promise<Result>;
  addProvider: (arg_0: AddProvider) => Promise<Result>;
  addRequest: (arg_0: AddRequest) => Promise<Result>;
  addVerification: (arg_0: AddVerification) => Promise<Result>;
  consumeRequests: (arg_0: {}) => Promise<Result_1>;
  deleteAdmin: (arg_0: Principal) => Promise<Result>;
  deleteBuildConfig: (arg_0: Principal) => Promise<Result>;
  deleteProvider: (arg_0: Principal) => Promise<Result>;
  getAllAdmins: () => Promise<Array<Principal>>;
  getAllBuildConfigs: () => Promise<Array<BuildConfig>>;
  getAllProgresses: () => Promise<Array<Progress>>;
  getAllProviders: () => Promise<Array<Provider>>;
  getAllRequests: () => Promise<Array<Request>>;
  getAllVerifications: () => Promise<Array<Verification>>;
  getBuildConfigById: (arg_0: Principal) => Promise<[] | [BuildConfig]>;
  getBuildConfigProvider: (arg_0: Principal, arg_1: Principal) => Promise<[] | [BuildConfig]>;
  getProgressByCanisterId: (arg_0: Principal) => Promise<Array<Progress>>;
  getProgressByRequestId: (arg_0: bigint) => Promise<[] | [Progress]>;
  getProviderById: (arg_0: Principal) => Promise<[] | [Provider]>;
  getRequestById: (arg_0: bigint) => Promise<[] | [Request]>;
  getVerificationByCanisterId: (arg_0: Principal) => Promise<[] | [Verification]>;
  submitVerification: (arg_0: AddVerification) => Promise<Result>;
  updateBuildConfig: (arg_0: Principal, arg_1: UpdateBuildConfig) => Promise<Result>;
  updateProgress: (arg_0: UpdateProgress) => Promise<Result>;
  updateProvider: (arg_0: AddProvider) => Promise<Result>;
  updateVerification: (arg_0: AddVerification) => Promise<Result>;
}
