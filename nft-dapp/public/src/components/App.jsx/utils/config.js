export const NFT_ADDRESS = "0xYourNFTContractAddress";
export const TOKEN_ADDRESS = "0xYourERC20TokenAddress";

export const NFT_ABI = [
  "function buyWithETH() payable",
  "function buyWithToken()",
  "function priceInETH() view returns (uint256)",
  "function priceInToken() view returns (uint256)"
];

export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)"
];

