variable "auth0_domain" { type = string }
variable "auth0_client_id" { type = string }
variable "auth0_client_secret" { type = string }

provider "auth0" {
  version = "~> 0.8"

  domain        = var.auth0_domain
  client_id     = var.auth0_client_id
  client_secret = var.auth0_client_secret
}

resource "auth0_client" "next-app" {
  name                = "Next.js App"
  app_type            = "regular_web"
  callbacks           = ["http://localhost:3000/api/callback"]
  allowed_logout_urls = ["http://localhost:3000/"]
  oidc_conformant     = true
  jwt_configuration {
    alg = "RS256"
    scopes = {
      foo = "bar"
    }
  }
}
