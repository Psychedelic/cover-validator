import {transformAndValidateData, validateCanister, validatePrincipal, validateRepo, validateSignature} from "../utils";
import {APIGatewayProxyEvent} from "aws-lambda";
import {BuildConfigRequest} from "../model";
import {CanisterResponseError} from "../error";
import {Octokit} from "@octokit/core";
import {Principal} from "@dfinity/principal";
import {config} from "../config";
import {coverActor} from "../actor/coverActor";
import {httpResponse} from "../httpResponse";

const build = async (event: APIGatewayProxyEvent): Promise<void> => {
  const req = await transformAndValidateData<BuildConfigRequest>(event.body as string, BuildConfigRequest);

  validatePrincipal(req.userPrincipal as string, req.publicKey as string);

  validateSignature(req.canisterId as string, req.signature as string, req.publicKey as string);

  await validateCanister(req.canisterId as string, req.userPrincipal as string);

  await validateRepo(req.repoUrl as string, req.repoAccessToken as string);

  const result = await coverActor.registerVerification({
    owner_id: Principal.fromText(req.userPrincipal as string),
    canister_id: Principal.fromText(req.canisterId as string),
    dfx_version: req.dfxVersion as string,
    optimize_count: req.optimizeCount as number,
    canister_name: req.canisterName as string,
    commit_hash: req.commitHash as string,
    repo_url: req.repoUrl as string,
    rust_version: req.rustVersion ? [req.rustVersion] : []
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
      owner_id: req.userPrincipal as string,
      canister_id: req.canisterId as string,
      canister_name: req.canisterName as string,
      repo_url: `github.com/${req.repoUrl}`,
      repo_access_token: req.repoAccessToken as string,
      commit_hash: req.commitHash as string,
      rust_version: req.rustVersion as string,
      dfx_version: req.dfxVersion as string,
      optimize_count: (req.optimizeCount as number).toString()
    }
  });
};

export const handler = httpResponse(build);
