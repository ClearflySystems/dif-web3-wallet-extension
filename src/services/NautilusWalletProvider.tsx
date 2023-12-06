import React, {useEffect, useState, useContext, createContext} from 'react';
import { ethers, Wallet } from 'ethers';
import {useEffectOnce} from "usehooks-ts";
import {useVeramo} from "@veramo-community/veramo-react";
import {agent} from "../services/VeramoAgent";

type Props = {
  children?: React.ReactNode
};

const NautilusWalletProvider: React.FC<Props> = ({ children }) => {

  //const agents = useVeramo();

  /**
   * Get/Set wallet unlocked
   */
  const [walletLocked, setWalletLocked] = useState<number>(1);
  /**
   * Get/Set current wallets list
   */
  const [ethWallets, setEthWallets] = useState<Wallet[]>([]);

  /**
   * Get/Set current account wallet index
   */
  const [curWalletIndex, setCurWalletIndex] = useState<number>(0);

  /**
   * State store of current balance
   */
  const [ethBalance, setEthBalance] = useState<string>('0');

  /**
   * State store of current balance
   */
  const [lastMessage, setLastMessage] = useState<string>('');

  /**
   * Return current Wallet
   */
  const getCurrentWallet = () => {
    return ethWallets[curWalletIndex];
  }

  /**
   * Refresh current Wallet Balance
   */
  const refreshWalletBalance = async (wallet:Wallet) => {
    if (wallet && wallet.provider) {
      // Get the ETH balance of the connected account
      // TODO - add caching
      const balance = await wallet.provider.getBalance(wallet.address);
      setEthBalance(ethers.formatEther(balance));
    }
  }

  /**
   * Setup our provider and build list of wallets
   * TODO - allow these to be user definable instead of env vars explore using Veramo KeyManager
   */
  useEffectOnce(() => {
    console.log( agent );
    async function setupEthProvider() {
      const provider = await new ethers.AlchemyProvider(
        'goerli',
        import.meta.env.VITE_APP_ALCHEMY_API_KEY
      );
      let wallets: Wallet[] = [];
      wallets.push(
        new ethers.Wallet(import.meta.env.VITE_APP_ETHEREUM_PRIVATE_KEY_1 || '', provider),
        new ethers.Wallet(import.meta.env.VITE_APP_ETHEREUM_PRIVATE_KEY_2 || '', provider)
      );
      setEthWallets(wallets);
    }
    setupEthProvider();
  });

  /**
   * When changing current wallet index refresh balance
   */
  useEffect(() => {
    //console.log(agent);
    async function callRefreshWalletBalance() {
      await refreshWalletBalance(getCurrentWallet());
    }
    if(ethWallets.length) {
      callRefreshWalletBalance();
    }
  }, [curWalletIndex, ethWallets.length]);

  return (
    <NautilusWalletProviderContext.Provider value={{
      walletLocked,
      setWalletLocked,
      getCurrentWallet,
      ethBalance,
      curWalletIndex,
      setCurWalletIndex,
      lastMessage,
      setLastMessage
    }} >
      {children}
    </NautilusWalletProviderContext.Provider>
  );
};

export const useNautilusWalletProvider = () => {
  const context = useContext(NautilusWalletProviderContext);
  if (context === undefined) {
    throw new Error('useNautilusWalletProvider must be used within a NautilusWalletProvider');
  }
  return context;
};

export default NautilusWalletProvider;

export const NautilusWalletProviderContext = createContext<any>(null);
