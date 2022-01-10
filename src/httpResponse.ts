import {APIGatewayProxyEvent, APIGatewayProxyResultV2} from "aws-lambda";
import {ErrorResponse, UnexpectedError} from "./error";

export const httpResponse =
  (
    handler: (event: APIGatewayProxyEvent) => Promise<void>
  ): ((event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResultV2>) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {
    try {
      await handler(event);
      return {
        statusCode: 200
      };
    } catch (error) {
      if (error instanceof ErrorResponse) {
        return {
          statusCode: 400,
          body: JSON.stringify({error})
        };
      }
      return {
        statusCode: 500,
        body: JSON.stringify(UnexpectedError)
      };
    }
  };
