export { default } from 'next-auth/middleware';

export const config = { matcher: ['/create-prompt', '/update-prompt', '/profile'] };
