import axios from 'axios';
import WalletStore from './WalletStore';
import { observable, action } from 'mobx';
import { mnemonicNew, mnemonicToWalletKey } from '@ton/crypto';

class CreateWalletStore {
  @observable temporaryWallet : any = null;

  @action async generateWallet() {
    try {
      const mnemonicArrayResult = await mnemonicNew(24);
      const keyPairResult = await mnemonicToWalletKey(mnemonicArrayResult);

      this.temporaryWallet = {
        mnemonic: {
          phrase: mnemonicArrayResult.join(' ')
        },
        address: Array.prototype.map.call(keyPairResult.publicKey, x => ('00' + x.toString(16)).slice(-2)).join(''),
        privateKey: Array.prototype.map.call(keyPairResult.secretKey, x => ('00' + x.toString(16)).slice(-2)).join('')
      };
      console.log(this.temporaryWallet);
    } catch (error) {
      console.error('Failed to generate wallet:', error);
      this.temporaryWallet = null;
    }
  }

  @action async createWallet() {
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