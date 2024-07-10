'use client';

import PinInput from "@/components/PinInput";
import { useCreateWallet } from "@/hooks/useCreateWallet";
import PinStore from "@/store/PinStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ethers } from "ethers";
import WalletStore from "@/store/WalletStore";
import { useTranslation } from "react-i18next";

const PrivateKey = observer(() => {
  const { t } = useTranslation();
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [privateKey, setPrivateKey] = useState('');

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
        setIsLogin(true);
        const wallet = WalletStore.wallet;
        if (wallet) {
          setPrivateKey(wallet.privateKey);
        }
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

  const handleCopy = () => {
    navigator.clipboard.writeText(privateKey);
}

  return (
    <main className={`flex min-h-screen flex-col items-center px-4 ${isLogin ? 'py-5' : ' pt-3 pb-6'}`}>
      {isLogin ? (
        <>
          <div className="bg-[#ff3b30] text-center text-white py-[34px] px-6 mb-3 rounded-xl leading-5">
            {t('yourKey')}
          </div>
          <div className="rounded-[20px] w-full bg-secondary-bg bg-opacity-30 backdrop-blur-2xl p-4 flex flex-col gap-4">
            <p className="text-base break-all leading-5 text-placeholder-primary max-w-full">{privateKey}</p>
            <div className="h-px w-full bg-tertiary-bg" />
            <button onClick={handleCopy} className="flex items-center px-4 py-[5px] text-sm leading-[18px] gap-[10px] text-placeholder-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13.0303 13.0302H16.6667V3.33325H6.96969V6.96962M3.33333 6.96962H13.0303V16.6666H3.33333V6.96962Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                {t('copy')}
            </button>
          </div>
        </>
      ) : (
        <PinInput
          title={t('enterPin')}
          value={pin}
          setValue={setPin}
          handle={handlePin}
          status={status}
        />
      )}
    </main>
  );
});

export default PrivateKey;