/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_PORT: string;
  readonly VITE_BASE_API_ORIGIN: string;
  readonly VITE_BASE_API_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
