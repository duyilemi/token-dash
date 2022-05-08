//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GameToken is ERC20 {
    constructor() ERC20("GameToken", "GT"){
        _mint(msg.sender, 300 * 10 ** 18);
    }

    function mintToken(address _account, uint _amount) public {
        _mint(_account, _amount);
    }
}
