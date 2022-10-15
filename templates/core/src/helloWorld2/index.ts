import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {exampleString} from "../lib";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log(event);

    return {
        statusCode: 200,
        body: `HelloWorld: ${exampleString}`
    };
};