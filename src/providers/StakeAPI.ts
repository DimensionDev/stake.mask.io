import urlcat from 'urlcat';

import { BASE_URL } from '@/constants/index.js';
import { fetchJSON } from '@/helpers/fetchJSON.js';

interface Response {
    code: number;
    data: any;
    message: string;
    reason: string;
}

type RankingItem = {
    address: string;
    score: number;
    stake_amount: string;
    twitter_display_name: string;
    twitter_id: string;
    twitter_image: string;
    twitter_name: string;
    twitter_username: string;
};

interface RankingListResponse{
    code: number;
    data: {
        list: RankingItem[]
        page:{cursor: string}
    }
    message: string;
    reason: string;
}

class StakeAPI {
    async bindTwitter(original_message: string, signature_message: string, wallet_address: string) {
        const url = urlcat(BASE_URL, '/twitter/authorize', {
            original_message,
            signature_message,
            wallet_address,
        });
        const response = await fetchJSON<Response>(url, {
            method: 'GET',
        });
        return response;
    }

    async updateTwitterInfo(
        display_name: string,
        show_avatar: boolean,
        original_message: string,
        signature_message: string,
        wallet_address: string,
    ) {
        const url = urlcat(BASE_URL, '/twitter/update', {
            display_name,
            show_avatar,
            original_message,
            signature_message,
            wallet_address,
        });
        const response = await fetchJSON<Response>(url, {
            method: 'GET',
        });
        return response;
    }

    async getPoolInfo(pool_id: number) {
        const url = urlcat(BASE_URL, '/pool_info', {
            pool_id,
        });
        const response = await fetchJSON<Response>(url, {
            method: 'GET',
        });
        return response;
    }

    async getUserInfo(address: string, pool_id: number) {
        const url = urlcat(BASE_URL, '/user_info', {
            address,
            pool_id,
        });
        const response = await fetchJSON<Response>(url, {
            method: 'GET',
        });
        return response;
    }

    async getRankingList(pool_id: number) {
        const url = urlcat(BASE_URL, '/rank', {
            pool_id,
        });
        const response = await fetchJSON<RankingListResponse>(url, {
            method: 'GET',
        });
        return response;
    }
}

export const stakeAPI = new StakeAPI();
