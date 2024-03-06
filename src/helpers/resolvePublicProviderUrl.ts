import { polygon } from 'viem/chains';

import { createLookupTableResolver } from '@/helpers/createLookupTableResolver.js';

export const resolvePublicProviderUrl = createLookupTableResolver<number, string>(
    {
        [polygon.id]: 'https://polygon-rpc.com',
    },
    '',
);
