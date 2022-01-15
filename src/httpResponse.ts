import {APIGatewayProxyEvent, APIGatewayProxyResultV2} from "aws-lambda";
import {ErrorResponse, UnexpectedError} from "./error";

const response = (statusCode: number, body?: unknown): APIGatewayProxyResultV2 => ({
  statusCode,
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
});

export const httpResponse =
  (
    handler: (event: APIGatewayProxyEvent) => Promise<void>
  ): ((event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResultV2>) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {
    try {
      await handler(event);
      return response(200);
    } catch (error) {
      console.error("Unexpected Error:", error);
      if (error instanceof ErrorResponse) {
        return response(400, error);
      }
      return response(500, UnexpectedError);
    }
  };
