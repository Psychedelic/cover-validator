// @ts-nocheck
export const idlFactory = ({IDL}) => {
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
    canister_name: IDL.Text,
    commit_hash: IDL.Text,
    repo_url: IDL.Text,
    rust_version: IDL.Opt(IDL.Text),
    optimize_count: IDL.Nat8
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
  const BuildStatus = IDL.Variant({Error: IDL.Null, Success: IDL.Null});
  const Verification = IDL.Record({
    updated_at: IDL.Text,
    updated_by: IDL.Principal,
    canister_id: IDL.Principal,
    dfx_version: IDL.Text,
    build_status: BuildStatus,
    canister_name: IDL.Text,
    commit_hash: IDL.Text,
    repo_url: IDL.Text,
    rust_version: IDL.Opt(IDL.Text),
    optimize_count: IDL.Nat8,
    build_url: IDL.Text,
    wasm_hash: IDL.Opt(IDL.Text)
  });
  const BuildConfigInfo = IDL.Record({
    canister_id: IDL.Principal,
    owner_id: IDL.Principal
  });
  const SaveBuildConfig = IDL.Record({
    canister_id: IDL.Principal,
    dfx_version: IDL.Text,
    owner_id: IDL.Principal,
    canister_name: IDL.Text,
    commit_hash: IDL.Text,
    repo_url: IDL.Text,
    rust_version: IDL.Opt(IDL.Text),
    optimize_count: IDL.Nat8
  });
  const SubmitVerification = IDL.Record({
    canister_id: IDL.Principal,
    dfx_version: IDL.Text,
    owner_id: IDL.Principal,
    build_status: BuildStatus,
    canister_name: IDL.Text,
    commit_hash: IDL.Text,
    repo_url: IDL.Text,
    rust_version: IDL.Opt(IDL.Text),
    optimize_count: IDL.Nat8,
    build_url: IDL.Text,
    wasm_hash: IDL.Opt(IDL.Text)
  });
  return IDL.Service({
    addAdmin: IDL.Func([IDL.Principal], [], []),
    addProvider: IDL.Func([AddProvider], [], []),
    deleteAdmin: IDL.Func([IDL.Principal], [], []),
    deleteBuildConfig: IDL.Func([IDL.Principal], [], []),
    deleteProvider: IDL.Func([IDL.Principal], [], []),
    getAllAdmins: IDL.Func([], [IDL.Vec(IDL.Principal)], ["query"]),
    getAllBuildConfigs: IDL.Func([], [IDL.Vec(BuildConfig)], ["query"]),
    getAllProviders: IDL.Func([], [IDL.Vec(Provider)], ["query"]),
    getAllVerifications: IDL.Func([], [IDL.Vec(Verification)], ["query"]),
    getBuildConfigById: IDL.Func([IDL.Principal], [IDL.Opt(BuildConfig)], ["query"]),
    getBuildConfigProvider: IDL.Func([BuildConfigInfo], [IDL.Opt(BuildConfig)], ["query"]),
    getVerificationByCanisterId: IDL.Func([IDL.Principal], [IDL.Opt(Verification)], ["query"]),
    saveBuildConfig: IDL.Func([SaveBuildConfig], [], []),
    submitVerification: IDL.Func([SubmitVerification], [], [])
  });
};
export const init = ({IDL}) => {
  return [];
};
