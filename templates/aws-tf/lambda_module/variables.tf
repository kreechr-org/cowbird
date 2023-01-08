variable "lambdaName" {
  description = "The name of the Lambda function"
  type        = string
}
variable "memory" {
  description = "The amount of memory in MB your Lambda Function can use at runtime"
  type        = number
  default     = 768
}
variable "timeout" {
  description = "The amount of time your Lambda Function has to run in seconds"
  type        = number
  default     = 300
}
variable "runtime" {
  description = "The runtime environment for the Lambda Function"
  type        = string
  default     = "nodejs16.x"
}
variable "zip_path" {
  description = "The path to the Lambda Function's deployment package within the local filesystem. This zip will be uploaded to s3"
  type        = string
}
variable "handler" {
  description = "The function entrypoint in your code. The default is the index files and the handler function"
  type        = string
  default     = "index.handler"
}
variable "role" {
  description = "The ARN of the IAM role to attach to the Lambda function."
  type        = string
}

variable "executing_agw" {
  description = "The Api Gateway that will act as the trigger for the lambda"
  type        = string
}

variable "environment" {
  description = "The environment variables to pass to the Lambda function"
  type        = map(string)
  default     = {
    placeholder = "cannot be empty object"
  }
}