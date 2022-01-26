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
  canister_name: string;
  commit_hash: string;
  repo_url: string;
  rust_version: [] | [string];
  optimize_count: number;
}
export interface BuildConfigInfo {
  canister_id: Principal;
  owner_id: Principal;
}
export type BuildStatus = {Error: null} | {Success: null};
export interface Provider {
  id: Principal;
  updated_at: string;
  updated_by: Principal;
  memo: [] | [string];
  name: string;
  created_at: string;
  created_by: Principal;
}
export interface SaveBuildConfig {
  canister_id: Principal;
  dfx_version: string;
  owner_id: Principal;
  canister_name: string;
  commit_hash: string;
  repo_url: string;
  rust_version: [] | [string];
  optimize_count: number;
}
export interface SubmitVerification {
  canister_id: Principal;
  dfx_version: string;
  owner_id: Principal;
  build_status: BuildStatus;
  canister_name: string;
  commit_hash: string;
  repo_url: string;
  rust_version: [] | [string];
  optimize_count: number;
  build_url: string;
  wasm_hash: [] | [string];
}
export interface Verification {
  updated_at: string;
  updated_by: Principal;
  canister_id: Principal;
  dfx_version: string;
  build_status: BuildStatus;
  canister_name: string;
  commit_hash: string;
  repo_url: string;
  rust_version: [] | [string];
  optimize_count: number;
  build_url: string;
  wasm_hash: [] | [string];
}
export interface _SERVICE {
  addAdmin: (arg_0: Principal) => Promise<undefined>;
  addProvider: (arg_0: AddProvider) => Promise<undefined>;
  deleteAdmin: (arg_0: Principal) => Promise<undefined>;
  deleteBuildConfig: (arg_0: Principal) => Promise<undefined>;
  deleteProvider: (arg_0: Principal) => Promise<undefined>;
  getAllAdmins: () => Promise<Array<Principal>>;
  getAllBuildConfigs: () => Promise<Array<BuildConfig>>;
  getAllProviders: () => Promise<Array<Provider>>;
  getAllVerifications: () => Promise<Array<Verification>>;
  getBuildConfigById: (arg_0: Principal) => Promise<[] | [BuildConfig]>;
  getBuildConfigProvider: (arg_0: BuildConfigInfo) => Promise<[] | [BuildConfig]>;
  getVerificationByCanisterId: (arg_0: Principal) => Promise<[] | [Verification]>;
  saveBuildConfig: (arg_0: SaveBuildConfig) => Promise<undefined>;
  submitVerification: (arg_0: SubmitVerification) => Promise<undefined>;
}
