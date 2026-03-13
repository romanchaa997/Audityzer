// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {RehabFundDistributor} from "../src/RehabFundDistributor.sol";

contract DeployRehabFund is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address initialOwner = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);
        RehabFundDistributor fund = new RehabFundDistributor(initialOwner);
        vm.stopBroadcast();

        // Output for easy CI/CD logging
        console.log("RehabFundDistributor deployed at:", address(fund));
        console.log("Owner set to:", initialOwner);
    }
}
