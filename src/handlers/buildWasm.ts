import {transformAndValidateData, validateCanisterOwner, validateRepoUrl, validateSignature} from "../utils";
import {APIGatewayProxyEvent} from "aws-lambda";
import {BuilConfigNotFound} from "../error";
import {BuildWasmRequest} from "../model";
import {Octokit} from "@octokit/core";
import {Principal} from "@dfinity/principal";
import {config} from "../config";
import {getCoverActor} from "../actor";
import {httpResponse} from "../httpResponse";

const buildWasm = async (event: APIGatewayProxyEvent): Promise<void> => {
  const req = await transformAndValidateData<BuildWasmRequest>(event.body as string, BuildWasmRequest);

  validateSignature(req.canisterId as string, req.signature as string, req.publicKey as string);

  await validateCanisterOwner(req.canisterId as string, req.userPrincipal as string);

  const coverActor = await getCoverActor();
  const buildConfig = await coverActor.getBuildConfigProvider(
    Principal.fromText(req.userPrincipal as string),
    Principal.fromText(req.canisterId as string)
  );

  if (!buildConfig.length) {
    throw BuilConfigNotFound;
  }

  await validateRepoUrl(buildConfig[0].repo_url, req.userAccessToken as string);

  const octokit = new Octokit({
    auth: config.coverToken
  });

  await octokit.request("POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches", {
    owner: "Psychedelic",
    repo: "cover",
    workflow_id: "cover_build.yml",
    ref: "main",
    inputs: {
      canister_id: req.canisterId as string,
      canister_name: buildConfig[0].canister_name,
      repo_url: `github.com/${buildConfig[0].repo_url}`,
      user_access_token: req.userAccessToken as string,
      commit_hash: buildConfig[0].commit_hash,
      rust_version: buildConfig[0].rust_version,
      dfx_version: buildConfig[0].dfx_version,
      optimize_times: buildConfig[0].optimize_times.toString()
    }
  });
};

export const handler = httpResponse(buildWasm);
