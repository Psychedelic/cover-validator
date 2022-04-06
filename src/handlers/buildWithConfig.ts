import {BuildConfigNotFound, CanisterResponseError} from "../error";
import {
  transformAndValidateData,
  validateCanister,
  validatePrincipal,
  validateRepo,
  validateSignature,
  validateTimestamp
} from "../utils";
import {APIGatewayProxyEvent} from "aws-lambda";
import {BuildWithConfigRequest} from "../model";
import {Octokit} from "@octokit/core";
import {Principal} from "@dfinity/principal";
import {config} from "../config";
import {coverActor} from "../actor/coverActor";
import {httpResponse} from "../httpResponse";

const buildWithConfig = async (event: APIGatewayProxyEvent): Promise<void> => {
  const req = await transformAndValidateData<BuildWithConfigRequest>(event.body as string, BuildWithConfigRequest);

  validatePrincipal(req.ownerId as string, req.publicKey as string);

  validateTimestamp(req.timestamp as number);

  validateSignature(req.timestamp as number, req.signature as string, req.publicKey as string);

  await validateCanister(req.canisterId as string, req.ownerId as string);

  const buildConfig = await coverActor.getBuildConfigValidator({
    canister_id: Principal.fromText(req.canisterId as string),
    owner_id: Principal.fromText(req.ownerId as string)
  });

  if (!buildConfig.length) {
    throw BuildConfigNotFound;
  }

  await validateRepo(buildConfig[0].repo_url, req.repoAccessToken as string);

  const result = await coverActor.registerVerification({
    owner_id: buildConfig[0].owner_id,
    canister_id: buildConfig[0].canister_id,
    dfx_version: buildConfig[0].dfx_version,
    optimize_count: buildConfig[0].optimize_count,
    canister_name: buildConfig[0].canister_name,
    commit_hash: buildConfig[0].commit_hash,
    repo_url: buildConfig[0].repo_url,
    rust_version: buildConfig[0].rust_version
  });

  if ("Err" in result) {
    throw CanisterResponseError(result.Err);
  }

  const octokit = new Octokit({
    auth: config.coverGithubToken
  });

  await octokit.request("POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches", {
    owner: "Psychedelic",
    repo: "cover-builder",
    workflow_id: "cover_builder.yml",
    ref: "main",
    inputs: {
      owner_id: buildConfig[0].owner_id.toText(),
      canister_id: buildConfig[0].canister_id.toText(),
      canister_name: buildConfig[0].canister_name,
      repo_url: buildConfig[0].repo_url,
      repo_access_token: req.repoAccessToken as string,
      commit_hash: buildConfig[0].commit_hash,
      rust_version: buildConfig[0].rust_version[0] || "",
      dfx_version: buildConfig[0].dfx_version,
      optimize_count: buildConfig[0].optimize_count.toString(),
      env: config.nodeEnv
    }
  });
};

export const handler = httpResponse(buildWithConfig);
