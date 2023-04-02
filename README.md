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
```
or
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
        network: goerli
        private_key: ${{ secrets.private_key }}
        rpc_url: ${{ secrets.rpc_url }}
```

## Note
To align environment variable with your hardhat project,\
please check your variable declaration match the following convention or not\
We'll use only 2 categories of variable
+ private key :arrow_right: defined as `PRIVATE_KEY`
+ rpc url :arrow_right: based on different test network, will have these structure `{NETWORK}_RPC_URL`, where `NETWORK` is the upper case of network name(e.g. `GOERLI`, `SEPOLIA`)

These environment variable needs to be consistent with data in 
+ `hardhat.config.ts`
+ `.env`


## Build
```
$ yarn install
$ yarn webpack
```

## License
This project is licensed under MIT license - see the [LICENSE](./LICENSE) file for more detail