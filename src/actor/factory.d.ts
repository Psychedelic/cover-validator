import type {Principal} from "@dfinity/principal";
export interface AddProvider {
  id: Principal;
  memo: [] | [string];
  name: string;
}
export interface BuildConfig {
  updated_at: string;
  canister_id: Principal;
  created_at: string;
  dfx_version: string;
  owner_id: Principal;
  optimize_times: number;
  canister_name: string;
  commit_hash: string;
  repo_url: string;
  rust_version: [] | [string];
}
export interface Error {
  debug_log: [] | [string];
  code: string;
  message: string;
}
export interface Provider {
  id: Principal;
  updated_at: string;
  updated_by: Principal;
  memo: [] | [string];
  name: string;
  created_at: string;
  created_by: Principal;
}
export type Result = {Ok: null} | {Err: Error};
export interface SaveBuildConfig {
  canister_id: Principal;
  dfx_version: string;
  owner_id: Principal;
  optimize_times: number;
  canister_name: string;
  commit_hash: string;
  repo_url: string;
  rust_version: [] | [string];
}
export interface SubmitVerification {
  canister_id: Principal;
  dfx_version: string;
  canister_name: string;
  commit_hash: string;
  repo_url: string;
  rust_version: string;
  optimize_count: number;
  wasm_hash: string;
}
export interface Verification {
  updated_at: string;
  updated_by: Principal;
  canister_id: Principal;
  created_at: string;
  created_by: Principal;
  dfx_version: string;
  canister_name: string;
  commit_hash: string;
  repo_url: string;
  rust_version: string;
  optimize_count: number;
  wasm_hash: string;
}
export interface _SERVICE {
  addAdmin: (arg_0: Principal) => Promise<Result>;
  addProvider: (arg_0: AddProvider) => Promise<Result>;
  deleteAdmin: (arg_0: Principal) => Promise<Result>;
  deleteBuildConfig: (arg_0: Principal) => Promise<Result>;
  deleteProvider: (arg_0: Principal) => Promise<Result>;
  getAllAdmins: () => Promise<Array<Principal>>;
  getAllBuildConfigs: () => Promise<Array<BuildConfig>>;
  getAllProviders: () => Promise<Array<Provider>>;
  getAllVerifications: () => Promise<Array<Verification>>;
  getBuildConfigById: (arg_0: Principal) => Promise<[] | [BuildConfig]>;
  getBuildConfigProvider: (arg_0: Principal, arg_1: Principal) => Promise<[] | [BuildConfig]>;
  getProviderById: (arg_0: Principal) => Promise<[] | [Provider]>;
  getVerificationByCanisterId: (arg_0: Principal) => Promise<[] | [Verification]>;
  saveBuildConfig: (arg_0: SaveBuildConfig) => Promise<Result>;
  submitVerification: (arg_0: Principal, arg_1: SubmitVerification) => Promise<Result>;
  updateProvider: (arg_0: AddProvider) => Promise<Result>;
}
