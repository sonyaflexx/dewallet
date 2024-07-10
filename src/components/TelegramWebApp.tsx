'use client';

import { useEffect } from 'react';

const TelegramWebApp = () => {
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

      // Set background color according to the theme
      tg.setBackground("#222325");
    }
  };

  return null;
};

export default TelegramWebApp;