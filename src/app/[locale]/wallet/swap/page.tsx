'use client'

import DangerIcon from "@/components/icons/DangerIcon";
import modalStore, { TokenSelectModalConfig } from "@/store/ModalStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const tokenList = [
    {
      id: 1,
      logoUrl: '	https://v2.delabwallet.com/0068d136b4f5ffc93f0073cf3ef223fd.png',
      name: 'TON',
      price: 4.34,
      change_24h: 0.43,
      amount: 0,
    },
    {
      id: 2,
      logoUrl: 'https://v2.delabwallet.com/d4dc5bc9cbc0d70f98be41d9f234cc67.png',
      name: 'DFC',
      price: 0.97,
      change_24h: 9.25,
      amount: 0,
    },
    {
      id: 3,
      logoUrl: 'https://v2.delabwallet.com/cea435ee35ddd568d2bb56ae5f266276.png',
      name: 'ARBUZ',
      price: 0.33,
      change_24h: -21.89,
      amount: 0,
    },
    {
      id: 4,
      logoUrl: 'https://v2.delabwallet.com/111c157feb06ba4d0020760c01e89756.png',
      name: 'KINGY',
      price: 0.21,
      change_24h: 1.59,
      amount: 0,
    },
    {
      id: 5,
      logoUrl: 'https://v2.delabwallet.com/a99afedca980663059d5e21ce99cfbf3.png',
      name: 'PRIVATE',
      price: 0.005,
      change_24h: -1.88,
      amount: 0,
    },
    {
        id: 6,
        logoUrl: 'https://assets.dedust.io/images/scale.webp',
        name: 'SCALE',
        price: 2.73,
        change_24h: 10.2,
        amount: 0,
    },
    {
        id: 7,
        logoUrl: 'https://assets.dedust.io/images/usdt.webp',
        name: 'USDT',
        price: 1,
        change_24h: 0,
        amount: 0,
    },
    {
        id: 8,
        logoUrl: 'https://v2.delabwallet.com/a99afedca980663059d5e21ce99cfbf3.png',
        name: 'PRIVATE+',
        price: 3.32,
        change_24h: -5.23,
        amount: 0,
    },
];

