terraform {

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "<= 3.117.0"
    }

    github = {
      source  = "integrations/github"
      version = "6.3.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfappprodio"
    container_name       = "terraform-state"
    key                  = "io-web-profile.repository.tfstate"
  }
}

provider "azurerm" {
  features {
  }
}

provider "github" {
  owner = "pagopa"
}

data "azurerm_client_config" "current" {}

data "azurerm_subscription" "current" {}
