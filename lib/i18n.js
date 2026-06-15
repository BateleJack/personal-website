import { useRouter } from 'next/router';
import en from '../locales/en';
import zh from '../locales/zh';

const locales = { en, zh };

export function useTranslation() {
  const { pathname } = useRouter();
  const isZh = pathname.startsWith('/zh');
  const locale = isZh ? 'zh' : 'en';
  const t = locales[locale];
  return { t, locale };
}
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