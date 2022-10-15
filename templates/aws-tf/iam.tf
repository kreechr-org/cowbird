resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda-${random_pet.iam_for_lambda.id}"

  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Sid       = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "random_pet" "iam_for_lambda" {
  keepers = {
    # Generate a new pet name each time we manually change this name
    name = "pet_for_lambda_iam"
  }
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}