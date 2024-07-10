'use client'

import Checkbox from "@/components/inputs/CheckBox";
import { useCreateWallet } from "@/hooks/useCreateWallet";
import createWalletStore from "@/store/CreateWalletStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Mnemonics() {
    const { t } = useTranslation();

    const router = useRouter();
    const wallet = createWalletStore.temporaryWallet;
    const [mnemonics, setMnemonics] = useState([]);

    useEffect(() => {
        createWalletStore.generateWallet();
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;

            tg.BackButton.isVisible = true;
            tg.BackButton.onClick(() => {
                router.push('/');
            })
    
            tg.MainButton.text = t('imSaved');
            tg.MainButton.color = '#007aff';
            tg.MainButton.show();
            tg.MainButton.onClick(handleCreateWallet);
    
            return () => {
                tg.MainButton.hide();
                tg.BackButton.isVisible = false;
            };
        }
    }, []);
    
    useEffect(() => {
        if (wallet?.mnemonic && wallet.mnemonic.phrase.trim() !== '') {
            const mnemonicArray = wallet.mnemonic.phrase.split(' ');
            setMnemonics(mnemonicArray as any);
        }
    }, [wallet?.mnemonic]);

    const handleCopy = () => {
        wallet?.mnemonic && navigator.clipboard.writeText(wallet.mnemonic.phrase);
    }

    const handleCreateWallet = () => {
        router.push('/auth/pin/create');
    }

    return (
        <main className="flex min-h-screen flex-col items-center px-4 pt-[10px]">
            <h1 className="mb-6 text-[32px] font-medium tracking-wider">{t('saveWords')}</h1>
            <ul onClick={handleCopy} className="w-full grid grid-cols-2 gap-x-2 gap-y-[10px] text-white leading-5 text-opacity-90">
            { mnemonics && mnemonics.length > 0 && mnemonics.map((mnemonic: string, index: number) => (
                    <li key={index} className="bg-secondary-bg px-3 py-4 rounded-2xl text-center text-sm leading-5">{index + 1}. {mnemonic}</li>
            )) }
            </ul>
        </main>
    );
}
