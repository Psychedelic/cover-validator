import {transformAndValidateData, validateCanister, validateRepo, validateSignature} from "../utils";
import {APIGatewayProxyEvent} from "aws-lambda";
import {BuildConfigRequest} from "../model";
import {Octokit} from "@octokit/core";
import {config} from "../config";
import {httpResponse} from "../httpResponse";

const build = async (event: APIGatewayProxyEvent): Promise<void> => {
  const req = await transformAndValidateData<BuildConfigRequest>(event.body as string, BuildConfigRequest);

  validateSignature(req.canisterId as string, req.signature as string, req.publicKey as string);

  await validateCanister(req.canisterId as string, req.userPrincipal as string);

  await validateRepo(req.repoUrl as string, req.userAccessToken as string);

  const octokit = new Octokit({
    auth: config.coverGithubToken
  });

  await octokit.request("POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches", {
    owner: "Psychedelic",
    repo: "cover",
    workflow_id: "cover_build.yml",
    ref: "main",
    inputs: {
      canister_id: req.canisterId as string,
      canister_name: req.canisterName as string,
      repo_url: `github.com/${req.repoUrl}`,
      user_access_token: req.userAccessToken as string,
      commit_hash: req.commitHash as string,
      rust_version: req.rustVersion as string,
      dfx_version: req.dfxVersion as string,
      optimize_times: (req.optimizeTimes as number).toString()
    }
  });
};

export const handler = httpResponse(build);