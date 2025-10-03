data "azurerm_user_assigned_identity" "infra_ci" {
  name                = "io-p-itn-auth-infra-github-ci-id-01"
  resource_group_name = "io-p-itn-auth-rg-01"
}

data "azurerm_user_assigned_identity" "infra_cd" {
  name                = "io-p-itn-auth-infra-github-cd-id-01"
  resource_group_name = "io-p-itn-auth-rg-01"
}

module "auth_infra_ci" {
  source  = "pagopa-dx/azure-role-assignments/azurerm"
  version = "~> 1.2"

  subscription_id = data.azurerm_subscription.current.subscription_id
  principal_id    = data.azurerm_user_assigned_identity.infra_ci.principal_id

  key_vault = [{
    name                = "io-p-ioweb-kv"
    resource_group_name = "io-p-ioweb-sec-rg"
    has_rbac_support    = false
    description         = "Allow IO Auth monorepo infra github ci to read secrets from key vault"
    roles = {
      secrets = "reader"
    }
  }]
}

module "auth_infra_cd" {
  source  = "pagopa-dx/azure-role-assignments/azurerm"
  version = "~> 1.2"

  subscription_id = data.azurerm_subscription.current.subscription_id
  principal_id    = data.azurerm_user_assigned_identity.infra_cd.principal_id

  key_vault = [{
    name                = "io-p-ioweb-kv"
    resource_group_name = "io-p-ioweb-sec-rg"
    has_rbac_support    = false
    description         = "Allow IO Auth monorepo infra github ci to read secrets from key vault"
    roles = {
      secrets = "writer"
    }
  }]
}
