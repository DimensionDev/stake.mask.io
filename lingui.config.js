import { formatter } from '@lingui/format-po';

const locales = ['en', 'zh-Hans', 'pseudo'];

/** @type {import('@lingui/conf').LinguiConfig} */
const config = {
    locales,
    sourceLocale: 'en',
    pseudoLocale: 'pseudo',
    compileNamespace: 'es',
    catalogs: [
        {
            path: 'src/locales/{locale}/messages',
            include: [
                'src/app/**',
            ],
        },
    ],
    fallbackLocales: {
        pseudo: 'en',
    },
    format: 'po',
    formatOptions: {
        origins: true,
        lineNumbers: false,
    },
    orderBy: 'messageId',
    format: formatter({ origins: false }),
};

export default config;