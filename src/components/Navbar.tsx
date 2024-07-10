'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "./icons/HomeIcon";
import SwapIcon from "./icons/SwapIcon";
import AppsIcon from "./icons/AppsIcon";
import SettingsIcon from "./icons/SettingsIcon";
import { useTranslation } from "react-i18next";

export default function Navbar() {
    const { t } = useTranslation();
    const path = usePathname()

    const cleanPath = (path: string) => {
        const segments = path.split('/wallet').filter((segment : any) => segment !== '');
        const validSegments = ['', '/swap', '/apps', '/settings'];
        const validSegment = segments.find(segment => validSegments.includes(segment));
        return validSegment ? validSegment : '/';
    };

    const activePage = cleanPath(path);
    
    return (
        <nav className="fixed z-30 stroke-current bottom-0 left-1/2 -translate-x-1/2 flex justify-between items-center bg-secondary-bg w-screen max-w-[920px] rounded-t-3xl px-6 pt-3 pb-5">
            <Link className={`flex flex-col items-center gap-1 rounded-xl p-1 w-[72px] ${activePage === '/' ? 'text-placeholder-primary' : 'text-placeholder-secondary'}`} href={'/wallet'}>
                <HomeIcon />
                <span className="text-[11px] font-medium leading-5">{t('home')}</span>
            </Link>
            <Link className={`flex flex-col items-center gap-1 rounded-xl p-1 w-[72px] ${activePage === '/swap' ? 'text-placeholder-primary' : 'text-placeholder-secondary'}`} href={'/wallet/swap'}>
                <SwapIcon />
                <span className="text-[11px] font-medium leading-5">{t('swap')}</span>
            </Link>
            <Link className={`flex flex-col items-center gap-1 rounded-xl p-1 w-[72px] ${activePage === '/apps' ? 'text-placeholder-primary' : 'text-placeholder-secondary'}`} href={'/wallet/apps'}>
                <AppsIcon />
                <span className="text-[11px] font-medium leading-5">{t('apps')}</span>
            </Link>
            <Link className={`flex flex-col items-center gap-1 rounded-xl p-1 w-[72px] ${activePage === '/settings' ? 'text-placeholder-primary' : 'text-placeholder-secondary'}`} href={'/wallet/settings'}>
                <SettingsIcon />
                <span className="text-[11px] font-medium leading-5">{t('settings')}</span>
            </Link>
        </nav>
    )
}