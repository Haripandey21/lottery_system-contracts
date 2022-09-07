// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./lotteryData.sol";

contract lotteryMethods is lotteryData {
    // opening lottery by Manager .......
    function openLottery(
        uint256 _openTime,
        uint256 _closeTime,
        uint256 _lotteryPrice
    ) public onlyManager {
        openTime = _openTime;
        closeTime = _closeTime;
        lotteryPrice = _lotteryPrice;
        isLotteryOpen = true;
    }

    // generate random number ......
    function randomNumbergenerate() public view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        participants.length
                    )
                )
            );
    }

    // Contract collecting the transfered amount......
    receive() external payable {}

    function applyLottery(uint256 appliedTime) public payable {
        require(appliedTime > openTime, "it's not started yet..");
        require(appliedTime < closeTime, "lottery ended");
       //  require(msg.sender!=manager,"manager cannot apply...");
        require(msg.value == lotteryPrice);
        participants.push(payable(msg.sender));
        //  payable (address(this)).transfer(msg.value);
    }

    // fecthing balance of contract..........
    function balanceofContract() onlyManager public view returns (uint256) {
        return address(this).balance;
    }

    // announcing winner only  by owner ......
    function getWinner() public onlyManager returns(address){
        uint256 n = randomNumbergenerate();
        address winner;
        uint256 randomindex = n % participants.length;
        winner = participants[randomindex];
        uint256 c = balanceofContract();
        //uint256 amt=10^18 * c;
        uint256 winnerAmount = (67 * c) / 100;
        uint256 managerAmount = (13 * c) / 100;
        payable(winner).transfer(winnerAmount);
        payable(manager).transfer(managerAmount);
        return participants[randomindex];
        
    }

    function closeLottery() public onlyManager()
    {

        require(currentTime>closeTime,"lottery is not ended yet ");
        
        participants=new address payable[](0); 

    }


}

