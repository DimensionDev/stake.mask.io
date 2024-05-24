if (process.env.NODE_ENV === 'development') {
  if (!import.meta.env.VITE_API_END_POINT) {
    console.error('`VITE_API_END_POINT` is missing, you should set it .env.local')
  }
}
export const FIREFLY_API_ROOT = import.meta.env.VITE_API_END_POINT
