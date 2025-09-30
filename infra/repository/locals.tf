locals {
  repository = {
    name                     = "io-web-profile"
    description              = "ioapp.it web portal"
    topics                   = ["io", "it-web", "ioapp"]
    jira_boards_ids          = ["CES", "IO-PID"]
    reviewers_teams          = ["io-auth-n-identity-backend", "engineering-team-devex", "io-app"]
    default_branch_name      = "master"
    infra_cd_policy_branches = ["master"]
    opex_cd_policy_branches  = ["master"]
    app_cd_policy_branches   = ["master"]
  }
}
