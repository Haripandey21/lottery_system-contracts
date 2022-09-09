// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./DataStructure.sol";

contract Modifiers is DataStructure {
    modifier onlyManager() {
        require(
            msg.sender == manager,
            "only Manager can call this function..."
        );_;
    }

    modifier accountAlreadyExist(address _addr) {
        require(
            accountexists[_addr] != true,
            "This account already participated in lottery..."
        );_;
    }
}
