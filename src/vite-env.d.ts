/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.md' {
  const plainText: string
  export default plainText
}
