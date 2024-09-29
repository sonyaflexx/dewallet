import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import modalStore, { TokenSelectModalConfig } from '@/store/ModalStore';
import { Token } from '@/types';
import TokenList from '../TokenList';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import WalletStore from '@/store/WalletStore';
import { formatAddress } from '@/lib/formatAddress';

const ReceiveModal: React.FC = () => {
    const { t } = useTranslation();

    const handleCopy = () => {
        WalletStore.wallet?.address && navigator.clipboard.writeText(WalletStore.wallet.address);
    }

    return (
        <div className={`fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 z-50 ${modalStore.isReceiveModalActive ? 'flex opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-primary-bg overflow-y-auto relative rounded-t-[20px] px-5 pt-5 w-full h-[95vh] transition-transform ${modalStore.isReceiveModalActive ? '' : 'translate-y-[2000px]'}`}>
            <button onClick={modalStore.closeReceiveModal} className="text-[16.5px] text-accent-brand p-1 mb-6">{t('close')}</button>
            <h1 className='text-[32px] leading-8 text-placeholder-primary text-center font-medium'>{t('receive')}</h1>
            <div className='size-[230px] bg-white flex items-center justify-center rounded-2xl my-10 mx-auto'>
                <QRCode style={{ width: '200px', height: '200px' }} value={WalletStore.wallet?.address || ''} />
            </div>
            <button onClick={handleCopy} className="relative z-10 text-center p-2 text-lg font-semibold flex gap-2 items-center justify-between transition-all bg-primary-bg mx-auto h-[44px] flex-1 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <rect x="0.5" width="20" height="20" rx="10" fill="#10B981"></rect>
                    <rect x="5.5" y="5" width="10" height="10" rx="5" fill="white"></rect>
                </svg>
                <span className='text-[14.5px]'>
                    {formatAddress(WalletStore.wallet?.address, 5, 4)}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none"><path d="M16.1364 15.6364H20.5V4H8.86364V8.36364M4.5 8.36364H16.1364V20H4.5V8.36364Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
            <p className='font-medium text-center my-7 mb-20'>Receive <span className='font-semibold'>TON or Jettons</span> via <span className='font-semibold'>The Open Network</span> to this address. You must send at least <span className='font-semibold'>0.1 TON or 0.1 Jetton</span> or more to deposit.</p>
            <div className='absolute w-full h-[40%] bg-accent-brand bg-opacity-25 rounded-[600px] blur-[110px] bottom-0' />
        </div>
        </div>
    );
};

export default observer(ReceiveModal);