/// <reference types="vite/client" />
declare module 'react-meta-tags';

declare const DEMO_MODE: boolean = import.meta.env.VITE_DEMO_MODE === 'true';

declare module 'countries-code';
declare const APP_VERSION: string;
declare const PERSIST_KEY: string;
declare const SECRET_KEY: string;
