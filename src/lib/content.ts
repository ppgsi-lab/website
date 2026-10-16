import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, locales, type Locale } from './i18n';

type Translatable = 'pages' | 'news' | 'posts';

export interface LocalizedEntry<C extends Translatable> {
  /** Id sem a pasta do idioma, igual em todas as versões; é a rota do conteúdo. */
  slug: string;
  entry: CollectionEntry<C>;
  /** A versão mostrada é de outro idioma, porque falta a tradução. */
  fallback: boolean;
}

function splitId(id: string): { locale: Locale; slug: string } {
  const [first, ...rest] = id.split('/');
  const locale = locales.find((candidate) => candidate === first);
  if (!locale || rest.length === 0) throw new Error(`O conteúdo ${id} precisa estar numa pasta de idioma (${locales.join(', ')}).`);
  return { locale, slug: rest.join('/') };
}

/** Uma entrada por conteúdo, no idioma pedido; sem tradução, cai no português e, sem ele, na primeira versão que houver. */
export async function getLocalized<C extends Translatable>(collection: C, locale: Locale): Promise<LocalizedEntry<C>[]> {
  const versions = new Map<string, { first: CollectionEntry<C>; byLocale: Map<Locale, CollectionEntry<C>> }>();
  for (const entry of await getCollection(collection)) {
    const { locale: entryLocale, slug } = splitId(entry.id);
    const group = versions.get(slug) ?? { first: entry, byLocale: new Map() };
    group.byLocale.set(entryLocale, entry);
    versions.set(slug, group);
  }
  return [...versions].map(([slug, { first, byLocale }]) => ({
    slug,
    entry: byLocale.get(locale) ?? byLocale.get(defaultLocale) ?? first,
    fallback: !byLocale.has(locale),
  }));
}

export const byDateDesc = <T extends { entry: { data: { date: Date } } }>(items: T[]) =>
  [...items].sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());

export const slugify = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Nome de um tema a partir da tag do frontmatter, como "deep-learning" → "Deep learning". */
export const tagLabel = (tag: string) => {
  const text = tag.replace(/-/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
};
