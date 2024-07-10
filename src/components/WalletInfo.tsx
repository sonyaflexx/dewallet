'use client';

import React, { useEffect, useState } from 'react';
import WalletStore from '@/store/WalletStore';
import { observer } from 'mobx-react';
import { formatAddress } from '@/lib/formatAddress';
import { useTranslation } from 'react-i18next';

const WalletInfo: React.FC = observer(() => {
    const { t } = useTranslation();

    const [avatarUrl, setAvatarUrl] = useState(null);
    const [username, setUsername] = useState('Unknown');
    const [isOpen, setIsOpen] = useState(false);
    const { wallet } = WalletStore;

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    }

    const handleCopy = () => {
        toggleDropdown();
        wallet?.address && navigator.clipboard.writeText(wallet.address);
    }


    useEffect(() => {
        const getUserInfo = async () => {
            if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
                const user = window.Telegram.WebApp.initDataUnsafe?.user;

                if (user) {
                    setUsername(user.username || 'Unknown');

                    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
                    const response = await fetch(`https://api.telegram.org/bot${botToken}/getUserProfilePhotos?user_id=${user.id}`);
                    const data = await response.json();

                    if (data.ok && data.result.photos.length > 0) {
                        const profilePhotos = data.result.photos;
                        const avatarFileId = profilePhotos[0][0].file_id;

                        const fileResponse = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${avatarFileId}`);
                        const fileData = await fileResponse.json();

                        if (fileData.ok) {
                            const filePath = fileData.result.file_path;
                            const avatarUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;
                            setAvatarUrl(avatarUrl as any);
                        }
                    }
                }
            } else {
                console.error('Telegram WebApp is not defined');
            }
        };

        getUserInfo();

        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.wallet-info-dropdown') && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className='flex-1 flex items-center justify-center'>
            <button onClick={toggleDropdown} className="text-center p-2 max-w-[175px] text-lg font-semibold flex items-center justify-between transition-all bg-quadary-bg h-[44px] flex-1 rounded-2xl aspect-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <rect x="0.5" width="20" height="20" rx="10" fill="#10B981"></rect>
                    <rect x="5.5" y="5" width="10" height="10" rx="5" fill="white"></rect>
                </svg>
                <span className='text-[14.5px] font-light'>
                    {formatAddress(wallet?.address, 5, 4)}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 10L12 16L6 10" stroke="#F7F8F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
            <div className={`${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} wallet-info-dropdown transition-opacity z-20 top-4 w-[90vw] rounded-[28px] bg-tertiary-bg bg-opacity-40 backdrop-blur-2xl max-w-[340px] left-1/2 -translate-x-1/2 absolute px-4 pt-3 pb-[19px]`} style={{ WebkitBackdropFilter: 'blur(40px)', backdropFilter: 'blur(40px)' }}>
                <div onClick={toggleDropdown} className='flex justify-center items-center gap-3'>
                    {avatarUrl ? (
                        <img src={avatarUrl} alt='User Avatar' className='size-12 rounded-full bg-zinc-800' />
                    ) : (
                        <div className='size-12 rounded-full bg-zinc-800' />
                    )}
                    <span className='text-lg font-medium'>{username}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 11.6667L10 6.66675L5 11.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center text-[15px] font-normal'>
                        <span className='text-placeholder-secondary'>{t('network')}</span>
                        <span className='text-white'>TON Mainnet</span>
                    </div>
                    <div className='flex justify-between items-center text-[15px] font-normal'>
                        <span className='text-placeholder-secondary'>{t('address')}</span>
                        <span onClick={handleCopy} className='text-white flex gap-1'>{formatAddress(wallet?.address, 5, 4)}
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none"><path d="M16.1364 15.6364H20.5V4H8.86364V8.36364M4.5 8.36364H16.1364V20H4.5V8.36364Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default WalletInfo;