export default function Swap() {
    const { t } = useTranslation();
    const [fromToken, setFromToken] = useState(tokenList[0]);
    const [toToken, setToToken] = useState(tokenList[1]);
    const [amount, setAmount] = useState('');
    const [isSwapped, setIsSwapped] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;

            tg.BackButton.isVisible = true;
            tg.BackButton.onClick(() => {
                router.push('/wallet');
            })

            return () => {
                tg.BackButton.isVisible = false;
            };
        }
    }, [router]);

    const swapTokens = () => {
        const tempToken = fromToken;
      
        setFromToken(toToken);
        setToToken(tempToken);
        setIsSwapped(!isSwapped)
    };

    const handleOpenTokenSelectModal = (type: string) => {
        const modalConfig: TokenSelectModalConfig = {
          value: type === 'from' ? toToken : fromToken,
          setValue: type === 'from' ? setFromToken : setToToken,
          tokens: tokenList,
        };
        modalStore.openTokenSelectModal(modalConfig);
    };

    return (
        <main className="flex min-h-screen flex-col items-center px-4 py-4 pb-28">
            <div className="flex flex-col gap-[6px]">
                <div className="flex flex-col gap-[6px] relative w-full">
                    <div className="bg-secondary-bg bg-opacity-60 border border-border border-opacity-20 rounded-3xl p-4 pb-6 w-full">
                        <p className="uppercase text-[13px] leading-6 text-placeholder-secondary mb-[7px]">{t('from')}</p>
                        <button onClick={() => handleOpenTokenSelectModal('from')} className="mb-4 bg-secondary-bg bg-opacity-40 rounded-[20px] w-full flex items-center justify-between p-3 gap-[10px]">
                            <div className="flex justify-between w-full">
                                <div className="flex gap-[10px] items-center">            
                                    <Image src={fromToken.logoUrl} height={32} width={32} alt="logo" className="rounded-full" />
                                    <div>
                                        <p className="text-xl font-medium text-placeholder-primary text-left">{fromToken.name}</p>
                                        <div className="flex gap-[5px] text-left leading-none">
                                            <p className="text-sm text-placeholder-secondary pl-[3px]">${fromToken.price.toLocaleString('ru-RU')}</p>
                                            <span className={`text-sm pl-[3px] ${fromToken.change_24h >= 0 ? 'text-accent-success' : 'text-accent-error'}`}>{fromToken.change_24h >= 0 && '+'}{fromToken.change_24h}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right text-sm text-placeholder-secondary pl-[3px]">${(fromToken.amount * fromToken.price).toLocaleString('ru-RU')}</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 10L12 16L6 10" stroke="#8A97AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </button>
                        <input 
                            type="text" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className="text-[32px] font-medium !p-0 w-full !bg-transparent outline-none placeholder:text-placeholder-primary text-placeholder-primary"
                            
                        />
                    </div>

                    <button onClick={swapTokens} className={`p-[10px] rounded-full bg-accent-brand border-[3px] border-secondary-bg absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 ${isSwapped && 'rotate-180'} transition-transform`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 20L17 8M17 20L13.5 16.5M17 20L20.5 16.5M7 17L7 4M7 4L3.5 7.5M7 4L10.5 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </button>

                    <div className="bg-secondary-bg bg-opacity-60 border border-border border-opacity-20 rounded-3xl p-4 pb-6 w-full">
                        <p className="uppercase text-[13px] leading-6 text-placeholder-secondary mb-[7px]">{t('to')}</p>
                        <button  onClick={() => handleOpenTokenSelectModal('to')} className="mb-4 bg-secondary-bg bg-opacity-40 rounded-[20px] w-full flex items-center justify-between p-3 gap-[10px]">
                            <div className="flex justify-between w-full">
                                <div className="flex gap-[10px] items-center">            
                                    <Image src={toToken.logoUrl} height={32} width={32} alt="logo" className="rounded-full" />
                                    <div>
                                        <p className="text-xl font-medium text-placeholder-primary text-left">{toToken.name}</p>
                                        <div className="flex gap-[5px] text-left leading-none">
                                            <p className="text-sm text-placeholder-secondary pl-[3px]">${toToken.price.toLocaleString('ru-RU')}</p>
                                            <span className={`text-sm pl-[3px] ${toToken.change_24h >= 0 ? 'text-accent-success' : 'text-accent-error'}`}>{toToken.change_24h >= 0 && '+'}{fromToken.change_24h}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right text-sm text-placeholder-secondary pl-[3px]">${(toToken.amount * toToken.price).toLocaleString('ru-RU')}</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 10L12 16L6 10" stroke="#8A97AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </button>
                        <input 
                            type="text" 
                            value={0}
                            placeholder="0"
                            disabled
                            className="text-[32px] font-medium !p-0 w-full !bg-transparent outline-none placeholder:text-placeholder-primary text-placeholder-primary"
                            
                        />
                    </div>
                </div>

                <div className="bg-secondary-bg bg-opacity-60 border border-border border-opacity-20 rounded-3xl p-4 w-full flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <span className="text-placeholder-secondary text-sm">{t('priceImpact')}</span>
                        <div className="border-2 border-ghost border-t-black rounded-full size-[14px] animate-spin" />
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 326 2" fill="none"><path d="M0 1H326" stroke="#364A5D" strokeDasharray="8 8"></path></svg>
                    <div className="flex justify-between items-center">
                        <span className="text-placeholder-secondary text-sm">{t('fee')}</span>
                        <div className="border-2 border-ghost border-t-black rounded-full size-[14px] animate-spin" />
                    </div>
                </div>
            </div>

            <p className="mx-auto text-[13px] leading-[18px] mt-[15px] mb-[3px] text-hint w-[90%]">{t('minSwap')}</p>
        
            <div className="flex flex-col gap-2 mt-5 w-full">
                <div className="flex gap-1 items-center mx-auto">
                    <p className="text-[13px] leading-[18px] text-placeholder-primary">{t('poweredBy')}</p>
                    <a href="https://dedust.io/" target="_blank" className="flex items-center gap-px">
                        <Image src={'https://v2.delabwallet.com/5a104d1d5d84de28ae81d7b593f94fc7.png'} height={12} width={12} alt='DeDust' className="flex-1" />
                        <p className="text-[13px] font-semibold leading-[18px] text-placeholder-primary">DeDust</p>
                    </a>
                </div>

                { (isNaN(parseFloat(amount)) || parseFloat(amount) < 1) ? (
                    <div className="bg-secondary-bg bg-opacity-60 border border-border border-opacity-20 rounded-3xl p-4 w-full flex text-accent-error gap-[3px] text-base">
                        <DangerIcon />
                        <p className="flex-1">{t('over1')}</p>
                    </div>
                ) : (
                    <div className="bg-secondary-bg bg-opacity-60 border border-border border-opacity-20 rounded-3xl p-4 w-full flex text-accent-error gap-[3px] text-base">
                        <DangerIcon />
                        <p className="flex-1">{t('over2')}</p>
                    </div>
                )}
            </div>
        </main>
    )
}