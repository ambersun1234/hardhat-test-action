"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const cli = require("@actions/exec");
const fs = require("fs");
const path = require("path");
const packageManagerFileMap = new Map([
    ["yarn", "yarn.lock"],
    ["npm", "package-lock.json"],
]);
const packageManagerCommandMap = new Map([
    ["yarn", "yarn install"],
    ["npm", "npm install"],
]);
const localNetwork = "hardhat";
const fileExists = (lockFileName) => {
    return fs.existsSync(path.join(process.cwd(), lockFileName));
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const network = core.getInput("network");
    const networkArgs = ["--network", network];
    if (network !== localNetwork && process.env.INPUT_PRIVATE_KEY != "") {
        core.setFailed("Private key not found");
    }
    for (let [packageManager, file] of packageManagerFileMap) {
        if (fileExists(file)) {
            yield cli.exec(packageManagerCommandMap[packageManager]);
        }
    }
    yield cli.exec("yarn hardhat test", networkArgs);
});
main().catch((e) => {
    core.setFailed(e);
});
//# sourceMappingURL=main.js.map