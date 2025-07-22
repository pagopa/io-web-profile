locals {
  prefix         = "io"
  env_short      = "p"
  location_short = "itn"
  location       = "italynorth"
  project        = "${local.prefix}-${local.env_short}-${local.location_short}"
  domain         = "ioweb"

  tags = {
    CreatedBy      = "Terraform"
    Environment    = "Prod"
    Owner          = "IO"
    ManagementTeam = "IO Autenticazione"
    Source         = "https://github.com/pagopa/io-web-profile/tree/main/infra/resources/prod"
    CostCenter     = "TS000 - Tecnologia e Servizi"
  }
}