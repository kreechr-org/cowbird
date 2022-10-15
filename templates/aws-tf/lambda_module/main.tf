resource "aws_lambda_function" "lambdaFunction" {
  function_name     = var.lambdaName
  memory_size       = var.memory
  timeout           = var.timeout
  runtime           = var.runtime
  role              = var.role
  handler           = var.handler
  s3_bucket         = var.s3_bucket
  s3_key            = aws_s3_object.source_code.key
  s3_object_version = aws_s3_object.source_code.version_id
  source_code_hash = filebase64sha256(var.file_path)
}

resource "aws_s3_object" "source_code" {
  bucket           = var.s3_bucket
  key              = var.source_code_key == "" ? "${var.lambdaName}.zip" : var.source_code_key
  source           = var.file_path

  etag             = filemd5(var.file_path)
}


resource "aws_cloudwatch_log_group" "lambdaFunction_logs" {
  name              = "/aws/lambda/${aws_lambda_function.lambdaFunction.function_name}"
  retention_in_days = 1
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambdaFunction.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.executing_agw}/*/*"
}