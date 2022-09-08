// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract lotteryData {
    // variable
    uint256 openTime;
    uint256 closeTime;
    uint256 lotteryPrice;
    uint256 currentTime;
    bool isLotteryOpen;
    uint256 public currentPool;
    uint public withDrawableAmount;

    address public manager;
    address public winner;
    address[] public participants;

    mapping(address => uint256) public addressBalances;
    mapping(address => bool) public accountexists;

    /*----------------------------events----------------------------------------------- */

    event lotteryOpened(
        uint256 openTime,
        uint256 closeTime,
        uint256 lotteryPrice
    );

    event lotteryApplied(uint256 appliedTime);

    event amountTransfered(uint256 winnerAmount, uint256 managerAmount);
    event withDrawal(address _to,uint withDrawAmount);

    /*-----------------constructor---------------------------------------------------- */
    constructor() {
        manager = msg.sender;
    }

    /*-------------------------modifiers----------------------------------------------- */
    modifier onlyManager() {
        require(
            msg.sender == manager,
            "only Manager can call this function..."
        );
        _;
    }

    modifier accountAlreadyExist(address _addr) {
        require(
            accountexists[_addr] != true,
            "This account already participated in lottery..."
        );
        _;
    }
}
