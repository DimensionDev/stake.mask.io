import { type Chain, createPublicClient as createClient, http, type PublicClient } from 'viem';

const map = new Map<number, PublicClient>();

export function createWagmiPublicClient(chain: Chain): PublicClient {
    const client = map.get(chain.id);
    if (client) return client;

    const newClient = createClient({
        chain,
        transport: http(),
    });
    map.set(chain.id, newClient);
    return newClient;
}
