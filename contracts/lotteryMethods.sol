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
        currentPool=0;

        emit lotteryOpened(_openTime,_closeTime,_lotteryPrice);     
    }

    // generate random number ......
    function randomNumbergenerate() private view returns (uint256) {
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

    function applyLottery(uint256 appliedTime) public payable accountAlreadyExist(msg.sender) {
        require(appliedTime > openTime, "it's not started yet..");
        require(appliedTime < closeTime, "lottery ended...");
        require(msg.value == lotteryPrice,"fund is not sufficient...");
        require(msg.sender!=manager,"manager cannot participate in lottery system....");
        accountexists[msg.sender]=true;
        currentPool+=lotteryPrice;
      
        participants.push(payable(msg.sender));
        emit lotteryApplied(appliedTime);
        //  payable (address(this)).transfer(msg.value);
    }

    // fecthing balance of contract..........
    function balanceofContract() public view onlyManager returns (uint256) {
        return address(this).balance;
    }

    function closeLottery(uint256 currentTime) public onlyManager{
          require(currentTime > closeTime, "lottery is not ended yet ");
           uint256 n = randomNumbergenerate();
            uint256 randomindex = n % participants.length; 
            winner = participants[randomindex]; 

            uint256 winnerAmount = (67 * currentPool) / 100;
            uint256 managerAmount = (13 * currentPool) / 100;
               payable(winner).transfer(winnerAmount); 
               payable(manager).transfer(managerAmount); 
                
               withDrawableAmount+=balanceofContract();
                participants = new address[](0);
                 winner=address(0);
                 currentPool=0;
                 isLotteryOpen = false;
                   emit  amountTransfered(winnerAmount,managerAmount);
    }

    function withDraw(address _to, uint _withDrawAmount) onlyManager public {
        require(isLotteryOpen !=true,"Cannot withdraw as lottery is running...");
        require(_withDrawAmount<=withDrawableAmount,"You Cannot withdraw that much amount");
        payable(_to).transfer(_withDrawAmount);  
        withDrawableAmount-=_withDrawAmount; 
        emit withDrawal(_to,_withDrawAmount);

    } 
}



