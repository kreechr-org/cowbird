resource "aws_lambda_function" "lambdaFunction" {
  function_name    = var.lambdaName
  memory_size      = var.memory
  timeout          = var.timeout
  runtime          = var.runtime
  role             = var.role
  filename         = var.zip_path
  handler          = var.handler
  source_code_hash = filebase64sha256(var.zip_path)
  layers           = var.layers
  environment {
    variables = var.environment
  }
}

resource "aws_cloudwatch_log_group" "lambdaFunction_logs" {
  name              = "/aws/lambda/${aws_lambda_function.lambdaFunction.function_name}"
  retention_in_days = 1
}

resource "aws_lambda_permission" "api_gw" {
  count         = var.trigger == "agw" ? 1 : 0
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambdaFunction.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.agw_execution_arn}/*/*"
}

resource "aws_lambda_permission" "with_sqs" {
  count         = var.trigger == "sqs" ? 1 : 0
  statement_id  = "AllowExecutionFromSQS"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambdaFunction.function_name
  principal     = "sqs.amazonaws.com"
  source_arn    = var.sqs_arn
}