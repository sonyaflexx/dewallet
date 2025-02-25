'use client'

import { Provider } from 'mobx-react';
import { ReactNode, useEffect, useState } from 'react';
import WalletStore from '@/store/WalletStore';
import { useRouter, usePathname } from 'next/navigation';
import TokenSelectModal from '@/components/modals/TokenSelectModal';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import BuyAmountModal from '@/components/modals/BuyAmountModal';
import TelegramWebApp from '@/components/TelegramWebApp';
import ReceiveModal from '@/components/modals/ReceiveModal';

export default function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const pathWithoutLang = pathname.replace(/^\/(ru|en)/, '');

    const hasWallet = WalletStore.wallet;

    if (!hasWallet && pathWithoutLang.startsWith('/wallet')) {
      router.push('/');
    } else if (hasWallet && !pathWithoutLang.startsWith('/wallet') && !pathWithoutLang.startsWith('/disclaimer') && !pathWithoutLang.startsWith('/settings')) {
      router.push('/wallet');
    }
  }, [pathname, router]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.themeParams.bg_color='#222328'
      webApp.themeParams.section_bg_color='#222328'
      webApp.themeParams.secondary_bg_color='#222328'
      webApp.setHeaderColor('#222328');
      webApp.setBackgroundColor('#222328')

      const handleReady = () => {
        webApp.ready();
        webApp.expand();
      };

      const handleResize = () => {
        if (webApp.isExpanded) {
          webApp.expand();
        } else {
          webApp.expand();
        }
      };

      handleReady();

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } else {
      console.error('Telegram WebApp is not defined');
    }
  }, []);

  if (!isHydrated) {
    return null; 
  }

  return (
    <I18nextProvider i18n={i18n} defaultNS={'common'}>
      <Provider {...{ WalletStore }}>
        <ReceiveModal />
        <TokenSelectModal />
        <BuyAmountModal />
        {children}
      </Provider>
    </I18nextProvider>
  );
}
