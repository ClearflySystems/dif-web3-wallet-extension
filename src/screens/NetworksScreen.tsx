import React from 'react';
import {useNautilusWalletProvider} from "../services/NautilusWalletProvider";

const NetworksScreen = () => {
  /**
   * Reference Wallet Context vars
   */
  const {
    walletLocked
  } = useNautilusWalletProvider();

  return (
    <>
      <h1>Your Networks</h1>
      {!walletLocked &&
        <>
          <div className="nautilus-networks-page">
            Networks List
          </div>
        </>
      }
    </>
  )
}

export default NetworksScreen;