'use client';

import { useEffect } from 'react';

const TelegramWebApp = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const initData = window.Telegram.WebApp.initData;
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      
      console.log('Init data:', initData);
      console.log('Init data unsafe:', initDataUnsafe);

      window.Telegram.WebApp.ready();
    } else {
      console.error('Telegram WebApp is not defined');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand(); // Ensure the web app is expanded to cover the full screen

      tg.onEvent('themeChanged', setTheme); // React to theme changes

      setTheme(); // Set the theme on initial load

      return () => {
        tg.offEvent('themeChanged', setTheme); // Cleanup on component unmount
      };
    }
  }, []);

  const setTheme = () => {
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      const theme = tg.themeParams;

      // Set your background color according to the theme
      document.body.style.backgroundColor = "#222325";
    }
  };

  return null;
};

export default TelegramWebApp;