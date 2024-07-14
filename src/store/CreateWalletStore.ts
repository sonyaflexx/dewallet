'use client'

import axios from 'axios';
import WalletStore from './WalletStore';
import { observable, action, makeAutoObservable } from 'mobx';
import { mnemonicNew, mnemonicToWalletKey } from '@ton/crypto';
import { WalletContractV4 } from '@ton/ton';

class CreateWalletStore {
  temporaryWallet : any = null;

  constructor() {
    makeAutoObservable(this);
  }

  generateWallet = async () => {
    try {
      const mnemonicArrayResult = await mnemonicNew(24);
      const keyPairResult = await mnemonicToWalletKey(mnemonicArrayResult);
      const wallet = WalletContractV4.create({ publicKey: keyPairResult.publicKey, workchain: 0 });

      this.temporaryWallet = {
        mnemonic: {
          phrase: mnemonicArrayResult.join(' ')
        },
        address: wallet.address.toString(),
        privateKey: Array.prototype.map.call(keyPairResult.secretKey, x => ('00' + x.toString(16)).slice(-2)).join('')
      };
      console.log(this.temporaryWallet, 22222);
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