import { HDNodeWallet } from 'ethers';
import { makeAutoObservable, autorun } from 'mobx';

class WalletStore {
  wallet: HDNodeWallet | null = null;

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== 'undefined') {
      this.loadFromLocalStorage();

      autorun(() => {
        this.saveToLocalStorage();
      });
    }
  }

  setWallet = (wallet: any) => {
    this.wallet = wallet;
  };

  deleteWallet = () => {
    this.wallet = null;
  };

  saveToLocalStorage() {
    localStorage.setItem('wallet', JSON.stringify(this.wallet));
  }

  loadFromLocalStorage() {
    const wallet = localStorage.getItem('wallet');

    if (wallet) {
      this.wallet = JSON.parse(wallet);
    }
  }
}

export default new WalletStore();
