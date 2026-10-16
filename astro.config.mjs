// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';

/** Envolve cada bloco de código no quadro do design system, com a linguagem acima do código. */
/** @type {import('shiki').ShikiTransformer} */
const codeFrame = {
  name: 'ppgsi-code-frame',
  root(root) {
    const pre = root.children.filter((node) => node.type === 'element');
    root.children = [{
      type: 'element',
      tagName: 'div',
      properties: { class: 'code' },
      children: [
        { type: 'element', tagName: 'span', properties: { class: 'lang' }, children: [{ type: 'text', value: this.options.lang }] },
        ...pre,
      ],
    }];
  },
};

/** Envolve cada tabela do Markdown no contêiner .tbl do design system, que rola na horizontal no telefone. */
function tableFrame() {
  /** @param {import('hast').Root | import('hast').Element} node */
  const visit = (node) => {
    node.children.forEach((child, i) => {
      if (child.type !== 'element') return;
      if (child.tagName === 'table') {
        node.children[i] = { type: 'element', tagName: 'div', properties: { className: ['tbl'] }, children: [child] };
      } else {
        visit(child);
      }
    });
  };
  return visit;
}

// https://astro.build/config
const base = '/website';

/** Prefixa o base e o idioma nos links internos do Markdown, como o url() faz nos componentes. */
function baseLinks() {
  /** @param {import('hast').Root} tree @param {import('vfile').VFile} file */
  return (tree, file) => {
    const locale = file.path.match(/\/src\/content\/[^/]+\/(en|es)\//)?.[1];
    const prefix = base + (locale ? `/${locale}` : '');
    /** @param {import('hast').Root | import('hast').Element} node */
    const visit = (node) => {
      for (const child of node.children) {
        if (child.type !== 'element') continue;
        const href = child.properties.href;
        if (child.tagName === 'a' && typeof href === 'string' && /^\/(?!\/)/.test(href)) child.properties.href = prefix + href;
        visit(child);
      }
    };
    visit(tree);
  };
}

export default defineConfig({
  site: 'https://ppgsi-lab.github.io',
  base,

  // Escopo sem especificidade extra, para a cascata dos componentes ser a mesma do CSS do design system.
  scopedStyleStrategy: 'where',

  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      transformers: [codeFrame],
    },
    processor: unified({ rehypePlugins: [tableFrame, baseLinks] }),
  },

  integrations: [mdx()]
});
