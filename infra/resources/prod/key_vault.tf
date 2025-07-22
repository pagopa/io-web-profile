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

import {
  to = module.key_vaults.azurerm_key_vault.ioweb
  id = "/subscriptions/ec285037-c673-4f58-b594-d7c480da4e8b/resourceGroups/io-p-itn-auth-main-rg-01/providers/Microsoft.KeyVault/vaults/io-p-itn-ioweb-kv-01"
}