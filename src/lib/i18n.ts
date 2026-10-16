export const locales = ['pt-br', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt-br';

/** Tag BCP 47 de cada idioma, para o atributo lang e para o Intl. */
export const languageTag: Record<Locale, string> = { 'pt-br': 'pt-BR', en: 'en', es: 'es' };

/** Nome de cada idioma nele mesmo, como aparece no seletor. */
export const languageName: Record<Locale, string> = { 'pt-br': 'Português', en: 'English', es: 'Español' };

/** Sigla do idioma atual no botão do seletor. */
export const languageCode: Record<Locale, string> = { 'pt-br': 'PT', en: 'EN', es: 'ES' };

const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Parâmetro [...locale] das rotas: o idioma padrão fica sem prefixo. */
export const localeParam = (locale: Locale) => (locale === defaultLocale ? undefined : locale);

export const localeParams = () => locales.map((locale) => ({ params: { locale: localeParam(locale) } }));

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function localeOf(url: URL): Locale {
  const first = url.pathname.slice(base.length).split('/')[1] ?? '';
  return isLocale(first) && first !== defaultLocale ? first : defaultLocale;
}

export const formatDate = (date: Date, locale: Locale) =>
  date.toLocaleDateString(languageTag[locale], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Troca os marcadores {nome} do texto traduzido pelos valores dados. */
export const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, name: string) => {
    if (!(name in values)) throw new Error(`Falta o valor de {${name}} no texto "${text}".`);
    return String(values[name]);
  });
