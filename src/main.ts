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
    static driver(driver: 'local' | 'session'): LocalStorage | SessionStorage {
        switch(driver) {
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
	static local(): LocalStorage {
		return new LocalStorage();
	}
	
	/**
	 * Creates a new instance of the Session Storage.
	 *
	 * @returns { SessionStorage }
	 */
	static session(): SessionStorage {
		return new SessionStorage();
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