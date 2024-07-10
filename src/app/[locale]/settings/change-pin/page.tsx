'use client';

import PinInput from "@/components/PinInput";
import PinStore from "@/store/PinStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

const ChangePin = observer(() => {
  const { t } = useTranslation();
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [repeatNewPin, setRepeatNewPin] = useState('');
  const [status, setStatus] = useState('');
  const [stage, setStage] = useState(1);
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

  const handleSetPin = () => {
    setStatus('success');
    setTimeout(() => {
      PinStore.setPin(newPin);
      setStage(3);
      setStatus('');
    }, 1000);
  };

  const handleOldPin = async () => {
    if (oldPin === PinStore.pin) {
      setStatus('success');
      setTimeout(() => {
        setStage(2);
        setStatus('');
      }, 1000);
    } else {
      setStatus('error');
      setTimeout(() => {
        const delay = 150;
        const intervalId = setInterval(() => {
          setOldPin((prevPin) => {
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

  const handleRepeatNewPin = async () => {
    if (repeatNewPin === newPin) {
      setStatus('success');
      setTimeout(() => {
        PinStore.setPin(repeatNewPin);
        router.push('/wallet');
        setStatus('');
      }, 1000);
    } else {
      setStatus('error');
      setTimeout(() => {
        const delay = 150;
        const intervalId = setInterval(() => {
          setRepeatNewPin((prevPin) => {
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
        title={stage === 1 ? t('oldPin') : stage === 2 ? t('newPin') : t('repeatPin')}
        value={stage === 1 ? oldPin : stage === 2 ? newPin : repeatNewPin}
        setValue={stage === 1 ? setOldPin : stage === 2 ? setNewPin : setRepeatNewPin}
        handle={stage === 1 ? handleOldPin : stage === 2 ? handleSetPin : handleRepeatNewPin}
        status={status}
      />
    </main>
  );
});

export default ChangePin;
