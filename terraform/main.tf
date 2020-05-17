provider "aws" {
    region = "eu-west-2"
}
module "basic_spa" {
    source = "git@github.com:stephenharris/tf-spa.git?ref=1.0.0"
    bucket_name = "cd.uno"
    application_name = "Uno"
    domain_name = ""
}