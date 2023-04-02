import * as core from "@actions/core";
import * as cli from "@actions/exec";
import * as fs from "fs";
import * as path from "path";

const packageManagerFileMap = new Map<string, string>([
  ["yarn", "yarn.lock"],
  ["npm", "package-lock.json"],
]);

const packageManagerCommandMap = new Map<string, string>([
  ["yarn", "yarn install"],
  ["npm", "npm install"],
]);

const localNetwork = "hardhat";

const fileExists = (lockFileName: string): boolean => {
  return fs.existsSync(path.join(process.cwd(), lockFileName));
};

const main = async () => {
  const network = core.getInput("network");
  const privateKey = core.getInput("private_key");
  const rpcUrl = core.getInput("rpc_url");
  const networkArgs = ["--network", network];

  if (network !== localNetwork) {
    if (privateKey !== "") {
      core.setFailed("Private key not found");
    }
    if (rpcUrl !== "") {
      core.setFailed("RPC url not found");
    }
  }

  const content = `
    PRIVATE_KEY=${privateKey}\
    ${network.toUpperCase()}_RPC_URL=${rpcUrl}\
  `;
  fs.writeFileSync(path.join(process.cwd(), ".env"), content, { flag: "w" });

  for (let [packageManager, file] of packageManagerFileMap) {
    if (fileExists(file)) {
      await cli.exec(packageManagerCommandMap.get(packageManager)!);
    }
  }

  await cli.exec("yarn hardhat test", networkArgs);
};

main().catch((e) => {
  core.setFailed(e);
});
