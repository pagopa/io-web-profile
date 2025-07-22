module "key_vaults" {
  source = "../modules/key_vaults"

  resource_group_name = data.azurerm_resource_group.main_resource_group.name
  tenant_id           = data.azurerm_client_config.current.tenant_id

  environment = {
    prefix      = local.prefix
    environment = local.env_short
    location    = local.location
  }

  tags = local.tags
}
