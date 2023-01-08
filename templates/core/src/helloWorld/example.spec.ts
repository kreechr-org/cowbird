import {handler} from "./index";
import {exampleString} from "../lib";
import {APIGatewayProxyEvent} from "aws-lambda";

describe("main", function () {
    it("should pass", async () => {
        const event = {} as APIGatewayProxyEvent;

        const response = await handler(event);

        expect(response).toMatchObject({
            statusCode: 200,
            body: `HelloWorld: ${exampleString}`
        });
    });
});