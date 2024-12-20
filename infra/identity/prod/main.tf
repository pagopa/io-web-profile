terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "<= 3.117.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfappprodio"
    container_name       = "terraform-state"
    key                  = "io-web-profile.identity.tfstate"
  }
}

provider "azurerm" {
  features {
  }
}

module "app_federated_identities" {
  source = "github.com/pagopa/dx//infra/modules/azure_federated_identity_with_github?ref=main"

  continuos_integration = { enable = false }

  prefix    = local.prefix
  env_short = local.env_short
  env       = "app-${local.env}"
  domain    = "${local.domain}-app"
  location  = local.location

  repositories = [local.repo_name]

  tags = local.tags
}
