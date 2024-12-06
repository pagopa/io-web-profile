data "azurerm_user_assigned_identity" "identity_app_prod_cd" {
  name                = "${local.project}-web-profile-app-github-cd-identity"
  resource_group_name = local.identity_resource_group_name
}

data "github_organization_teams" "all" {
  root_teams_only = true
  summary_only    = true
}
