// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title RehabFundDistributor
 * @author AuditorSEC LLC (EDRPOU 46077399)
 * @notice Transparent, auditable fund distributor for rehabilitation programs.
 *         Accepts ERC-20 donations, locks them, and allows the owner to release
 *         funds to verified beneficiaries. All operations emit events for
 *         on-chain accountability.
 */
contract RehabFundDistributor is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // --- Events ---
    event Donated(address indexed donor, address indexed token, uint256 amount);
    event Released(address indexed to, address indexed token, uint256 amount);
    event EmergencyWithdraw(address indexed token, uint256 amount);

    // --- State ---
    mapping(address => uint256) public lockedBalance;

    // --- Constructor ---
    constructor(address initialOwner) Ownable(initialOwner) {}

    // --- Core Functions ---

    /**
     * @notice Donate ERC-20 tokens to the fund.
     * @param token ERC-20 token contract address.
     * @param amount Amount to donate (must have approval).
     */
    function donate(address token, uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        require(token != address(0), "Invalid token");

        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        lockedBalance[token] += amount;

        emit Donated(msg.sender, token, amount);
    }

    /**
     * @notice Release locked funds to a beneficiary (owner only).
     * @param token ERC-20 token contract address.
     * @param to Beneficiary address.
     * @param amount Amount to release.
     */
    function release(
        address token,
        address to,
        uint256 amount
    ) external onlyOwner nonReentrant {
        require(amount > 0, "Amount must be > 0");
        require(to != address(0), "Invalid recipient");
        require(lockedBalance[token] >= amount, "Insufficient locked balance");

        lockedBalance[token] -= amount;
        IERC20(token).safeTransfer(to, amount);

        emit Released(to, token, amount);
    }

    /**
     * @notice Emergency withdraw all tokens of a type (owner only).
     * @param token ERC-20 token contract address.
     */
    function emergencyWithdraw(address token) external onlyOwner nonReentrant {
        uint256 bal = lockedBalance[token];
        require(bal > 0, "Nothing to withdraw");

        lockedBalance[token] = 0;
        IERC20(token).safeTransfer(owner(), bal);

        emit EmergencyWithdraw(token, bal);
    }
}
