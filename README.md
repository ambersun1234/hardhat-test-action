# Hardhat Test Action
Simple wrapper of hardhat test to GitHub Action

## Introduction
This action aims to run on top of hardhat project, make sure you're using hardhat in your project\
Currently, we support 2 package manager(`yarn` and `npm`)\
By specifying `network` option in your workflow, this project can run on either `local hardhat network` or `testnet`\
One thing to note is that when you choose to run with testnet, since we're actually integrating with real blockchain, you need to provide an account with some amount of ETH based on your test case usage, you can provide your account via [GitHub Secrets](https://github.com/Azure/actions-workflow-samples/blob/master/assets/create-secrets-for-GitHub-workflows.md)

## How to use
Create a workflow file under `.github/workflows`, and name it as for example `test.yaml` and fill with following content
```yaml
on: [push]

jobs:
    test:
    runs-on: ubuntu-latest
    name: Hardhat unit test
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Environment
      uses: actions/setup-node@v3
    - name: Test
      uses: ambersun1234/hardhat-test-action@v1
      with:
        network: hardhat
        private_key: ${{ secrets.private_key }}
```

## Build
```
$ yarn install
$ yarn tsc
```

## License
This project is licensed under MIT license - see the [LICENSE](./LICENSE) file for more detail