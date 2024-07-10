import { makeAutoObservable } from 'mobx';
import i18n from '@/i18n';

class SettingsStore {
  language: string = localStorage.getItem('language') || 'en';
  version: string = localStorage.getItem('version') || 'Wallet V4';

  constructor() {
    makeAutoObservable(this);
  }

  setLanguage(language: string) {
    this.language = language;
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
  }

  setVersion(version: string) {
    this.version = version;
    localStorage.setItem('version', version);
    window.location.reload();
  }
}

const settingsStore = new SettingsStore();
export default settingsStore;
