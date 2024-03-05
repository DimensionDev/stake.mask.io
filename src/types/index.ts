import { ServerErrorCodes } from '@/helpers/createErrorResponseJSON.js';

export type ResponseJSON<T> =
    | {
          success: true;
          data: T;
      }
    | {
          success: false;
          error: {
              code: ServerErrorCodes;
              message: string;
          };
      };

export type ThemeMode = 'light' | 'dark' | 'default';

export enum Locale {
    en = 'en',
    zhHans = 'zh-Hans',
}

export type PartialWith<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
