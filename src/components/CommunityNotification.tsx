'use client'

import { useTranslation } from "react-i18next";
import ArrowIcon from "./icons/ArrowIcon";
import TelegramIcon from "./icons/TelegramIcon";
import WarningIcon from "./icons/WarningIcon";

export default function CommunityNotification() {
    const { t } = useTranslation();

    return (
        <a href="https://t.me/delab" target="_blank" className="flex flex-col w-full rounded-2xl p-4 bg-tertiary-bg bg-opacity-30 backdrop-blur-2xl">
            <div className="flex gap-4 items-center">
                <TelegramIcon />
                <p className="flex-1 text-sm leading-5">{t('joinCommunity')}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10 6L16 12L10 18" stroke="#8A97AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
        </a>
    )
}