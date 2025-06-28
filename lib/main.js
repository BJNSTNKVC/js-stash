import { LocalStorage } from '@bjnstnkvc/local-storage';
import { SessionStorage } from '@bjnstnkvc/session-storage';
class Stash {
    /**
     * Creates a new instance of the Stash for the given driver.
     *
     * @param { 'local' | 'session' } driver
     *
     * @returns { LocalStorage | SessionStorage }
     *
     * @throws { Error }
     */
    static driver(driver) {
        switch (driver) {
            case 'local': {
                return Stash.local();
            }
            case 'session': {
                return Stash.session();
            }
            default: {
                throw new Error('Unsupported driver.');
            }
        }
    }
    /**
     * Creates a new instance of the Local Storage.
     *
     * @returns { LocalStorage }
     */
    static local() {
        return new LocalStorage();
    }
    /**
     * Creates a new instance of the Session Storage.
     *
     * @returns { SessionStorage }
     */
    static session() {
        return new SessionStorage();
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