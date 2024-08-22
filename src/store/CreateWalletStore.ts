'use client'

import axios from 'axios';
import WalletStore from './WalletStore';
import { observable, action, makeAutoObservable } from 'mobx';
import { mnemonicNew, mnemonicToWalletKey } from '@ton/crypto';
import { WalletContractV3R1, WalletContractV3R2, WalletContractV4 } from '@ton/ton';
import settingsStore from './SettingsStore';

class CreateWalletStore {
  temporaryWallet : any = null;

  constructor() {
    makeAutoObservable(this);
  }

  generateWallet = async () => {
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

      this.temporaryWallet = {
        mnemonic: {
          phrase: mnemonicArrayResult.join(' ')
        },
        address: wallet.address.toString(),
        privateKey: Array.prototype.map.call(keyPairResult.secretKey, x => ('00' + x.toString(16)).slice(-2)).join('')
      };
    } catch (error) {
      console.error('Failed to generate wallet:', error);
      this.temporaryWallet = null;
    }
  }

  createWallet = async () => {
    console.log('Create...');
    if (this.temporaryWallet) {
      console.log('Nice');
      WalletStore.setWallet(this.temporaryWallet);
      try {
        await axios.post('/api/wallet/create', this.temporaryWallet);
        console.log('Wallet successfully saved to the database.');
        this.temporaryWallet = null;
      } catch (error) {
        console.error('Failed to save wallet to the database:', error);
      }
    } else {
      console.error('No wallet generated yet.');
    }
  }
}

const createWalletStore = new CreateWalletStore();

export default createWalletStore;