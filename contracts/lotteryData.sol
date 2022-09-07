// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract lotteryData {
    // variable
    uint256 openTime;
    uint256 closeTime;
    uint256 lotteryPrice;
    bool isLotteryOpen;

    address public manager;
    address payable[] public participants;
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

    // modifier onlyParticipants(){
    //     require();
    //     _;

    // }
}
