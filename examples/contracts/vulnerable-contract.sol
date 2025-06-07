// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title VulnerableContract
 * @dev This contract contains intentional vulnerabilities for demonstration purposes
 */
contract VulnerableContract {
    mapping(address => uint256) public balances;
    
    /**
     * @dev Deposit funds into the contract
     */
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    /**
     * @dev Withdraw funds from the contract
     * @param amount The amount to withdraw
     * @notice This function is vulnerable to reentrancy attacks
     */
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // Vulnerable: Sends ETH before updating the balance
        (bool success, ) = msg.sender.call{value: amount}("");
        
        // Update balance after external call
        balances[msg.sender] -= amount;
    }
    
    /**
     * @dev Swap tokens with an external contract
     * @param externalContract The address of the external contract
     * @param data The calldata for the external contract
     * @notice This function is vulnerable to unchecked return values
     */
    function externalCall(address externalContract, bytes memory data) public {
        // Vulnerable: Does not check return value
        externalContract.call(data);
    }
    
    /**
     * @dev Execute a token swap
     * @param tokenAddress The address of the token contract
     * @param amount The amount to swap
     * @notice This function is vulnerable to front-running
     */
    function executeSwap(address tokenAddress, uint256 amount) public {
        // Vulnerable: No slippage protection or deadline
        // Code would go here to execute the swap
    }
    
    /**
     * @dev Get the contract balance
     * @return The contract balance
     */
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}