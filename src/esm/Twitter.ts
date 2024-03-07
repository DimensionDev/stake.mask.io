import NextAuthTwitter from 'next-auth/providers/twitter';

export const Twitter = NextAuthTwitter as unknown as typeof NextAuthTwitter.default;
