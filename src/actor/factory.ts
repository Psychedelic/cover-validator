// @ts-nocheck
export const idlFactory = ({IDL}) => {
  const Error = IDL.Record({
    debug_log: IDL.Opt(IDL.Text),
    code: IDL.Text,
    message: IDL.Text
  });
  const Result = IDL.Variant({Ok: IDL.Null, Err: Error});
  const AddProvider = IDL.Record({
    id: IDL.Principal,
    memo: IDL.Opt(IDL.Text),
    name: IDL.Text
  });
  const BuildConfig = IDL.Record({
    updated_at: IDL.Text,
    canister_id: IDL.Principal,
    created_at: IDL.Text,
    dfx_version: IDL.Text,
    owner_id: IDL.Principal,
    optimize_times: IDL.Nat8,
    canister_name: IDL.Text,
    commit_hash: IDL.Text,
    repo_url: IDL.Text,
    rust_version: IDL.Opt(IDL.Text)
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
    updated_at: IDL.Text,
    updated_by: IDL.Principal,
    canister_id: IDL.Principal,
    created_at: IDL.Text,
    created_by: IDL.Principal,
    dfx_version: IDL.Text,
    canister_name: IDL.Text,
    commit_hash: IDL.Text,
    repo_url: IDL.Text,
    rust_version: IDL.Text,
    optimize_count: IDL.Nat8,
    wasm_hash: IDL.Text
  });
  const SaveBuildConfig = IDL.Record({
    canister_id: IDL.Principal,
    dfx_version: IDL.Text,
    owner_id: IDL.Principal,
    optimize_times: IDL.Nat8,
    canister_name: IDL.Text,
    commit_hash: IDL.Text,
    repo_url: IDL.Text,
    rust_version: IDL.Opt(IDL.Text)
  });
  const SubmitVerification = IDL.Record({
    canister_id: IDL.Principal,
    dfx_version: IDL.Text,
    canister_name: IDL.Text,
    commit_hash: IDL.Text,
    repo_url: IDL.Text,
    rust_version: IDL.Text,
    optimize_count: IDL.Nat8,
    wasm_hash: IDL.Text
  });
  return IDL.Service({
    addAdmin: IDL.Func([IDL.Principal], [Result], []),
    addProvider: IDL.Func([AddProvider], [Result], []),
    deleteAdmin: IDL.Func([IDL.Principal], [Result], []),
    deleteBuildConfig: IDL.Func([IDL.Principal], [Result], []),
    deleteProvider: IDL.Func([IDL.Principal], [Result], []),
    getAllAdmins: IDL.Func([], [IDL.Vec(IDL.Principal)], ["query"]),
    getAllBuildConfigs: IDL.Func([], [IDL.Vec(BuildConfig)], ["query"]),
    getAllProviders: IDL.Func([], [IDL.Vec(Provider)], ["query"]),
    getAllVerifications: IDL.Func([], [IDL.Vec(Verification)], ["query"]),
    getBuildConfigById: IDL.Func([IDL.Principal], [IDL.Opt(BuildConfig)], ["query"]),
    getBuildConfigProvider: IDL.Func([IDL.Principal, IDL.Principal], [IDL.Opt(BuildConfig)], ["query"]),
    getProviderById: IDL.Func([IDL.Principal], [IDL.Opt(Provider)], ["query"]),
    getVerificationByCanisterId: IDL.Func([IDL.Principal], [IDL.Opt(Verification)], ["query"]),
    saveBuildConfig: IDL.Func([SaveBuildConfig], [Result], []),
    submitVerification: IDL.Func([IDL.Principal, SubmitVerification], [Result], []),
    updateProvider: IDL.Func([AddProvider], [Result], [])
  });
};
export const init = ({IDL}) => {
  return [];
};
