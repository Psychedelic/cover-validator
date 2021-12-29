import {APIGatewayProxyEvent, APIGatewayProxyResultV2} from "aws-lambda";
import {IsNotEmpty} from "class-validator";
import {transformAndValidate} from "class-transformer-validator";
import {validateRepoUrl} from "../utils";

class Request {
  @IsNotEmpty()
  repo_url?: string;

  @IsNotEmpty()
  user_repo_token?: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {
  try {
    const req = (await transformAndValidate(Request, event.body as string)) as Request;
    await validateRepoUrl(req.repo_url as string, req.user_repo_token as string);
    return {
      statusCode: 200
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error
      })
    };
  }
};
