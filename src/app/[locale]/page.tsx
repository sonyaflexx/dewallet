'use client'

import Button from "@/components/buttons/Button";
import DeployNotification from "@/components/DeployNotification";
import Checkbox from "@/components/inputs/CheckBox";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation('common');

  const [agree, setAgree] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pt-[10px]">
      <Image src={'https://v2.delabwallet.com/3d06f66530aaaf83c03514054d0ee1b4.gif'} alt="🎊" width={170} height={170} className="mb-[25px]" />
      <h1 className="mb-4 text-[32px] font-medium tracking-wider text-center leading-9">{t('welcomeToDeWallet')}</h1>
      <p className="text-center leading-5">{t('sendBuyStore')}<br />{t('insideTelegram')}</p>

      <div className="w-full mt-auto">
        <div className="w-full flex gap-[10px] text-white hover:text-primary-blue">
          <Checkbox value={agree} setValue={setAgree} />
          <Link href={'/disclaimer'} className={`text-sm underline transition-colors duration-300`}>{t('policyLot')}</Link>
        </div>
        <div className="w-full flex flex-col gap-2 my-5">
          <Button size="large" color="primary" href={'/auth/wallet/create'} disabled={agree ? false : true}>{t('createWallet')}</Button>
          <Button size="large" color="secondary" href={'/auth/wallet/import'} disabled={agree ? false : true}>{t('importWallet')}</Button>
        </div>
      </div>
    </main>
  );
}
