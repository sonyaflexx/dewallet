'use client'

import modalStore, { BuyAmountModalConfig, TokenSelectModalConfig } from "@/store/ModalStore";
import Button from "./buttons/Button";
import ArrowIcon from "./icons/ArrowIcon";
import USDIcon from "./icons/USDIcon";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Token } from "@/types";

const tokenList = [
    {
        id: 1,
        logoUrl: 'https://v2.delabwallet.com/0068d136b4f5ffc93f0073cf3ef223fd.png',
        name: 'TON',
        price: 7.35,
        change_24h: 0.43,
        amount: 0,
    },
]

const WalletActions = () => {
    const { t } = useTranslation();
    const [token, setToken] = useState<Token | null>(null)

    const [amount, setAmount] = useState(0);
    const [cardNumber, setCardNumber] = useState('');
    const [email, setEmail] = useState('')

    const handleBuySelectModal = () => {
        const modalConfig: TokenSelectModalConfig = {
            setValue: setToken,
            tokens: tokenList,
        };
        modalStore.openTokenSelectModal(modalConfig);
    };

    useEffect(() => {
        const setValue = (newValues: { amount: number; cardNumber: string; email: string }) => {
            setAmount(newValues.amount);
            setCardNumber(newValues.cardNumber);
            setEmail(newValues.email);
        };

        if (token) {
            const modalConfig: BuyAmountModalConfig = {
                value: { amount, cardNumber, email },
                setValue,
                token: token,
            };
            modalStore.openBuyAmountModal(modalConfig);
        }
    }, [token]);

    return (
        <div className="w-full z-10">
            <ul className="flex w-full justify-between items-center px-2 py-[10px] rounded-[28px] bg-border bg-opacity-40 backdrop-blur-xl">
                <li className="py-[5px] px-4 flex flex-col gap-2 items-center">
                    <Button onClick={handleBuySelectModal} color="primary" size="small">
                        <USDIcon />
                    </Button>
                    <span className="text-sm text-center">{t('buy')}</span>
                </li>
                <div className="w-px h-[53px] bg-placeholder-primary bg-opacity-10" />
                <li className="py-[5px] px-4 flex flex-col gap-2 items-center">
                    <Button color="primary" size="small">
                        <ArrowIcon direction="Up" />
                    </Button>
                    <span className="text-sm text-center">{t('send')}</span>
                </li>
                <div className="w-px h-[53px] bg-placeholder-primary bg-opacity-10" />
                <li className="py-[5px] px-4 flex flex-col gap-2 items-center">
                    <Button color="primary" size="small">
                        <ArrowIcon direction="Down" />
                    </Button>
                    <span className="text-sm text-center">{t('receive')}</span>
                </li>
            </ul>
        </div>
    )
}

export default WalletActions;
