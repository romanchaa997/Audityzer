// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/RehabFundDistributor.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract RehabFundDistributorTest is Test {
    RehabFundDistributor public fund;
    MockERC20 public token;
    address public owner = makeAddr("owner");
    address public donor = makeAddr("donor");
    address public beneficiary = makeAddr("beneficiary");

    function setUp() public {
        vm.prank(owner);
        fund = new RehabFundDistributor(owner);

        token = new MockERC20("Mock Token", "MTK");
        token.mint(donor, 1000 ether);
    }

    function test_Donate_Success() public {
        vm.prank(donor);
        token.approve(address(fund), 100 ether);

        vm.prank(donor);
        fund.donate(address(token), 100 ether);

        assertEq(token.balanceOf(address(fund)), 100 ether);
        assertEq(fund.lockedBalance(address(token)), 100 ether);
    }

    function test_Release_OnlyOwner() public {
        // Setup donation
        vm.prank(donor);
        token.approve(address(fund), 100 ether);
        vm.prank(donor);
        fund.donate(address(token), 100 ether);

        vm.prank(owner);
        fund.release(address(token), beneficiary, 40 ether);

        assertEq(token.balanceOf(beneficiary), 40 ether);
        assertEq(fund.lockedBalance(address(token)), 60 ether);
    }

    function test_Release_RevertsIfNotOwner() public {
        vm.expectRevert();
        vm.prank(donor);
        fund.release(address(token), beneficiary, 10 ether);
    }

    function test_Donate_RevertsOnZeroAmount() public {
        vm.prank(donor);
        vm.expectRevert("Amount must be > 0");
        fund.donate(address(token), 0);
    }

    function test_Donate_RevertsOnZeroAddress() public {
        vm.prank(donor);
        vm.expectRevert("Invalid token");
        fund.donate(address(0), 100 ether);
    }

    function test_CannotReleaseZeroAmountOrZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert("Amount must be > 0");
        fund.release(address(token), beneficiary, 0);

        vm.prank(owner);
        vm.expectRevert("Invalid recipient");
        fund.release(address(token), address(0), 10 ether);
    }

    function test_Release_InsufficientBalance() public {
        vm.prank(owner);
        vm.expectRevert("Insufficient locked balance");
        fund.release(address(token), beneficiary, 10 ether);
    }

    function test_EmergencyWithdraw() public {
        // Setup donation
        vm.prank(donor);
        token.approve(address(fund), 100 ether);
        vm.prank(donor);
        fund.donate(address(token), 100 ether);

        vm.prank(owner);
        fund.emergencyWithdraw(address(token));

        assertEq(token.balanceOf(owner), 100 ether);
        assertEq(fund.lockedBalance(address(token)), 0);
    }

    function test_EmergencyWithdraw_RevertsIfNotOwner() public {
        vm.expectRevert();
        vm.prank(donor);
        fund.emergencyWithdraw(address(token));
    }

    function test_MultipleDonations() public {
        vm.prank(donor);
        token.approve(address(fund), 200 ether);

        vm.prank(donor);
        fund.donate(address(token), 100 ether);
        vm.prank(donor);
        fund.donate(address(token), 50 ether);

        assertEq(fund.lockedBalance(address(token)), 150 ether);
        assertEq(token.balanceOf(address(fund)), 150 ether);
    }
}
