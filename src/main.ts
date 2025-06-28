import { LocalStorage } from '@bjnstnkvc/local-storage';
import { SessionStorage } from '@bjnstnkvc/session-storage';

class Stash {
    /**
     * Returns the LocalStorage class instance.
     *
     * @param { 'local' } driver
     *
     * @returns { typeof LocalStorage }
     */
    static driver(driver: 'local'): typeof LocalStorage;

    /**
     * Returns the SessionStorage class instance.
     *
     * @param { 'session' } driver
     *
     * @returns { typeof SessionStorage }
     */
    static driver(driver: 'session'): typeof SessionStorage;

    /**
     * Creates a new instance of the Stash for the given driver.
     *
     * @param { 'local' | 'session' } driver
     *
     * @returns { typeof LocalStorage | typeof SessionStorage }
     *
     * @throws { Error }
     */
    static driver(driver: 'local' | 'session'): typeof LocalStorage | typeof SessionStorage {
        switch (driver) {
            case 'local':
                return LocalStorage;

            case 'session':
                return SessionStorage;

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
}

if (typeof exports != 'undefined') {
    module.exports.Stash = Stash;
}

// Hack to test this code, global is not available in the browser.
if (typeof global !== 'undefined') {
    const _global: any = global;

    _global.Stash = Stash;
}