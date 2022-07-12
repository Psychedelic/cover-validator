import {Principal} from '@dfinity/principal';
import {Octokit} from '@octokit/core';
import {APIGatewayProxyEvent} from 'aws-lambda';

import {coverActor} from '../actor/coverActor';
import {config} from '../config';
import {throwCanisterResponseError} from '../error';
import {httpResponse} from '../httpResponse';
import {BuildConfigRequest} from '../model';
import {
  transformAndValidateData,
  validateCanister,
  validatePrincipal,
  validateRepo,
  validateSignature,
  validateTimestamp
} from '../utils';

const build = async (event: APIGatewayProxyEvent): Promise<void> => {
  const req = await transformAndValidateData<BuildConfigRequest>(event.body as string, BuildConfigRequest);

  validatePrincipal(req.ownerId as string, req.publicKey as string);

  validateTimestamp(req.timestamp as number);

  validateSignature(req.timestamp as number, req.signature as string, req.publicKey as string);

  if (req.delegateCanisterId) {
    await Promise.all([
      validateCanister(req.delegateCanisterId as string, req.ownerId as string),
      validateCanister(req.canisterId as string, req.delegateCanisterId as string)
    ]);
  } else {
    await validateCanister(req.canisterId as string, req.ownerId as string);
  }

  const repoVisibility = await validateRepo(req.repoUrl as string, req.repoAccessToken as string);

  const result = await coverActor.registerVerification({
    owner_id: Principal.fromText(req.ownerId as string),
    delegate_canister_id: req.delegateCanisterId ? [Principal.fromText(req.delegateCanisterId as string)] : [],
    canister_id: Principal.fromText(req.canisterId as string),
    dfx_version: req.dfxVersion as string,
    optimize_count: req.optimizeCount as number,
    canister_name: req.canisterName as string,
    commit_hash: req.commitHash as string,
    repo_url: req.repoUrl as string,
    rust_version: req.rustVersion ? [req.rustVersion] : [],
    repo_visibility: repoVisibility
  });

  if ('Err' in result) {
    throw throwCanisterResponseError(result.Err);
  }

  const octokit = new Octokit({
    auth: config.coverGithubToken
  });

  await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
    owner: 'Psychedelic',
    repo: 'cover-builder',
    workflow_id: 'cover_builder.yml',
    ref: config.builderBranch,
    inputs: {
      owner_id_and_delegate_canister_id: `${req.ownerId}|${req.delegateCanisterId}`,
      canister_id: req.canisterId as string,
      canister_name: req.canisterName as string,
      repo_url_and_visibility: req.repoUrl as string,
      repo_access_token: `${req.repoAccessToken}|${repoVisibility}`,
      commit_hash: req.commitHash as string,
      rust_version: req.rustVersion as string,
      dfx_version: req.dfxVersion as string,
      optimize_count: (req.optimizeCount as number).toString(),
      env: config.nodeEnv
    }
  });
};

export const handler = httpResponse(build);
