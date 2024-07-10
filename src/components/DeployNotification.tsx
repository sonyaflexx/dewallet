'use client'

import { useTranslation } from "react-i18next";
import WarningIcon from "./icons/WarningIcon";

export default function DeployNotification() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col mb-4 w-full rounded-2xl px-4 pb-4 pt-[18px]" style={{ background: 'linear-gradient(0deg, rgba(46, 53, 61, 0.40) 0%, rgba(46, 53, 61, 0.40) 100%), rgb(66, 75, 86)' }}>
            <div className="flex gap-4 items-center">
                <WarningIcon />
                <p className="flex-1 text-sm leading-5">{t('deployNotif')}</p>
            </div>
            <button className="mt-3 w-full text-[15px] font-medium rounded-xl bg-placeholder-primary bg-opacity-10 p-[14px]">
                {t('deployWallet')}
            </button>
        </div>
    )
}