import {transformAndValidateData, validateCanister, validateRepo, validateSignature} from "../utils";
import {APIGatewayProxyEvent} from "aws-lambda";
import {BuildConfigNotFound} from "../error";
import {BuildWasmRequest} from "../model";
import {Octokit} from "@octokit/core";
import {Principal} from "@dfinity/principal";
import {config} from "../config";
import {coverActor} from "../actor/coverActor";
import {httpResponse} from "../httpResponse";

const buildWasm = async (event: APIGatewayProxyEvent): Promise<void> => {
  const req = await transformAndValidateData<BuildWasmRequest>(event.body as string, BuildWasmRequest);

  validateSignature(req.canisterId as string, req.signature as string, req.publicKey as string);

  await validateCanister(req.canisterId as string, req.userPrincipal as string);

  const buildConfig = await coverActor.getBuildConfigProvider({
    canister_id: Principal.fromText(req.canisterId as string),
    owner_id: Principal.fromText(req.userPrincipal as string)
  });

  if (!buildConfig.length) {
    throw BuildConfigNotFound;
  }

  await validateRepo(buildConfig[0].repo_url, req.repoAccessToken as string);

  const octokit = new Octokit({
    auth: config.coverGithubToken
  });

  await octokit.request("POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches", {
    owner: "Psychedelic",
    repo: "cover",
    workflow_id: "cover_build.yml",
    ref: "main",
    inputs: {
      owner_id: req.userPrincipal as string,
      canister_id: req.canisterId as string,
      canister_name: buildConfig[0].canister_name,
      repo_url: `github.com/${buildConfig[0].repo_url}`,
      repo_access_token: req.repoAccessToken as string,
      commit_hash: buildConfig[0].commit_hash,
      rust_version: buildConfig[0].rust_version[0] || "",
      dfx_version: buildConfig[0].dfx_version,
      optimize_count: buildConfig[0].optimize_count.toString()
    }
  });
};

export const handler = httpResponse(buildWasm);
