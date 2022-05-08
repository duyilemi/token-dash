//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract RunnerCollection is ERC1155 {
    string public name;
    string public symbol;
    uint public tokenCount;
    string public baseUri;

    constructor(string memory _name, string memory _symbol, string memory _baseUri) ERC1155(_baseUri) {
        name = _name;
        symbol = _symbol;
        baseUri = _baseUri;
    }

    function mint(uint _amount) public {
        tokenCount++;
        _mint(msg.sender, tokenCount, _amount, "");
    }

    function uri(uint _tokenId) override public view returns(string memory) {
        return string(
            abi.encodePacked(baseUri, Strings.toString(_tokenId), ".json")
        );
    }
}