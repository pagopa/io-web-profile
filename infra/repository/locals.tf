locals {
  project = "io-p"

  identity_resource_group_name = "${local.project}-identity-rg"

  repo_secrets = {
    "ARM_TENANT_ID"       = data.azurerm_client_config.current.tenant_id,
    "ARM_SUBSCRIPTION_ID" = data.azurerm_subscription.current.subscription_id
  }

  cd_app = {
    secrets = {
      "ARM_CLIENT_ID" = data.azurerm_user_assigned_identity.identity_app_prod_cd.client_id
    }
    reviewers_teams = ["engineering-team-cloud-eng", "io-backend-contributors"]
  }
}
