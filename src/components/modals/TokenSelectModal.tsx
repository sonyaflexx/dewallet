import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import modalStore, { TokenSelectModalConfig } from '@/store/ModalStore';
import { Token } from '@/types';
import TokenList from '../TokenList';
import { useTranslation } from 'react-i18next';

const TokenSelectModal: React.FC = () => {
    const { t } = useTranslation();
    const [tokens, setTokens] = useState<Token[]>([]);

    const handleTokenSelect = (token: Token) => {
        modalStore.tokenSelectModalConfig?.setValue && modalStore.tokenSelectModalConfig?.setValue(token);
        modalStore.closeTokenSelectModal();
    };

    useEffect(() => {
        if (modalStore.tokenSelectModalConfig) {
            setTokens(
                modalStore.tokenSelectModalConfig.tokens.filter(
                    (token) => token.id !== modalStore.tokenSelectModalConfig?.value?.id
                ) 
            );
        }
    }, [modalStore.tokenSelectModalConfig]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
    
            tg.MainButton.text = 'Enter amount';
            tg.MainButton.show();

            tg.MainButton.disable();
    
            return () => {
                tg.MainButton.hide();
            };
        }
      }, []); 

    return (
        <div className={`fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 z-50 ${modalStore.isTokenSelectModalActive ? 'flex opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-primary-bg relative rounded-t-[20px] px-5 pt-5 w-full h-[95vh] transition-transform ${modalStore.isTokenSelectModalActive ? '' : 'translate-y-[2000px]'}`}>
            <button onClick={modalStore.closeTokenSelectModal} className="text-[16.5px] text-accent-brand p-1 mb-6">{t('close')}</button>
            <h1 className='text-[32px] leading-8 text-placeholder-primary mb-6 text-center'>{t('selectToken')}</h1>
            <TokenList tokenList={tokens} handle={handleTokenSelect} />
            <div className='absolute w-full h-[40%] bg-accent-brand bg-opacity-25 rounded-[600px] blur-[110px] bottom-0' />
        </div>
        </div>
    );
};

export default observer(TokenSelectModal);