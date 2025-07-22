output "ioweb" {
  value = {
    id                  = azurerm_key_vault.ioweb.id
    name                = azurerm_key_vault.ioweb.name
    resource_group_name = azurerm_key_vault.ioweb.resource_group_name
  }
}