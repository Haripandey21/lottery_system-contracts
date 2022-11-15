// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

 contract Events {
    event lotteryOpened(
        uint256 openTime,
        uint256 closeTime,
        uint256 lotteryPrice
    );

    event lotteryApplied(uint256 appliedTime,address participants);
    event amountTransfered(address winner, uint256 winnerAmount, uint256 managerAmount);
    event withDrawal(address _to, uint256 withDrawAmount);
}
