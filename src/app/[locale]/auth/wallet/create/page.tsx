'use client'

import Checkbox from "@/components/inputs/CheckBox";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Safety() {
    const router = useRouter();
    const { t } = useTranslation();

    const [agree1, setAgree1] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [agree3, setAgree3] = useState(false)

    const agree = agree1 && agree2 && agree3;

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;

            const handleClick = () => {
                router.push('/auth/wallet/create/mnemonics');
            };

            tg.BackButton.isVisible = true;

            tg.MainButton.text = t('proceed');
            tg.MainButton.show();

            tg.MainButton.onClick(handleClick);

            if (agree) {
                tg.MainButton.enable();
                tg.MainButton.color = '#007aff';
            } else {
                tg.MainButton.disable();
                tg.MainButton.color = '#424b56';
            }

            return () => {
                tg.MainButton.hide();
            };
        }
    }, [agree, router, t]);

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pt-[10px]">
        <Image src='/gifs/detectiveDuck.gif' alt="" width={170} height={170} className="mb-[25px]" />
        <h1 className="mb-4 text-[32px] font-medium tracking-wider">{t('safety')}</h1>
        <div className="w-full flex flex-col gap-4 text-white leading-5 text-opacity-90">
            <div className="flex items-start gap-4" onClick={() => setAgree1(!agree1)}>
                <Checkbox value={agree1} className="mt-1 pointer-events-none" />
                <span>{t('safe1')}</span>
            </div>
            <div className="flex items-start gap-4" onClick={() => setAgree2(!agree2)}>
                <Checkbox value={agree2} className="mt-1 pointer-events-none" />
                <span>{t('safe2')}</span>
            </div>
            <div className="flex items-start gap-4" onClick={() => setAgree3(!agree3)}>
                <Checkbox value={agree3} className="mt-1 pointer-events-none" />
                <span>{t('safe3')}</span>
            </div>
        </div>
    </main>
  );
}
