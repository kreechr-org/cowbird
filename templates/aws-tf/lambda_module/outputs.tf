output "invoke_arn" {
  value = aws_lambda_function.lambdaFunction.invoke_arn
}
output "name" {
  value = aws_lambda_function.lambdaFunction.function_name
}

output "arn" {
  value = aws_lambda_function.lambdaFunction.arn
}