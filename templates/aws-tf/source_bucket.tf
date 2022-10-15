resource "aws_s3_bucket" "source_code_bucket" {
  bucket = random_pet.bucket_name.id

  tags = {
    Environment = var.environment
  }
}

resource "aws_s3_bucket_acl" "example_bucket_acl" {
  bucket = aws_s3_bucket.source_code_bucket.id
  acl    = "private"
}

resource "random_pet" "bucket_name" {
  keepers = {
    # Generate a new pet name each time we manually change this name
    name = "pet_for_s3"
  }
}