import { LocalStorage } from '@bjnstnkvc/local-storage';
import { SessionStorage } from '@bjnstnkvc/session-storage';
class Stash {
    /**
     * Creates a new instance of the Stash for the given driver.
     *
     * @param { 'local' | 'session' } driver
     *
     * @returns { typeof LocalStorage | typeof SessionStorage }
     *
     * @throws { Error }
     */
    static driver(driver) {
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
    static local() {
        return LocalStorage;
    }
    /**
     * Creates a new instance of the Session Storage.
     *
     * @returns { typeof SessionStorage }
     */
    static session() {
        return SessionStorage;
    }
}
if (typeof exports != 'undefined') {
    module.exports.Stash = Stash;
}
// Hack to test this code, global is not available in the browser.
if (typeof global !== 'undefined') {
    const _global = global;
    _global.Stash = Stash;
}
//# sourceMappingURL=main.js.map