'use client';

import { useEffect } from 'react';

const TelegramWebApp = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.expand(); // Ensure the web app is expanded to cover the full screen

      return () => {
        tg.ready();
      };
    }
  }, []);

  return null;
};

export default TelegramWebApp;