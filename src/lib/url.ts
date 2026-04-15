const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string): string => {
  if (!path) return base || '/';
  if (/^https?:\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('#')) return path;
  return base + (path.startsWith('/') ? path : '/' + path);
};
