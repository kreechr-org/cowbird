variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "eu-central-1"
}

variable "projectName" {
  description = "The project name which will be used as a prefix for a lot of resources."
  type        = string
  default     = "cowbird"
}

variable "environment" {
  description = "The environment of this deployment"
  type        = string
  default     = "prod"
}