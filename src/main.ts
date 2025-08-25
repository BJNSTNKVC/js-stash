import { LocalStorage } from '@bjnstnkvc/local-storage';
import { SessionStorage } from '@bjnstnkvc/session-storage';
import { Cookie } from '@bjnstnkvc/cookie';

export { LocalStorage, SessionStorage, Cookie };

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

if (typeof window !== 'undefined') {
    (window as any).Stash = Stash;
    (window as any).LocalStorage = LocalStorage;
    (window as any).SessionStorage = SessionStorage;
    (window as any).Cookie = Cookie;
}

if (typeof global !== 'undefined') {
    (global as any).Stash = Stash;
    (global as any).LocalStorage = LocalStorage;
    (global as any).SessionStorage = SessionStorage;
    (global as any).Cookie = Cookie;
}