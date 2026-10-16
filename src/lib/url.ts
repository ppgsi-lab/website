import { defaultLocale, localeOf, type Locale } from './i18n';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

const isExternal = (path: string) => /^https?:\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('#');

/** Link para uma rota do site no idioma dado; links externos e âncoras passam direto. */
export const url = (path: string, locale: Locale): string => {
  if (isExternal(path)) return path;
  return base + (locale === defaultLocale ? '' : `/${locale}`) + path;
};

/** Arquivo de public/, igual em todos os idiomas. */
export const asset = (path: string): string => base + path;

/** Rota da página sem o base, sem o idioma e sem a barra final, no formato dos links de navigation.yaml. */
export const route = (current: URL): string => {
  const locale = localeOf(current);
  const path = current.pathname.slice(base.length + (locale === defaultLocale ? 0 : locale.length + 1));
  return path.replace(/\/$/, '') || '/';
};
