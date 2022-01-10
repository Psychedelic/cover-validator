import {transformAndValidateData, validateCanisterOwner, validateSignature} from "../utils";
import {APIGatewayProxyEvent} from "aws-lambda";
import {BuildConfigRequest} from "../model";
import {httpResponse} from "../httpResponse";

const addBuildConfig = async (event: APIGatewayProxyEvent): Promise<void> => {
  const req = await transformAndValidateData<BuildConfigRequest>(event.body as string, BuildConfigRequest);

  validateSignature(req.canisterId as string, req.signature as string, req.publicKey as string);

  await validateCanisterOwner(req.canisterId as string, req.userPrincipal as string);
};

export const handler = httpResponse(addBuildConfig);
