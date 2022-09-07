// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9; 

contract lotteryData {

// variable 
uint openTime;
uint closeTime;
uint lotteryPrice;
bool isLotteryOpen;

address public manager;
address payable[] public participants;
mapping(address=>uint) public addressBalances;

/*-----------------constructor---------------------------------------------------- */
constructor(){
    manager=msg.sender;
}

/*-------------------------modifiers----------------------------------------------- */
modifier onlyManager(){
require(msg.sender==manager);
_;
}

// modifier onlyParticipants(){
//     require();
//     _;

// }




}