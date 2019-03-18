workflow "Deploy on Now" {
  on = "push"
  resolves = ["release"]
}

action "Only master branch" {
  uses = "actions/bin/filter@d820d56839906464fb7a57d1b4e1741cf5183efa"
  args = "branch master"
}

action "deploy" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  needs = ["Only master branch"]
  args = "deploy --local-config=./now.json --env NODE_ENV=production --public --no-clipboard"
  secrets = ["ZEIT_TOKEN"]
}

action "release" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  needs = ["deploy"]
  args = "alias --local-config=./now.json"
  secrets = ["ZEIT_TOKEN"]
}
