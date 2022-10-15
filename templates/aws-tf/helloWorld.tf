module "hello_world" {
  source        = "./lambda_module"
  lambdaName    = "helloWorld"
  zip_path     = "${path.module}/../dist/helloWorld.zip"
  executing_agw = aws_apigatewayv2_api.api_gw.execution_arn
  role          = aws_iam_role.iam_for_lambda.arn
}

resource "aws_apigatewayv2_integration" "hello_world" {
  api_id = aws_apigatewayv2_api.api_gw.id

  integration_uri    = module.hello_world.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "hello_world" {
  api_id = aws_apigatewayv2_api.api_gw.id

  route_key = "GET /helloWorld"
  target    = "integrations/${aws_apigatewayv2_integration.hello_world.id}"
}