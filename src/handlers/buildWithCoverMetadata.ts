import {Principal} from '@dfinity/principal';
import {Octokit} from '@octokit/core';
import {APIGatewayProxyEvent} from 'aws-lambda';

import {coverActor} from '../actor/coverActor';
import {getCoverMetadataActor} from '../actor/coverMetadataActor';
import {config} from '../config';
import {throwCanisterResponseError} from '../error';
import {httpResponse} from '../httpResponse';
import {BuildWithCoverMetadataRequest} from '../model';
import {getCanisterControllers, transformAndValidateData, validateRepo} from '../utils';

const buildWithCoverMetadata = async (event: APIGatewayProxyEvent): Promise<void> => {
  const req = await transformAndValidateData<BuildWithCoverMetadataRequest>(event.body as string, BuildWithCoverMetadataRequest);

  const actor = getCoverMetadataActor(req.canisterId as string);

  const [coverMetadata, controllers] = await Promise.all([
    actor.coverMetadata(),
    getCanisterControllers(req.canisterId as string)
  ]);

  const repoVisibility = await validateRepo(coverMetadata.repo_url as string, req.repoAccessToken as string);

  const result = await coverActor.registerVerification({
    owner_id: Principal.fromText(controllers[0]),
    delegate_canister_id: [],
    canister_id: Principal.fromText(req.canisterId as string),
    dfx_version: coverMetadata.dfx_version,
    optimize_count: coverMetadata.optimize_count,
    canister_name: coverMetadata.canister_name,
    commit_hash: coverMetadata.commit_hash,
    repo_url: coverMetadata.repo_url,
    rust_version: coverMetadata.rust_version,
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
      owner_id_and_delegate_canister_id: `${controllers[0]}|`,
      canister_id: req.canisterId as string,
      canister_name: coverMetadata.canister_name,
      repo_url_and_visibility: `${coverMetadata.repo_url}|${repoVisibility}`,
      repo_access_token: req.repoAccessToken as string,
      commit_hash: coverMetadata.commit_hash,
      rust_version: coverMetadata.rust_version[0] || '',
      dfx_version: coverMetadata.dfx_version,
      optimize_count: coverMetadata.optimize_count.toString(),
      env: config.nodeEnv
    }
  });
};

export const handler = httpResponse(buildWithCoverMetadata);
