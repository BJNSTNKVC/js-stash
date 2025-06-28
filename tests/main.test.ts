// @ts-nocheck
require('../src/main');

class Storage {
    /**
     * Create a new Storage object.
     */
    constructor() {
        this.store = {};
    }

    /**
     * Returns an integer representing the number of data items stored in the Storage object.
     *
     * @return { number }
     */
    get length(): number {
        return Object.keys(this.store).length;
    }

    /**
     * When passed a key name, will return that key's value.
     *
     * @param { string } keyName
     * @return { any }
     */
    getItem(keyName: string): string {
        return this.store[keyName] || null;
    }

    /**
     * When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
     *
     * @param { string } keyName
     * @param { string } keyValue
     */
    setItem(keyName: string, keyValue: string) {
        this.store[keyName] = keyValue;
    }

    /**
     * When passed a key name, will remove that key from the storage.
     *
     * @param { string } keyName
     */
    removeItem(keyName: string) {
        delete this.store[keyName];
    }

    /**
     * When invoked, will empty all keys out of the storage.
     */
    clear() {
        this.store = {};
    }
}

const _global: any = global;

_global.localStorage = new Storage;
_global.sessionStorage = new Storage;

beforeEach((): void => {
    localStorage.clear();
    sessionStorage.clear();
});

describe('Stash.driver', (): void => {
    test('returns instance of LocalStorage when driver is "local"', (): void => {
        expect(Stash.driver('local')).toBe(LocalStorage);
    });

    test('returns instance of SessionStorage when driver is "session"', (): void => {
        expect(Stash.driver('session')).toBe(SessionStorage);
    });

    test('throws error if driver is not supported', (): void => {
        expect((): any => Stash.driver('test')).toThrow('Unsupported driver.');
    });
});

describe('Stash.local', (): void => {
    test('returns instance of LocalStorage', (): void => {
        expect(Stash.local()).toBe(LocalStorage);
    });

    test('can call underlying LocalStorage methods', (): void => {
        const local: typeof LocalStorage = Stash.local();
        const key: string = '$key';
        const value: string = '$value';

        local.set(key, value);

        expect(local.get(key)).toBe(value);
    });
});

describe('Stash.session', (): void => {
    test('returns instance of SessionStorage', (): void => {
        expect(Stash.session()).toBe(SessionStorage);
    });

    test('can call underlying SessionStorage methods', (): void => {
        const session: typeof SessionStorage = Stash.session();
        const key: string = '$key';
        const value: string = '$value';

        session.set(key, value);

        expect(session.get(key)).toBe(value);
    });
});
