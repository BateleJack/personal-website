// lib/i18n.js
import { useEffect, useState } from 'react';
import en from '../locales/en';
import zh from '../locales/zh';

export function useTranslation() {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    // 仅在客户端执行
    const isZh = window.location.pathname.startsWith('/zh');
    setLocale(isZh ? 'zh' : 'en');
  }, []);

  const t = locale === 'zh' ? zh : en;
  return { t, locale };
}