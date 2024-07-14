import { action, computed, makeAutoObservable, observable } from "mobx";
import { Token } from "@/types";

export interface TokenSelectModalConfig {
  value?: Token;
  setValue?: (value: Token) => void;
  tokens: Token[];
}

export interface BuyAmountModalConfig {
  value: {
    amount: number;
    cardNumber: string;
    email: string;
  };
  setValue?: (value: { amount: number; cardNumber: string; email: string }) => void;
  token: Token;
}

class ModalStore {
  tokenSelectModalConfig: TokenSelectModalConfig | null = null;
  showTokenSelectModal = false;

  buyAmountModalConfig: BuyAmountModalConfig | null = null;
  showBuyAmountModal = false;

  showReceiveModal = false;

  constructor() {
    makeAutoObservable(this, {
      showTokenSelectModal: observable,
      tokenSelectModalConfig: observable,
      isTokenSelectModalActive: computed,
      openTokenSelectModal: action,
      closeTokenSelectModal: action,

      showBuyAmountModal: observable,
      buyAmountModalConfig: observable,
      isBuyAmountModalActive: computed,
      openBuyAmountModal: action,
      closeBuyAmountModal: action,

      showReceiveModal: observable,
      isReceiveModalActive: computed,
      openReceiveModal: action,
      closeReceiveModal: action,

      updateBuyAmountModalConfig: action,
      updateTokenSelectModalConfig: action,
    });
  }

  get isTokenSelectModalActive() {
    return this.showTokenSelectModal;
  }

  openTokenSelectModal = (config: TokenSelectModalConfig) => {
    this.tokenSelectModalConfig = config;
    this.showTokenSelectModal = true;
  };

  closeTokenSelectModal = () => {
    this.tokenSelectModalConfig = null;
    this.showTokenSelectModal = false;
  };

  get isBuyAmountModalActive() {
    return this.showBuyAmountModal;
  }

  openBuyAmountModal = (config: BuyAmountModalConfig) => {
    this.buyAmountModalConfig = config;
    this.showBuyAmountModal = true;
  };

  closeBuyAmountModal = () => {
    this.buyAmountModalConfig = null;
    this.showBuyAmountModal = false;
  };

  get isReceiveModalActive() {
    return this.showReceiveModal;
  }

  openReceiveModal = () => {
    this.showReceiveModal = true;
  };

  closeReceiveModal = () => {
    this.showReceiveModal = false;
  };

  updateBuyAmountModalConfig = (value: Partial<BuyAmountModalConfig['value']>) => {
    if (this.buyAmountModalConfig) {
      this.buyAmountModalConfig.value = { ...this.buyAmountModalConfig.value, ...value };
    }
  };

  updateTokenSelectModalConfig = (value: Partial<TokenSelectModalConfig>) => {
    if (this.tokenSelectModalConfig) {
      this.tokenSelectModalConfig = { ...this.tokenSelectModalConfig, ...value };
    }
  };
}

const modalStore = new ModalStore();
export default modalStore;