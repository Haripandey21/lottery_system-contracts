// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DataStructure {
    uint256 openTime;
    uint256 closeTime;
    uint256 lotteryPrice;
    uint256 currentTime;
    bool isLotteryOpen;
    uint256 public currentPool;
    uint256 public withDrawableAmount;

    address public manager;
    address[] public participants;

    mapping(address => uint256) public addressBalances;
    mapping(address => bool) public accountexists;
}
