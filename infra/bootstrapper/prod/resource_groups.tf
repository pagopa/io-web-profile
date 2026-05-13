resource "azurerm_resource_group" "sec_weu" {
  name     = "${local.prefix}-${local.env_short}-ioweb-sec-rg"
  location = "westeurope"

  tags = local.tags
}

resource "azurerm_resource_group" "fe_weu_01" {
  name     = "${local.prefix}-${local.env_short}-itn-ioweb-fe-rg-01"
  location = "italynorth"

  tags = local.tags
}

resource "azurerm_resource_group" "fe_weu" {
  name     = "${local.prefix}-${local.env_short}-weu-ioweb-fe-rg"
  location = "westeurope"

  tags = local.tags
}
