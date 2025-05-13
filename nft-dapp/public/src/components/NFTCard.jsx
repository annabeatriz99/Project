import { useState } from "react";
import { ethers } from "ethers";
import { NFT_ADDRESS, TOKEN_ADDRESS, NFT_ABI, ERC20_ABI } from "../utils/config";

export default function NFTCard({ signer }) {
  const [loading, setLoading] = useState(false);

  const buyWithETH = async () => {
    setLoading(true);
    try {
      const contract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
      const tx = await contract.buyWithETH({ value: ethers.utils.parseEther("0.01") });
      await tx.wait();
      alert("NFT comprado com ETH!");
    } catch (err) {
      console.error(err);
      alert("Falha na compra com ETH");
    }
    setLoading(false);
  };

  const buyWithToken = async () => {
    setLoading(true);
    try {
      const token = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);
      const amount = ethers.utils.parseUnits("5", 18); // 5 MPT

      const approvalTx = await token.approve(NFT_ADDRESS, amount);
      await approvalTx.wait();

      const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, signer);
      const tx = await nftContract.buyWithToken();
      await tx.wait();

      alert("NFT comprado com MPT!");
    } catch (err) {
      console.error(err);
      alert("Falha na compra com Token");
    }
    setLoading(false);
  };

  return (
    <div className="border p-4 rounded-xl shadow-md w-80">
      <img src="https://ipfs.io/ipfs/<CID>/nft.jpg" alt="NFT" className="rounded-xl" />
      <h2 className="text-xl font-bold mt-2">NFT Composto</h2>
      <p>0.01 ETH ou 5 MPT (com desconto)</p>
      <div className="flex gap-2 mt-2">
        <button onClick={buyWithETH} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
          Comprar com ETH
        </button>
        <button onClick={buyWithToken} disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded">
          Comprar com MPT
        </button>
      </div>
    </div>
  );
}

