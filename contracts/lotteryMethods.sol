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
receive() external payable
{
    addressBalances[msg.sender]+=msg.value; 
    participants.push(payable(msg.sender));    
} 

function participate() payable public returns(uint) { 
        payable (address(this)).transfer(lotteryPrice);
        return (lotteryPrice);


}


// fecthing balance of contract..........
function balanceofContract() onlyManager public view returns(uint) {
    return address(this).balance; 

}

function getWinner() public onlyManager view  {

uint n=randomNumbergenerate();
address payable winner;
uint randomindex = n % participants.length;
winner=participants[randomindex];



uint c= balanceofContract();
uint amt=10^18 * c;
uint winnerAmount=0.67 * amt;
// uint managerAmount=0.13 * balanceofContract();

// winner.transfer(winnerAmount);
// manager.transfer(managerAmount);

}












}