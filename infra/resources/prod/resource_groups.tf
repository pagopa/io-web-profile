data "azurerm_resource_group" "main_resource_group" {
  name = "${local.project}-${local.domain}-rg-01"
}
