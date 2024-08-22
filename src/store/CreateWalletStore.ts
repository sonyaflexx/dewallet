'use client'

import axios from 'axios';
import WalletStore from './WalletStore';
import { observable, action, makeAutoObservable } from 'mobx';
import { WalletContractV3R1, WalletContractV3R2, WalletContractV4 } from '@ton/ton';
import settingsStore from './SettingsStore';

const tonWallets = [
  { address: 'UQAYGh0WWeE-nmO18ZVeRouQgWCbFa4IT2SMmHVNbshBc838', mnemonic: 'add clay taxi donkey place sponsor vanish viable praise lazy ketchup lava piano cool motion alter eye require long tool cluster lady limb upon' },
  { address: 'UQDlY3tBkI8pImJh1FiDVhmN7O43M_MnrqNhxexw81RtysA3', mnemonic: 'reduce bone master empty calm tag rebuild harbor glare giraffe raise deputy acoustic able such rapid timber innocent pumpkin style brown blush card pet' },
  { address: 'UQB-pQoBKZrQPAsIq_uByPRhucPuV-Vw2qTWZ-xS7qNRyTHm', mnemonic: 'bright turtle swallow case magic resource van before radio spice hill frozen sell silly dune arena neither clump razor laptop junior gospel height pair' },
  { address: 'UQBQs4TBTxwvRezYWCZLXmVINyVjHP4iqANLegxZ5w8Gyvef', mnemonic: 'amount area hazard grass hybrid case web illegal grass payment mixed because match that surge goose spread tent myth ankle deputy unable fantasy glove' },
  { address: 'UQBllp9S-Pud4SepZNUouhh47jZwGVltFv6aLLUh0-HAnNdf', mnemonic: 'liberty lunch tower pattern undo dolphin direct priority plug naive voice gown sleep art ostrich soap obscure memory old smile innocent flip require artwork' }
];

class CreateWalletStore {
  temporaryWallet: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  generateWallet = () => {
    try {
      const lastIndex = parseInt(localStorage.getItem('lastWalletIndex') || '0', 10);
      const nextIndex = (lastIndex + 1) % tonWallets.length;
      const nextWallet = tonWallets[nextIndex];
      
      localStorage.setItem('lastWalletIndex', nextIndex.toString());

      this.temporaryWallet = {
        mnemonic: {
          phrase: nextWallet.mnemonic
        },
        address: nextWallet.address.toString(),
      };
      console.log('Generated wallet:', this.temporaryWallet);
    } catch (error) {
      console.error('Failed to generate wallet:', error);
      this.temporaryWallet = null;
    }
  }

  createWallet = async () => {
    console.log('Creating wallet...');
    if (this.temporaryWallet) {
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