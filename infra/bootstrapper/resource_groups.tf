import {
  id = "/subscriptions/ec285037-c673-4f58-b594-d7c480da4e8b/resourceGroups/io-p-ioweb-sec-rg"
  to = azurerm_resource_group.sec_weu
}

resource "azurerm_resource_group" "sec_weu" {
  name     = "${local.prefix}-${local.env_short}-ioweb-sec-rg"
  location = "westeurope"

  tags = local.tags
}

import {
  id = "/subscriptions/ec285037-c673-4f58-b594-d7c480da4e8b/resourceGroups/io-p-itn-ioweb-fe-rg-01"
  to = azurerm_resource_group.fe_weu_01
}

resource "azurerm_resource_group" "fe_weu_01" {
  name     = "${local.prefix}-${local.env_short}-itn-ioweb-fe-rg-01"
  location = "italynorth"

  tags = local.tags
}

import {
  id = "/subscriptions/ec285037-c673-4f58-b594-d7c480da4e8b/resourceGroups/io-p-weu-ioweb-fe-rg"
  to = azurerm_resource_group.fe_weu
}

resource "azurerm_resource_group" "fe_weu" {
  name     = "${local.prefix}-${local.env_short}-weu-ioweb-fe-rg"
  location = "westeurope"

  tags = local.tags
}
