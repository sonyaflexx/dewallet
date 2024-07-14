'use client';

import { useEffect } from 'react';

const TelegramWebApp = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.expand(); 

      tg.onEvent('themeChanged', setTheme); 

      setTheme();

      return () => {
        tg.offEvent('themeChanged', setTheme); 
      };
    }
  }, []);

  const setTheme = () => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      const theme = tg.themeParams;

      // tg.setBackground("#222325");
    }
  };

  return null;
};

export default TelegramWebApp;