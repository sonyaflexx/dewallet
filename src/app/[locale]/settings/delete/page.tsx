'use client';

import PinInput from "@/components/PinInput";
import PinStore from "@/store/PinStore";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import WalletStore from "@/store/WalletStore";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const DeleteAccount = observer(() => {
  const { t } = useTranslation();
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

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

  const handlePin = async () => {
    if (pin === PinStore.pin) {
      setStatus('success');
      setTimeout(() => {
        WalletStore.deleteWallet();
        router.push('/');
      }, 1000);
    } else {
      setStatus('error');
      setTimeout(() => {
        const delay = 150;
        const intervalId = setInterval(() => {
          setPin((prevPin) => {
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
    <main className={`flex min-h-screen flex-col items-center px-4 pt-3 pb-6`}>
        <PinInput
          title={t('enterPin')}
          value={pin}
          setValue={setPin}
          handle={handlePin}
          status={status}
        />
    </main>
  );
});

export default DeleteAccount;