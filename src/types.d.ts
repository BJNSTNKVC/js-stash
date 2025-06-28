import { LocalStorage } from '@bjnstnkvc/local-storage';
import { SessionStorage } from '@bjnstnkvc/session-storage';

declare module '@bjnstnkvc/stash' {
    export class Stash {
        static driver(driver: 'local' | 'session'): LocalStorage | SessionStorage;
        static local(): LocalStorage;
        static session(): SessionStorage;
    }
}

