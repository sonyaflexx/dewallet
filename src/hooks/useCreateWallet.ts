import { useState, useEffect } from 'react';
import axios from 'axios';
import WalletStore from '@/store/WalletStore';
import { mnemonicNew, mnemonicToWalletKey } from '@ton/crypto';

export const useCreateWallet = () => {
  const [wallet, setWallet] = useState<any>(null);

  const generateWallet = async () => {
      try {
        const mnemonicArrayResult = await mnemonicNew(24);
        const keyPairResult = await mnemonicToWalletKey(mnemonicArrayResult);

        const newWallet = {
          mnemonic: {
            phrase: mnemonicArrayResult.join(' ')
          },
          address: Array.prototype.map.call(keyPairResult.publicKey, x => ('00' + x.toString(16)).slice(-2)).join(''),
          privateKey: Array.prototype.map.call(keyPairResult.secretKey, x => ('00' + x.toString(16)).slice(-2)).join('')
        };

        setWallet(newWallet);
      } catch (error) {
        console.error('Failed to generate wallet:', error);
      }
    };

  const createWallet = async () => {
    if (wallet) {
      WalletStore.setWallet(wallet);
      
      try {
        await axios.post('/api/wallet/create', wallet);
      } catch (error) {
        console.error('Failed to save wallet to the database:', error);
      }
    }
  };

  return { generateWallet, createWallet, wallet };
};
