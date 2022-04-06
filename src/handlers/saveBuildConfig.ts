import {Principal} from "@dfinity/principal";
import {APIGatewayProxyEvent} from "aws-lambda";

import {coverActor} from "../actor/coverActor";
import {httpResponse} from "../httpResponse";
import {BuildConfigRequest} from "../model";
import {
  transformAndValidateData,
  validateCanister,
  validatePrincipal,
  validateRepo,
  validateSignature,
  validateTimestamp
} from "../utils";

const saveBuildConfig = async (event: APIGatewayProxyEvent): Promise<void> => {
  const req = await transformAndValidateData<BuildConfigRequest>(event.body as string, BuildConfigRequest);

  validatePrincipal(req.ownerId as string, req.publicKey as string);

  validateTimestamp(req.timestamp as number);

  validateSignature(req.timestamp as number, req.signature as string, req.publicKey as string);

  await validateCanister(req.canisterId as string, req.ownerId as string);

  await validateRepo(req.repoUrl as string, req.repoAccessToken as string);

  await coverActor.saveBuildConfig({
    owner_id: Principal.fromText(req.ownerId as string),
    canister_id: Principal.fromText(req.canisterId as string),
    dfx_version: req.dfxVersion as string,
    optimize_count: req.optimizeCount as number,
    canister_name: req.canisterName as string,
    commit_hash: req.commitHash as string,
    repo_url: req.repoUrl as string,
    rust_version: req.rustVersion ? [req.rustVersion] : []
  });
};

export const handler = httpResponse(saveBuildConfig);
