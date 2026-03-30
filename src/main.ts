import { LocalStorage } from '@bjnstnkvc/local-storage';
import { SessionStorage } from '@bjnstnkvc/session-storage';
import { Cookie } from '@bjnstnkvc/cookie';

export { LocalStorage } from '@bjnstnkvc/local-storage';
export { SessionStorage } from '@bjnstnkvc/session-storage';
export { Cookie } from '@bjnstnkvc/cookie';

export class Stash {
    /**
     * Creates a new instance of the Stash for the given driver.
     *
     * @param { 'local' | 'session' } driver
     *
     * @returns { typeof LocalStorage | typeof SessionStorage }
     *
     * @throws { Error }
     */
    static driver(driver: 'local' | 'session' | 'cookie'): typeof LocalStorage | typeof SessionStorage | typeof Cookie {
        switch (driver) {
            case 'local':
                return this.local();

            case 'session':
                return this.session();

            case 'cookie':
                return this.cookie();

            default:
                throw new Error('Unsupported driver.');
        }
    }

    /**
     * Creates a new instance of the Local Storage.
     *
     * @returns { typeof LocalStorage }
     */
    static local(): typeof LocalStorage {
        return LocalStorage;
    }

    /**
     * Creates a new instance of the Session Storage.
     *
     * @returns { typeof SessionStorage }
     */
    static session(): typeof SessionStorage {
        return SessionStorage;
    }

    /**
     * Creates a new instance of the Cookie.
     *
     * @returns { typeof Cookie }
     */
    static cookie(): typeof Cookie {
        return Cookie;
    }
}

if (typeof globalThis !== 'undefined') {
    (globalThis as any).Stash = Stash;
    (globalThis as any).LocalStorage = LocalStorage;
    (globalThis as any).SessionStorage = SessionStorage;
    (globalThis as any).Cookie = Cookie;
}

if (typeof globalThis !== 'undefined') {
    (globalThis as any).Stash = Stash;
    (globalThis as any).LocalStorage = LocalStorage;
    (globalThis as any).SessionStorage = SessionStorage;
    (globalThis as any).Cookie = Cookie;
}