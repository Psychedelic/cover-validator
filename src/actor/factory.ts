//@ts-nocheck
export const idlFactory = ({IDL}) => {
  const Error = IDL.Record({
    debug_log: IDL.Opt(IDL.Text),
    code: IDL.Text,
    message: IDL.Text
  });
  const Result = IDL.Variant({Ok: IDL.Null, Err: Error});
  const AddBuildConfig = IDL.Record({
    canister_id: IDL.Principal,
    dfx_version: IDL.Text,
    optimize_times: IDL.Nat8,
    canister_name: IDL.Text,
    commit_hash: IDL.Text,
    repo_url: IDL.Text,
    rust_version: IDL.Text
  });
  const AddProvider = IDL.Record({
    id: IDL.Principal,
    memo: IDL.Opt(IDL.Text),
    name: IDL.Text
  });
  const BuildSettings = IDL.Record({
    git_repo: IDL.Text,
    git_ref: IDL.Text,
    git_sha: IDL.Text
  });
  const AddRequest = IDL.Record({
    canister_id: IDL.Principal,
    build_settings: BuildSettings
  });
  const AddVerification = IDL.Record({
    wasm_checksum: IDL.Text,
    source_snapshot_url: IDL.Text,
    canister_id: IDL.Principal,
    git_repo: IDL.Text,
    git_ref: IDL.Text,
    git_sha: IDL.Text,
    build_log_url: IDL.Text
  });
  const Request = IDL.Record({
    request_id: IDL.Nat64,
    canister_id: IDL.Principal,
    created_at: IDL.Text,
    created_by: IDL.Principal,
    build_settings: BuildSettings
  });
  const Result_1 = IDL.Variant({Ok: IDL.Vec(Request), Err: Error});
  const BuildConfig = IDL.Record({
    updated_at: IDL.Text,
    canister_id: IDL.Principal,
    created_at: IDL.Text,
    user_id: IDL.Principal,
    dfx_version: IDL.Text,
    optimize_times: IDL.Nat8,
    canister_name: IDL.Text,
    commit_hash: IDL.Text,
    repo_url: IDL.Text,
    rust_version: IDL.Text
  });
  const ProgressStatus = IDL.Variant({
    Error: IDL.Null,
    Init: IDL.Null,
    Finished: IDL.Null,
    InProgress: IDL.Null
  });
  const Progress = IDL.Record({
    request_id: IDL.Nat64,
    status: ProgressStatus,
    wasm_checksum: IDL.Opt(IDL.Text),
    updated_at: IDL.Opt(IDL.Text),
    source_snapshot_url: IDL.Opt(IDL.Text),
    canister_id: IDL.Principal,
    git_repo: IDL.Opt(IDL.Text),
    git_ref: IDL.Opt(IDL.Text),
    git_sha: IDL.Opt(IDL.Text),
    build_log_url: IDL.Opt(IDL.Text),
    percentage: IDL.Opt(IDL.Float32),
    started_at: IDL.Text
  });
  const Provider = IDL.Record({
    id: IDL.Principal,
    updated_at: IDL.Text,
    updated_by: IDL.Principal,
    memo: IDL.Opt(IDL.Text),
    name: IDL.Text,
    created_at: IDL.Text,
    created_by: IDL.Principal
  });
  const Verification = IDL.Record({
    wasm_checksum: IDL.Text,
    updated_at: IDL.Text,
    updated_by: IDL.Principal,
    source_snapshot_url: IDL.Text,
    canister_id: IDL.Principal,
    created_at: IDL.Text,
    created_by: IDL.Principal,
    git_repo: IDL.Text,
    git_ref: IDL.Text,
    git_sha: IDL.Text,
    build_log_url: IDL.Text
  });
  const UpdateBuildConfig = IDL.Record({
    dfx_version: IDL.Text,
    optimize_times: IDL.Nat8,
    canister_name: IDL.Text,
    commit_hash: IDL.Text,
    repo_url: IDL.Text,
    rust_version: IDL.Text
  });
  const UpdateProgress = IDL.Record({
    request_id: IDL.Nat64,
    status: ProgressStatus,
    wasm_checksum: IDL.Opt(IDL.Text),
    source_snapshot_url: IDL.Opt(IDL.Text),
    canister_id: IDL.Principal,
    git_repo: IDL.Opt(IDL.Text),
    git_ref: IDL.Opt(IDL.Text),
    git_sha: IDL.Opt(IDL.Text),
    build_log_url: IDL.Opt(IDL.Text),
    percentage: IDL.Opt(IDL.Float32)
  });
  return IDL.Service({
    addAdmin: IDL.Func([IDL.Principal], [Result], []),
    addBuildConfig: IDL.Func([AddBuildConfig], [Result], []),
    addProvider: IDL.Func([AddProvider], [Result], []),
    addRequest: IDL.Func([AddRequest], [Result], []),
    addVerification: IDL.Func([AddVerification], [Result], []),
    consumeRequests: IDL.Func([IDL.Record({})], [Result_1], []),
    deleteAdmin: IDL.Func([IDL.Principal], [Result], []),
    deleteBuildConfig: IDL.Func([IDL.Principal], [Result], []),
    deleteProvider: IDL.Func([IDL.Principal], [Result], []),
    getAllAdmins: IDL.Func([], [IDL.Vec(IDL.Principal)], ["query"]),
    getAllBuildConfigs: IDL.Func([], [IDL.Vec(BuildConfig)], ["query"]),
    getAllProgresses: IDL.Func([], [IDL.Vec(Progress)], ["query"]),
    getAllProviders: IDL.Func([], [IDL.Vec(Provider)], ["query"]),
    getAllRequests: IDL.Func([], [IDL.Vec(Request)], ["query"]),
    getAllVerifications: IDL.Func([], [IDL.Vec(Verification)], ["query"]),
    getBuildConfigById: IDL.Func([IDL.Principal], [IDL.Opt(BuildConfig)], ["query"]),
    getBuildConfigProvider: IDL.Func([IDL.Principal, IDL.Principal], [IDL.Opt(BuildConfig)], ["query"]),
    getProgressByCanisterId: IDL.Func([IDL.Principal], [IDL.Vec(Progress)], ["query"]),
    getProgressByRequestId: IDL.Func([IDL.Nat64], [IDL.Opt(Progress)], ["query"]),
    getProviderById: IDL.Func([IDL.Principal], [IDL.Opt(Provider)], ["query"]),
    getRequestById: IDL.Func([IDL.Nat64], [IDL.Opt(Request)], ["query"]),
    getVerificationByCanisterId: IDL.Func([IDL.Principal], [IDL.Opt(Verification)], ["query"]),
    submitVerification: IDL.Func([AddVerification], [Result], []),
    updateBuildConfig: IDL.Func([IDL.Principal, UpdateBuildConfig], [Result], []),
    updateProgress: IDL.Func([UpdateProgress], [Result], []),
    updateProvider: IDL.Func([AddProvider], [Result], []),
    updateVerification: IDL.Func([AddVerification], [Result], [])
  });
};
export const init = ({IDL}) => {
  return [];
};
