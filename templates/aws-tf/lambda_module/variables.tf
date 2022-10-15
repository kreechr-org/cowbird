variable "lambdaName" {
  type = string
}
variable "memory" {
  type    = number
  default = 768
}
variable "timeout" {
  type    = number
  default = 300
}
variable "runtime" {
  type    = string
  default = "nodejs16.x"
}
variable "file_path" {
  type = string
}
variable "handler" {
  type    = string
  default = "index.handler"
}
variable "role" {
  type = string
}
variable "s3_bucket" {
  type = string
}
variable "source_code_key" {
  type    = string
  default = ""
}
variable "executing_agw" {
  type = string
}