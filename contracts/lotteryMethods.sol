// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9; 

import "./lotteryData.sol";

contract lotteryMethods is lotteryData {


// opening lottery by Manager .......
function openLottery (uint _openTime, uint _closeTime,uint _lotteryPrice) onlyManager public {  
    openTime=_openTime;
    closeTime=_closeTime;
    lotteryPrice=_lotteryPrice;
    isLotteryOpen=true;

}

// generate random number ......
function randomNumbergenerate() public view returns(uint)
{
    return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,participants.length)));
}

// Contract collecting the transfered amount......
receive() external payable {}


function applyLottery(uint appliedTime) payable public { 
   require(appliedTime>openTime,"it's not started yet..");
   require(appliedTime<closeTime,"lottery ended");
 //  require(msg.sender!=manager,"manager cannot apply...");
    require(msg.value==lotteryPrice);   
      participants.push(payable(msg.sender));   
      //  payable (address(this)).transfer(msg.value);
 
}

// fecthing balance of contract..........
function balanceofContract()  public view returns(uint) {
    return address(this).balance; 

}


// announcing winner only  by owner ......
function getWinner() public onlyManager {

uint n=randomNumbergenerate();
address winner;
uint randomindex = n % participants.length;
winner=participants[randomindex];

uint256 c= balanceofContract();
//uint256 amt=10^18 * c; 
uint256 winnerAmount=(67*c)/100;
 uint managerAmount=(13*c)/100;
payable(winner).transfer(winnerAmount);

payable(manager).transfer(managerAmount);

}

}