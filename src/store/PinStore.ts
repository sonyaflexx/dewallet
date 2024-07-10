import { makeAutoObservable } from 'mobx';

class PinStore {
    pin = '';
    confirmingPin = '';

    constructor() {
        makeAutoObservable(this);

        const savedPin = localStorage.getItem('pin');
        if (savedPin) {
            this.pin = savedPin;
        }
    }

    setPin(newPin: string) {
        this.pin = newPin;
        localStorage.setItem('pin', newPin);
    }

    setConfirmingPin(newConfirmingPin: string) {
        this.confirmingPin = newConfirmingPin;
    }
}

const pinStore = new PinStore();

export default pinStore;
