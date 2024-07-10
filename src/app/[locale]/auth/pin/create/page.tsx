'use client';

import PinInput from "@/components/PinInput";
import { useCreateWallet } from "@/hooks/useCreateWallet";
import PinStore from "@/store/PinStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import createWalletStore from "@/store/CreateWalletStore";

const PinCreate = observer(() => {
  const { t } = useTranslation();

  const [pin, setPin] = useState('');
  const [repeatPin, setRepeatPin] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const isConfirming = PinStore.confirmingPin && PinStore.confirmingPin !== '';

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;

        tg.BackButton.isVisible = true;
        tg.BackButton.onClick(() => {
            router.back();
        })

        return () => {
            tg.BackButton.isVisible = false;
        };
    }
}, [router]);

  const handleSetConfirmingPin = () => {
    setStatus('success');
    setTimeout(() => {
      PinStore.setConfirmingPin(pin);
      setStatus('');
    }, 300);
  };

  const handleCreatePin = async () => {
    if (repeatPin === PinStore.confirmingPin) {
      setStatus('success');
      createWalletStore.createWallet();
      PinStore.setPin(repeatPin);
      router.push('/wallet');
    } else {
      setStatus('error');
      setTimeout(() => {
        const delay = 150;
        const intervalId = setInterval(() => {
          setRepeatPin((prevPin) => {
            if (prevPin.length > 0) {
              return prevPin.slice(0, -1);
            } else {
              clearInterval(intervalId);
              setStatus('');
              return prevPin;
            }
          });
        }, delay);
      }, 380);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pt-3 pb-6">
      <PinInput
        title={isConfirming ? t('repeatPin') : t('makePin')}
        value={isConfirming ? repeatPin : pin}
        setValue={isConfirming ? setRepeatPin : setPin}
        handle={isConfirming ? handleCreatePin : handleSetConfirmingPin}
        status={status}
      />
    </main>
  );
});

export default PinCreate;