// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract lotteryData {
    // variable
    uint256 openTime;
    uint256 closeTime;
    uint256 lotteryPrice;
    uint256 currentTime;
    bool isLotteryOpen;

    address public manager;
    address[] public participants;
    mapping(address => uint256) public addressBalances;

    /*-----------------constructor---------------------------------------------------- */
    constructor() {
        manager = msg.sender;
    }

    /*-------------------------modifiers----------------------------------------------- */
    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }
}
