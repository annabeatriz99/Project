import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// dados nao reais
const CONTRACT_ADDRESS = "0xSEU_CONTRATO_AQUI";
const CONTRACT_ABI = [ 
  //abi real
  "function buyNFT(uint256 tokenId) public payable"
];

const nfts = [
  { id: 1, name: "NFT Exemplo 1", image: "https://via.placeholder.com/300x300?text=NFT+1", price: ethers.utils.parseEther("0.05") },
  { id: 2, name: "NFT Exemplo 2", image: "https://via.placeholder.com/300x300?text=NFT+2", price: ethers.utils.parseEther("0.07") },
];

export default function NFTGallery() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const prov = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(prov);
      setSigner(prov.getSigner());
    }
  }, []);

  useEffect(() => {
    if (signer) {
      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(nftContract);
    }
  }, [signer]);

  const handleBuy = async (nft) => {
    if (!contract) {
      alert("Conecte sua carteira primeiro!");
      return;
    }

    try {
      const tx = await contract.buyNFT(nft.id, { value: nft.price });
      console.log("Transação enviada:", tx.hash);
      await tx.wait();
      alert(`NFT ${nft.name} comprado com sucesso!`);
    } catch (err) {
      console.error("Erro na compra:", err);
      alert("Falha ao comprar NFT.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {nfts.map((nft) => (
        <Card key={nft.id} className="rounded-2xl shadow-lg">
          <CardContent className="p-4 flex flex-col items-center">
            <img src={nft.image} alt={nft.name} className="w-full rounded-xl mb-4" />
            <h2 className="text-xl font-semibold mb-2">{nft.name}</h2>
            <p className="text-base text-gray-500 mb-4">{ethers.utils.formatEther(nft.price)} ETH</p>
            <Button onClick={() => handleBuy(nft)}>Comprar</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
