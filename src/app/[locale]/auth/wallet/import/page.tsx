'use client'

import Button from "@/components/buttons/Button";
import ImportTabs from "@/components/ImportTabs";
import { useImportWallet } from "@/hooks/useImportWallet";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as bip39 from 'bip39';
import Link from "next/link";
import VersionSwitch from "@/components/VersionSwitch";
import { useTranslation } from "react-i18next";
import { telegramAlert } from "@/lib/telegramAlert";

const validWords = bip39.wordlists.EN;

export default function ImportWallet() {
    const { t } = useTranslation();
    
    const router = useRouter();
    const { importWallet } = useImportWallet();
    const [mnemonics, setMnemonics] = useState<string[]>([]);
    const [wordsCount, setWordsCount] = useState(24);
    const [inputValues, setInputValues] = useState<any>(Array.from({ length: 24 }).fill(''));
    const [inputErrors, setInputErrors] = useState<any>(Array.from({ length: 24 }).fill(''));
    const [inputValid, setInputValid] = useState<any>(Array.from({ length: 24 }).fill(false));
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

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

    const handleInputChange = (index: number, value: string) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);

        if (value.trim() === '') {
            setInputValid((prevValid: any) => [
                ...prevValid.slice(0, index),
                false,
                ...prevValid.slice(index + 1)
            ]);
        } else if (validWords.indexOf(value.toLowerCase()) === -1) {
            setInputValid((prevValid: any) => [
                ...prevValid.slice(0, index),
                false,
                ...prevValid.slice(index + 1)
            ]);
        } else {
            setInputErrors((prevErrors: any) => [
                ...prevErrors.slice(0, index),
                '',
                ...prevErrors.slice(index + 1)
            ]);
            setInputValid((prevValid: any) => [
                ...prevValid.slice(0, index),
                true,
                ...prevValid.slice(index + 1)
            ]);
        }
    };

    const handleFocus = (index: number) => {
        setFocusedIndex(index);
    };

    const handleBlur = (index: number, value: string) => {
        setFocusedIndex(null);

        if (value.trim() === '') {
            setInputErrors((prevErrors: any) => [
                ...prevErrors.slice(0, index),
                'Word is required',
                ...prevErrors.slice(index + 1)
            ]);
            setInputValid((prevValid: any) => [
                ...prevValid.slice(0, index),
                false,
                ...prevValid.slice(index + 1)
            ]);
        } else if (validWords.indexOf(value.toLowerCase()) === -1) {
            setInputErrors((prevErrors: any) => [
                ...prevErrors.slice(0, index),
                'Invalid word',
                ...prevErrors.slice(index + 1)
            ]);
            setInputValid((prevValid: any) => [
                ...prevValid.slice(0, index),
                false,
                ...prevValid.slice(index + 1)
            ]);
        }
    };

    const combineMnemonics = () => {
        const joinedMnemonics = inputValues.filter((value: string) => value.trim() !== ''); 
        setMnemonics(joinedMnemonics);
    };

    useEffect(() => {
        combineMnemonics();
    }, [inputValues]);

    const handleImport = () => {
        if (inputErrors.every((error: string) => error === '')) {
            importWallet(mnemonics);
        } else {
            telegramAlert(t('importError'))
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center px-4 py-[10px]">
            <h1 className="mb-6 text-[32px] font-medium tracking-wider">{t('import')}</h1>
            <ImportTabs value={wordsCount} setValue={setWordsCount} />
            <VersionSwitch />
            <ul className="flex flex-col gap-[10px] w-full mt-6">
                {Array.from({ length: wordsCount }).map((_, index) => (
                    <li key={index} className="flex gap-[10px] items-center">
                        <div className={`flex items-center justify-center rounded-[20px] size-[51px] text-placeholder-tertiary bg-secondary-bg ${inputErrors[index] && inputValues[index].length > 0 && focusedIndex !== index ? '!text-accent-error' : inputValid[index] && inputValues[index].length > 0 && '!text-success text-opacity-70'}`}>{index + 1}.</div>
                        <input 
                            type="text"
                            placeholder={t('enterWord')}
                            value={inputValues[index]}
                            onFocus={() => handleFocus(index)}
                            onBlur={(e) => handleBlur(index, e.target.value)}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className={`p-4 flex-1 w-full rounded-[20px] outline-none text-base leading-[133.33%] bg-secondary-bg text-placeholder-primary placeholder:text-placeholder-tertiary ${inputErrors[index] && inputValues[index].length > 0 && focusedIndex !== index ? 'border border-accent-error' : inputValid[index] && inputValues[index].length > 0 && 'border border-success border-opacity-60'}`}
                        />
                    </li>
                ))}
            </ul>
            <div className="mt-[30px] pb-2 gap-2 items-center flex flex-col w-full">
                <Button color="primary" size="large" onClick={handleImport}>{t('import')}</Button>
                <Link href={'/'} className="text-[16.5px] mt-1 text-accent-brand p-1 mb-6">{t('cancel')}</Link>
            </div>
        </main>
    );
}