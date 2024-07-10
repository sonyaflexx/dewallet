'use client';

import PinInput from "@/components/PinInput";
import PinStore from "@/store/PinStore";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import WalletStore from "@/store/WalletStore";
import { useTranslation } from "react-i18next";

const Recovery = observer(() => {
  const { t } = useTranslation();
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [mnemonics, setMnemonics] = useState([]);

  const handlePin = async () => {
    if (pin === PinStore.pin) {
      setStatus('success');
      setTimeout(() => {
        setIsLogin(true);
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

  useEffect(() => {
    if (WalletStore.wallet?.mnemonic && WalletStore.wallet.mnemonic.phrase.trim() !== '') {
        const mnemonicArray = WalletStore.wallet.mnemonic.phrase.split(' ');
        setMnemonics(mnemonicArray as any);
    }
}, [WalletStore.wallet?.mnemonic]);

  const handleCopy = () => {
    WalletStore.wallet?.mnemonic && navigator.clipboard.writeText(WalletStore.wallet?.mnemonic?.phrase);
}

  return (
    <main className={`flex min-h-screen flex-col items-center px-4 ${isLogin ? 'py-5' : ' pt-3 pb-6'}`}>
      {isLogin ? (
        <>
          <div className="bg-[#ff3b30] text-center text-white py-[34px] px-6 mb-3 rounded-xl leading-5">
            {t('yourRecovery')}
          </div>
          <div className="rounded-[20px] w-full bg-secondary-bg backdrop-blur-2xl p-4 flex flex-col gap-4">
            <ul className="flex flex-wrap gap-2">
              {mnemonics.map((mnemonic: string, index: number) => (
                <li key={index} className="flex py-2 px-3 items-center justify-center rounded-[28px] bg-tertiary-bg bg-opacity-60 backdrop-blur-[28px] text-center text-[13px] font-medium">
                  {index + 1}. {mnemonic}
                </li>
              ))}
            </ul>
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

export default Recovery;