// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ISuperfluid, ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import {MacroForwarder, IUserDefinedMacro} from "@superfluid-finance/ethereum-contracts/contracts/utils/MacroForwarder.sol";

contract RewardsMacro is IUserDefinedMacro {
    using SuperTokenV1Library for ISuperToken;

    struct RewardStream {
        address receiver;
        int96 flowRate;
    }

    function buildBatchOperations(
        ISuperfluid host,
        bytes memory params,
        address msgSender
    ) external view override returns (ISuperfluid.Operation[] memory operations) {
        (ISuperToken token, RewardStream[] memory streams) = abi.decode(
            params,
            (ISuperToken, RewardStream[])
        );

        operations = new ISuperfluid.Operation[](streams.length);

        for (uint256 i = 0; i < streams.length; i++) {
            // Create or update flow for each reward recipient
            bytes memory callData = abi.encodeCall(
                IConstantFlowAgreementV1.createFlow,
                (token, streams[i].receiver, streams[i].flowRate, new bytes(0))
            );
            operations[i] = ISuperfluid.Operation({
                operationType: 201, // OPERATION_TYPE_SUPERFLUID_CALL_AGREEMENT
                target: address(host.getAgreementClass(
                    keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
                )),
                data: abi.encode(callData, new bytes(0))
            });
        }
    }

    function postCheck(
        ISuperfluid host,
        bytes memory params,
        address msgSender
    ) external view override {
        // Optional: verify all streams were created successfully
    }
}
