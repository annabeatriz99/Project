import React, { useContext } from 'react';
import { WalletContext } from '../context/WalletContext';

const Navbar = () => {
  const { account, connectWallet } = useContext(WalletContext);

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <h2 style={{ display: 'inline-block', marginRight: '1rem' }}>Meu DApp</h2>
      <button onClick={connectWallet}>
        {account ? `Conectado: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Conectar Wallet'}
      </button>
    </nav>
  );
};

export default Navbar;
