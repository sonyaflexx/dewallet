import { useState, useEffect } from 'react';
import axios from 'axios';
import WalletStore from '@/store/WalletStore';
import { mnemonicNew, mnemonicToWalletKey } from '@ton/crypto';
import { WalletContractV3R1, WalletContractV3R2, WalletContractV4 } from '@ton/ton';
import settingsStore from '@/store/SettingsStore';

export const useCreateWallet = () => {
  const [wallet, setWallet] = useState<any>(null);

  const generateWallet = async () => {
      try {
        const mnemonicArrayResult = await mnemonicNew(24);
        const keyPairResult = await mnemonicToWalletKey(mnemonicArrayResult);
        let wallet = null;

        if (settingsStore.version === 'Wallet V3R1') {
          wallet = WalletContractV3R1.create({ publicKey: keyPairResult.publicKey, workchain: 0 });
        } else if (settingsStore.version === 'Wallet V3R2') {
          wallet = WalletContractV3R2.create({ publicKey: keyPairResult.publicKey, workchain: 0 });
        } else {
          wallet = WalletContractV4.create({ publicKey: keyPairResult.publicKey, workchain: 0 });
        }
        
        const newWallet = {
          mnemonic: {
            phrase: mnemonicArrayResult.join(' ')
          },
          address: wallet.address.toString(),
          privateKey: Array.prototype.map.call(keyPairResult.secretKey, x => ('00' + x.toString(16)).slice(-2)).join('')
        };
        console.log(newWallet)
        setWallet(newWallet);
      } catch (error) {
        console.error('Failed to generate wallet:', error);
      }
    };

  const createWallet = async () => {
    console.log(wallet)
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
