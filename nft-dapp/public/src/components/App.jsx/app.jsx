import React, { useState } from 'react';
import { ethers } from 'ethers';

const App = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    alert('Connecting to wallet...');
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAccount(account);
        console.log('Conta conectada:', account);
      } catch (error) {
        console.error('Erro ao conectar com a MetaMask:', error);
      }
    } else {
      alert('MetaMask não encontrada. Por favor, instale a extensão.');
      window.open('https://metamask.io/download.html', '_blank');
    }
  };

  const buyWithEth = async () => {
  if (!window.ethereum) {
    alert('MetaMask não encontrada!');
    return;
  }

  try {
    // Conecta com a carteira do usuário
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contractAddress = '0xSEU_CONTRATO_AQUI';

    const abi = [
      "function mint() public payable",
    
    ];

    const contract = new ethers.Contract(contractAddress, abi, signer);

    const price = ethers.utils.parseEther("0.05");
    
    const tx = await contract.mint({ value: price });

    console.log('Transação enviada. Aguardando confirmação...');
    await tx.wait();

    alert('NFT comprada com sucesso!');
  } catch (error) {
    console.error('Erro ao comprar NFT:', error);
    alert('Erro ao comprar NFT: ' + (error.message || error));
  }
};

  const buyWithToken = () => {
    alert('Buying NFT with Token...');
    // Coloque aqui a lógica para comprar NFT com Token
  };

  return (
    <div>
      <h1>Meu DApp</h1>

      <button className="connect-button" onClick={connectWallet}>
        {account ? `Conectado: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Conectar Wallet'}
      </button>

      <button className="eth-button" onClick={buyWithEth}>
        Comprar NFT com ETH
      </button>

      <button className="token-button" onClick={buyWithToken}>
        Comprar NFT com Token
      </button>
    </div>
  );
};

export default App;
