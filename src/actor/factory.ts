// @ts-nocheck
export const idlFactory = ({ IDL }) => {
  const PaginationInfo = IDL.Record({
    'page_index' : IDL.Nat64,
    'items_per_page' : IDL.Nat64,
  });
  const BuildStatus = IDL.Variant({
    'Error' : IDL.Null,
    'Building' : IDL.Null,
    'Success' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const Activity = IDL.Record({
    'create_at' : IDL.Text,
    'canister_id' : IDL.Principal,
    'build_status' : BuildStatus,
  });
  const Pagination = IDL.Record({
    'page_index' : IDL.Nat64,
    'data' : IDL.Vec(Activity),
    'total_pages' : IDL.Nat64,
    'total_items' : IDL.Nat64,
    'is_first_page' : IDL.Bool,
    'items_per_page' : IDL.Nat64,
    'is_last_page' : IDL.Bool,
  });
  const BuildConfig = IDL.Record({
    'updated_at' : IDL.Text,
    'canister_id' : IDL.Principal,
    'created_at' : IDL.Text,
    'dfx_version' : IDL.Text,
    'owner_id' : IDL.Principal,
    'canister_name' : IDL.Text,
    'commit_hash' : IDL.Text,
    'repo_url' : IDL.Text,
    'rust_version' : IDL.Opt(IDL.Text),
    'optimize_count' : IDL.Nat8,
  });
  const BuildConfigInfo = IDL.Record({
    'canister_id' : IDL.Principal,
    'owner_id' : IDL.Principal,
  });
  const Verification = IDL.Record({
    'updated_at' : IDL.Text,
    'updated_by' : IDL.Principal,
    'canister_id' : IDL.Principal,
    'dfx_version' : IDL.Text,
    'build_status' : BuildStatus,
    'canister_name' : IDL.Text,
    'commit_hash' : IDL.Text,
    'repo_url' : IDL.Text,
    'rust_version' : IDL.Opt(IDL.Text),
    'optimize_count' : IDL.Nat8,
    'build_url' : IDL.Opt(IDL.Text),
    'wasm_hash' : IDL.Opt(IDL.Text),
  });
  const Pagination_1 = IDL.Record({
    'page_index' : IDL.Nat64,
    'data' : IDL.Vec(Verification),
    'total_pages' : IDL.Nat64,
    'total_items' : IDL.Nat64,
    'is_first_page' : IDL.Bool,
    'items_per_page' : IDL.Nat64,
    'is_last_page' : IDL.Bool,
  });
  const RegisterVerification = IDL.Record({
    'canister_id' : IDL.Principal,
    'dfx_version' : IDL.Text,
    'owner_id' : IDL.Principal,
    'canister_name' : IDL.Text,
    'commit_hash' : IDL.Text,
    'repo_url' : IDL.Text,
    'rust_version' : IDL.Opt(IDL.Text),
    'optimize_count' : IDL.Nat8,
  });
  const Error = IDL.Variant({ 'BuildInProgress' : IDL.Null });
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : Error });
  const SaveBuildConfig = IDL.Record({
    'canister_id' : IDL.Principal,
    'dfx_version' : IDL.Text,
    'owner_id' : IDL.Principal,
    'canister_name' : IDL.Text,
    'commit_hash' : IDL.Text,
    'repo_url' : IDL.Text,
    'rust_version' : IDL.Opt(IDL.Text),
    'optimize_count' : IDL.Nat8,
  });
  const SubmitVerification = IDL.Record({
    'canister_id' : IDL.Principal,
    'dfx_version' : IDL.Text,
    'owner_id' : IDL.Principal,
    'build_status' : BuildStatus,
    'canister_name' : IDL.Text,
    'commit_hash' : IDL.Text,
    'repo_url' : IDL.Text,
    'rust_version' : IDL.Opt(IDL.Text),
    'optimize_count' : IDL.Nat8,
    'build_url' : IDL.Text,
    'wasm_hash' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'addAdmin' : IDL.Func([IDL.Principal], [], []),
    'addBuilder' : IDL.Func([IDL.Principal], [], []),
    'addValidator' : IDL.Func([IDL.Principal], [], []),
    'deleteAdmin' : IDL.Func([IDL.Principal], [], []),
    'deleteBuildConfig' : IDL.Func([IDL.Principal], [], []),
    'deleteBuilder' : IDL.Func([IDL.Principal], [], []),
    'deleteValidator' : IDL.Func([IDL.Principal], [], []),
    'getActivities' : IDL.Func([PaginationInfo], [Pagination], ['query']),
    'getAdmins' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getBuildConfigById' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(BuildConfig)],
        ['query'],
      ),
    'getBuildConfigValidator' : IDL.Func(
        [BuildConfigInfo],
        [IDL.Opt(BuildConfig)],
        ['query'],
      ),
    'getBuildConfigs' : IDL.Func([], [IDL.Vec(BuildConfig)], ['query']),
    'getBuilders' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getValidators' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getVerificationByCanisterId' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(Verification)],
        ['query'],
      ),
    'getVerifications' : IDL.Func([PaginationInfo], [Pagination_1], ['query']),
    'registerVerification' : IDL.Func([RegisterVerification], [Result], []),
    'saveBuildConfig' : IDL.Func([SaveBuildConfig], [], []),
    'submitVerification' : IDL.Func([SubmitVerification], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
