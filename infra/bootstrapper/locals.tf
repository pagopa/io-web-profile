locals {
  prefix          = "io"
  env_short       = "p"
  location        = "italynorth"
  domain          = "ioweb"
  instance_number = "01"

  adgroups = {
    admins_name    = "io-p-adgroup-auth-admins"
    devs_name      = "io-p-adgroup-auth-developers"
    externals_name = "io-p-adgroup-auth-externals"
  }

  runner = {
    cae_name                = "${local.prefix}-${local.env_short}-itn-github-runner-cae-01"
    cae_resource_group_name = "${local.prefix}-${local.env_short}-itn-github-runner-rg-01"
    secret = {
      kv_name                = "${local.prefix}-${local.env_short}-kv-common"
      kv_resource_group_name = "${local.prefix}-${local.env_short}-rg-common"
    }
  }

  vnet = {
    name                = "${local.prefix}-${local.env_short}-itn-common-vnet-01"
    resource_group_name = "${local.prefix}-${local.env_short}-itn-common-rg-01"
  }

  private_dns = {
    resource_group_name = "${local.prefix}-${local.env_short}-rg-common"
  }

  tf_storage_account = {
    name                = "iopitntfst001"
    resource_group_name = "terraform-state-rg"
  }

  repository = {
    name                     = "io-web-profile"
    description              = "ioapp.it web portal"
    topics                   = ["io", "it-web", "ioapp"]
    jira_boards_ids          = ["CES", "IO-PID"]
    reviewers_teams          = ["io-auth-n-identity-backend", "engineering-team-devex", "io-app"]
    default_branch_name      = "master"
    infra_cd_policy_branches = ["master"]
    opex_cd_policy_branches  = ["master"]
    app_cd_policy_branches   = ["master"]
  }

  key_vault = {
    name                = "io-p-kv-common"
    resource_group_name = "io-p-rg-common"
  }

  tags = {
    CreatedBy      = "Terraform"
    Environment    = "Prod"
    BusinessUnit   = "App IO"
    ManagementTeam = "IO Autenticazione"
    Source         = "https://github.com/pagopa/io-web-profile/blob/main/infra/bootstrapper"
    CostCenter     = "TS000 - Tecnologia e Servizi"
  }
}
