workflow "New workflow" {
  on = "push"
  resolves = [
    "Test"
  ]
}

action "Test" {
  uses = "actions/setup-node@7af5963081f4115489390c8e8e31da346136cb37"
  runs = "yarn"
  args = "check:all"
}
