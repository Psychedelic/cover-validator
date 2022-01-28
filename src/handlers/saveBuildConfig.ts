import {transformAndValidateData, validateCanister, validatePrincipal, validateRepo, validateSignature} from "../utils";
import {APIGatewayProxyEvent} from "aws-lambda";
import {BuildConfigRequest} from "../model";
import {Principal} from "@dfinity/principal";
import {coverActor} from "../actor/coverActor";
import {httpResponse} from "../httpResponse";

const saveBuildConfig = async (event: APIGatewayProxyEvent): Promise<void> => {
  const req = await transformAndValidateData<BuildConfigRequest>(event.body as string, BuildConfigRequest);

  validatePrincipal(req.userPrincipal as string, req.publicKey as string);

  validateSignature(req.canisterId as string, req.signature as string, req.publicKey as string);

  await validateRepo(req.repoUrl as string, req.repoAccessToken as string);

  await validateCanister(req.canisterId as string, req.userPrincipal as string);

  await coverActor.saveBuildConfig({
    owner_id: Principal.fromText(req.userPrincipal as string),
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
