output "base_url" {
  description = "Base URL for API Gateway stage."

  value = aws_apigatewayv2_stage.api_gw_stage.invoke_url
}

output "helloWorld_url" {
  description = "URL for the helloWorld API Gateway endpoint."

  value = "${aws_apigatewayv2_stage.api_gw_stage.invoke_url}/helloWorld"
}

output "helloWorld2_url" {
  description = "URL for the helloWorld API Gateway endpoint."

  value = "${aws_apigatewayv2_stage.api_gw_stage.invoke_url}/helloWorld2"
}