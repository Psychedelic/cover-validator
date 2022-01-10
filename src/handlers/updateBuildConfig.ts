import {transformAndValidateData, validateCanisterOwner, validateRepoUrl, validateSignature} from "../utils";
import {APIGatewayProxyEvent} from "aws-lambda";
import {BuildConfigRequest} from "../model";
import {httpResponse} from "../httpResponse";

const updateBuildConfig = async (event: APIGatewayProxyEvent): Promise<void> => {
  const req = await transformAndValidateData<BuildConfigRequest>(event.body as string, BuildConfigRequest);

  validateSignature(req.canisterId as string, req.signature as string, req.publicKey as string);

  await validateRepoUrl(req.repoUrl as string, req.userAccessToken as string);

  await validateCanisterOwner(req.canisterId as string, req.userPrincipal as string);
};

export const handler = httpResponse(updateBuildConfig);
