import { makeAutoObservable } from "mobx";
import axios from "axios";

class TokenStore {
  tokens: any = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchTokens();
  }

  async fetchTokens() {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
        params: {
          ids: "the-open-network,defi-coin,arbuz,king,bitcoin-private",
          vs_currencies: "usd",
          include_24hr_change: "true"
        }
      });

      const tokenData = response.data;
      this.tokens = [
        {
          id: 1,
          logoUrl: 'https://v2.delabwallet.com/0068d136b4f5ffc93f0073cf3ef223fd.png',
          name: 'TON',
          price: tokenData['the-open-network'].usd || 7.16,
          change_24h: tokenData['the-open-network'].usd_24h_change ? tokenData['the-open-network'].usd_24h_change.toFixed(2) : 0.43,
          amount: 0,
        },
        {
          id: 2,
          logoUrl: 'https://v2.delabwallet.com/d4dc5bc9cbc0d70f98be41d9f234cc67.png',
          name: 'DFC',
          price: tokenData["defi-coin"].usd || 0.97,
          change_24h: tokenData["defi-coin"].usd_24h_change ? tokenData["defi-coin"].usd_24h_change.toFixed(2) : 9.25,
          amount: 0,
        },
        {
          id: 3,
          logoUrl: 'https://v2.delabwallet.com/cea435ee35ddd568d2bb56ae5f266276.png',
          name: 'ARBUZ',
          price: tokenData.arbuz.usd || 0.33,
          change_24h: tokenData.arbuz.usd_24h_change ? tokenData.arbuz.usd_24h_change.toFixed(2) : -21.89,
          amount: 0,
        },
        {
          id: 4,
          logoUrl: 'https://v2.delabwallet.com/111c157feb06ba4d0020760c01e89756.png',
          name: 'KINGY',
          price: tokenData.king.usd || 0.21,
          change_24h: tokenData.king.usd_24h_change ? tokenData.king.usd_24h_change.toFixed(2) : 1.59,
          amount: 0,
        },
        {
          id: 5,
          logoUrl: 'https://v2.delabwallet.com/a99afedca980663059d5e21ce99cfbf3.png',
          name: 'PRIVATE',
          price: tokenData['bitcoin-private'].usd || 0.005,
          change_24h: tokenData['bitcoin-private'].usd_24h_change ? tokenData['bitcoin-private'].usd_24h_change.toFixed(2) : -1.88,
          amount: 0,
        },
      ];
    } catch (error) {
      console.error("Error fetching token data: ", error);
      this.tokens = [
        {
          id: 1,
          logoUrl: 'https://v2.delabwallet.com/0068d136b4f5ffc93f0073cf3ef223fd.png',
          name: 'TON',
          price: 4.34,
          change_24h: 0.43,
          amount: 0,
        },
        {
          id: 2,
          logoUrl: 'https://v2.delabwallet.com/d4dc5bc9cbc0d70f98be41d9f234cc67.png',
          name: 'DFC',
          price: 0.97,
          change_24h: 9.25,
          amount: 0,
        },
        {
          id: 3,
          logoUrl: 'https://v2.delabwallet.com/cea435ee35ddd568d2bb56ae5f266276.png',
          name: 'ARBUZ',
          price: 0.33,
          change_24h: -21.89,
          amount: 0,
        },
        {
          id: 4,
          logoUrl: 'https://v2.delabwallet.com/111c157feb06ba4d0020760c01e89756.png',
          name: 'KINGY',
          price: 0.21,
          change_24h: 1.59,
          amount: 0,
        },
        {
          id: 5,
          logoUrl: 'https://v2.delabwallet.com/a99afedca980663059d5e21ce99cfbf3.png',
          name: 'PRIVATE',
          price: 0.005,
          change_24h: -1.88,
          amount: 0,
        },
      ];
    }
  }
}

const tokenStore = new TokenStore();
export default tokenStore;
