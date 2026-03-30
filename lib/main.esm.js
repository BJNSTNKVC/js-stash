/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __classPrivateFieldGet$2(receiver, state, kind, f) {
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet$2(receiver, state, value, kind, f) {
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (f ? f.value = value : state.set(receiver, value)), value;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var _LocalStorageFake_used, _LocalStorageFake_quota;
class LocalStorageFake {
    /**
     * Create a new Storage instance.
     */
    constructor() {
        /**
         * Current used storage in bytes.
         *
         * @type { number }
         */
        _LocalStorageFake_used.set(this, 0);
        /**
         * Maximum storage quota (5MB for most modern browsers).
         *
         * @type { number }
         */
        _LocalStorageFake_quota.set(this, 5 * 1024 * 1024);
        __classPrivateFieldSet$2(this, _LocalStorageFake_used, this.space());
    }
    /**
     * Returns an integer representing the number of data items stored in the Storage object.
     *
     * @return { number }
     */
    get length() {
        return Object.keys(this).length;
    }
    /**
     * When passed a key name, will return that key's value.
     *
     * @param { string } keyName
     *
     * @return { any }
     */
    getItem(keyName) {
        return this[keyName] || null;
    }
    /**
     * When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
     *
     * @param { string } keyName
     * @param { string } keyValue
     *
     * @return { void }
     */
    setItem(keyName, keyValue) {
        const value = String(keyValue);
        if (this.exceeded(keyName, value)) {
            this.throw(keyName);
        }
        this[keyName] = value;
        __classPrivateFieldSet$2(this, _LocalStorageFake_used, this.space());
    }
    /**
     * When passed a key name, will remove that key from the storage.
     *
     * @param { string } keyName
     *
     * @return { void }
     */
    removeItem(keyName) {
        delete this[keyName];
        __classPrivateFieldSet$2(this, _LocalStorageFake_used, this.space());
    }
    /**
     * When invoked, will empty all keys out of the storage.
     *
     * @return { void }
     */
    clear() {
        for (const key of Object.keys(this)) {
            delete this[key];
        }
        __classPrivateFieldSet$2(this, _LocalStorageFake_used, this.space());
    }
    /**
     * When passed a number n, returns the name of the nth key in a given Storage object.
     *
     * @param { number } index
     *
     * @return { string | null }
     */
    key(index) {
        var _a;
        return (_a = Object.keys(this)[index]) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Calculate current used storage space in bytes.
     *
     * @return { number }
     */
    space() {
        __classPrivateFieldSet$2(this, _LocalStorageFake_used, 0);
        for (const key of Object.keys(this)) {
            __classPrivateFieldSet$2(this, _LocalStorageFake_used, __classPrivateFieldGet$2(this, _LocalStorageFake_used, "f") + this.size(key, this[key]));
        }
        return __classPrivateFieldGet$2(this, _LocalStorageFake_used, "f");
    }
    /**
     * Calculate the size a new item would take in bytes.
     *
     * @param { string } keyName
     * @param { string } keyValue
     *
     * @return { number }
     */
    size(keyName, keyValue) {
        return new Blob([keyName, keyValue]).size;
    }
    /**
     * Determine if the Storage quota is exceeded.
     *
     * @param { string } keyName
     * @param { string } keyValue
     *
     * @return { boolean }
     */
    exceeded(keyName, keyValue) {
        return this.size(keyName, keyValue) + __classPrivateFieldGet$2(this, _LocalStorageFake_used, "f") > __classPrivateFieldGet$2(this, _LocalStorageFake_quota, "f");
    }
    /**
     * Throws an error in case the Storage quota is exceeded.
     *
     * @param { string } keyName
     *
     * @return { void }
     */
    throw(keyName) {
        throw new DOMException(`Failed to execute 'setItem' on 'Storage': Setting the value of '${keyName}' exceeded the quota.`, 'QuotaExceededError');
    }
}
_LocalStorageFake_used = new WeakMap(), _LocalStorageFake_quota = new WeakMap();

var _StorageFlushing_key$2;
let StorageFlushing$2 = class StorageFlushing extends Event {
    /**
     * Create a new Storage Flushing Event instance.
     */
    constructor() {
        super('local-storage:flushing');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _StorageFlushing_key$2.set(this, void 0);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$2(this, _StorageFlushing_key$2, "f");
    }
};
_StorageFlushing_key$2 = new WeakMap();

var _StorageFlushed_key$2;
let StorageFlushed$2 = class StorageFlushed extends Event {
    /**
     * Create a new Storage Flushed Event instance.
     */
    constructor() {
        super('local-storage:flushed');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _StorageFlushed_key$2.set(this, void 0);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$2(this, _StorageFlushed_key$2, "f");
    }
};
_StorageFlushed_key$2 = new WeakMap();

var _RetrievingKey_key$2;
let RetrievingKey$2 = class RetrievingKey extends Event {
    /**
     * Create a new Retrieving Key Event instance.
     *
     * @param { string } key
     */
    constructor(key) {
        super('local-storage:retrieving');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _RetrievingKey_key$2.set(this, void 0);
        __classPrivateFieldSet$2(this, _RetrievingKey_key$2, key);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$2(this, _RetrievingKey_key$2, "f");
    }
};
_RetrievingKey_key$2 = new WeakMap();

var _KeyHit_key$2, _KeyHit_value$2;
let KeyHit$2 = class KeyHit extends Event {
    /**
     * Create a new Key Hit Event instance.
     *
     * @param { string } key
     * @param { string } value
     */
    constructor(key, value) {
        super('local-storage:hit');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyHit_key$2.set(this, void 0);
        /**
         * The value of the key.
         *
         * @type { string }
         */
        _KeyHit_value$2.set(this, void 0);
        __classPrivateFieldSet$2(this, _KeyHit_key$2, key);
        __classPrivateFieldSet$2(this, _KeyHit_value$2, value);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$2(this, _KeyHit_key$2, "f");
    }
    /**
     * Get the value of the key.
     *
     * @return { * }
     */
    get value() {
        return __classPrivateFieldGet$2(this, _KeyHit_value$2, "f");
    }
};
_KeyHit_key$2 = new WeakMap(), _KeyHit_value$2 = new WeakMap();

var _KeyMissed_key$2;
let KeyMissed$2 = class KeyMissed extends Event {
    /**
     * Create a new Key Missed Event instance.
     *
     * @param { string } key
     */
    constructor(key) {
        super('local-storage:missed');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyMissed_key$2.set(this, void 0);
        __classPrivateFieldSet$2(this, _KeyMissed_key$2, key);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$2(this, _KeyMissed_key$2, "f");
    }
};
_KeyMissed_key$2 = new WeakMap();

var _KeyWriteFailed_key$2, _KeyWriteFailed_value$2, _KeyWriteFailed_expiry$1;
let KeyWriteFailed$2 = class KeyWriteFailed extends Event {
    /**
     * Create a new Key Write Failed Event instance.
     *
     * @param { string } key
     * @param { string } value
     * @param { number | null } expiry
     */
    constructor(key, value, expiry = null) {
        super('local-storage:write-failed');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyWriteFailed_key$2.set(this, void 0);
        /**
         * The value of the key.
         *
         * @type { string }
         */
        _KeyWriteFailed_value$2.set(this, void 0);
        /**
         * The validity period in seconds since Unix Epoch.
         *
         * @type { number | number }
         */
        _KeyWriteFailed_expiry$1.set(this, void 0);
        __classPrivateFieldSet$2(this, _KeyWriteFailed_key$2, key);
        __classPrivateFieldSet$2(this, _KeyWriteFailed_value$2, value);
        __classPrivateFieldSet$2(this, _KeyWriteFailed_expiry$1, expiry);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$2(this, _KeyWriteFailed_key$2, "f");
    }
    /**
     * Get the value of the key.
     *
     * @return { * }
     */
    get value() {
        return __classPrivateFieldGet$2(this, _KeyWriteFailed_value$2, "f");
    }
    /**
     * Get the validity period in milliseconds since Unix Epoch.
     *
     * @return { number | null }
     */
    get expiry() {
        return __classPrivateFieldGet$2(this, _KeyWriteFailed_expiry$1, "f");
    }
};
_KeyWriteFailed_key$2 = new WeakMap(), _KeyWriteFailed_value$2 = new WeakMap(), _KeyWriteFailed_expiry$1 = new WeakMap();

var _KeyWritten_key$2, _KeyWritten_value$2, _KeyWritten_expiry$1;
let KeyWritten$2 = class KeyWritten extends Event {
    /**
     * Create a new Key Written Event instance.
     *
     * @param { string } key
     * @param { string } value
     * @param { number | null} expiry
     */
    constructor(key, value, expiry = null) {
        super('local-storage:written');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyWritten_key$2.set(this, void 0);
        /**
         * The value of the key.
         *
         * @type { string }
         */
        _KeyWritten_value$2.set(this, void 0);
        /**
         * The validity period in seconds since Unix Epoch.
         *
         * @type { number | number }
         */
        _KeyWritten_expiry$1.set(this, void 0);
        __classPrivateFieldSet$2(this, _KeyWritten_key$2, key);
        __classPrivateFieldSet$2(this, _KeyWritten_value$2, value);
        __classPrivateFieldSet$2(this, _KeyWritten_expiry$1, expiry);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$2(this, _KeyWritten_key$2, "f");
    }
    /**
     * Get the value of the key.
     *
     * @return { * }
     */
    get value() {
        return __classPrivateFieldGet$2(this, _KeyWritten_value$2, "f");
    }
    /**
     * Get the validity period in milliseconds since Unix Epoch.
     *
     * @return { number | null }
     */
    get expiry() {
        return __classPrivateFieldGet$2(this, _KeyWritten_expiry$1, "f");
    }
};
_KeyWritten_key$2 = new WeakMap(), _KeyWritten_value$2 = new WeakMap(), _KeyWritten_expiry$1 = new WeakMap();

var _WritingKey_key$2, _WritingKey_value$2, _WritingKey_expiry$1;
let WritingKey$2 = class WritingKey extends Event {
    /**
     * Create a new Writing Key Event instance.
     *
     * @param { string } key
     * @param { string } value
     * @param { number | null} expiry
     */
    constructor(key, value, expiry = null) {
        super('local-storage:writing');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _WritingKey_key$2.set(this, void 0);
        /**
         * The value of the key.
         *
         * @type { string }
         */
        _WritingKey_value$2.set(this, void 0);
        /**
         * The validity period in seconds since Unix Epoch.
         *
         * @type { number | number }
         */
        _WritingKey_expiry$1.set(this, void 0);
        __classPrivateFieldSet$2(this, _WritingKey_key$2, key);
        __classPrivateFieldSet$2(this, _WritingKey_value$2, value);
        __classPrivateFieldSet$2(this, _WritingKey_expiry$1, expiry);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$2(this, _WritingKey_key$2, "f");
    }
    /**
     * Get the value of the key.
     *
     * @return { * }
     */
    get value() {
        return __classPrivateFieldGet$2(this, _WritingKey_value$2, "f");
    }
    /**
     * Get the validity period in milliseconds since Unix Epoch.
     *
     * @return { number | null }
     */
    get expiry() {
        return __classPrivateFieldGet$2(this, _WritingKey_expiry$1, "f");
    }
};
_WritingKey_key$2 = new WeakMap(), _WritingKey_value$2 = new WeakMap(), _WritingKey_expiry$1 = new WeakMap();

var _KeyForgotten_key$2;
let KeyForgotten$2 = class KeyForgotten extends Event {
    /**
     * Create a new Key Forgotten Event instance.
     *
     * @param { string } key
     */
    constructor(key) {
        super('local-storage:forgot');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyForgotten_key$2.set(this, void 0);
        __classPrivateFieldSet$2(this, _KeyForgotten_key$2, key);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$2(this, _KeyForgotten_key$2, "f");
    }
};
_KeyForgotten_key$2 = new WeakMap();

var _KeyForgotFailed_key$2;
let KeyForgotFailed$2 = class KeyForgotFailed extends Event {
    /**
     * Create a new Key Forgot Failed Event instance.
     *
     * @param { string } key
     */
    constructor(key) {
        super('local-storage:forgot-failed');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyForgotFailed_key$2.set(this, void 0);
        __classPrivateFieldSet$2(this, _KeyForgotFailed_key$2, key);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$2(this, _KeyForgotFailed_key$2, "f");
    }
};
_KeyForgotFailed_key$2 = new WeakMap();

var _a$2, _LocalStorage_storage, _LocalStorage_ttl;
class LocalStorage {
    /**
     * Set the default item validity period in seconds.
     *
     * @param { number | null } value
     *
     * @return { void }
     */
    static ttl(value) {
        __classPrivateFieldSet$2(this, _a$2, value, "f", _LocalStorage_ttl);
    }
    /**
     * Set the key to the Storage object.
     *
     * @param { string } key
     * @param { * } value
     * @param { number | null } ttl
     *
     * @return { boolean }
     */
    static set(key, value, ttl = null) {
        ttl = ttl !== null && ttl !== void 0 ? ttl : __classPrivateFieldGet$2(this, _a$2, "f", _LocalStorage_ttl);
        const item = {
            data: typeof value === 'function' ? value() : value,
            expiry: ttl ? Date.now() + ttl * 1000 : null
        };
        this.emit(new WritingKey$2(key, item.data, item.expiry));
        try {
            __classPrivateFieldGet$2(this, _a$2, "f", _LocalStorage_storage).setItem(key, JSON.stringify(item));
            this.emit(new KeyWritten$2(key, item.data, item.expiry));
        }
        catch (_b) {
            this.emit(new KeyWriteFailed$2(key, item.data, item.expiry));
            return false;
        }
        return true;
    }
    /**
     * Get the key from the Storage object.
     *
     * @param { string } key
     * @param { string | Function | null } fallback
     *
     * @return { * }
     */
    static get(key, fallback = null) {
        var _b;
        this.emit(new RetrievingKey$2(key));
        const storageItem = __classPrivateFieldGet$2(this, _a$2, "f", _LocalStorage_storage).getItem(key);
        if (storageItem === null) {
            this.emit(new KeyMissed$2(key));
            return typeof fallback === 'function' ? fallback() : fallback;
        }
        let value;
        try {
            const item = JSON.parse(storageItem);
            if (item.expiry && Date.now() > item.expiry) {
                this.remove(key);
                return null;
            }
            value = (_b = item.data) !== null && _b !== void 0 ? _b : item;
        }
        catch (_c) {
            value = storageItem;
        }
        this.emit(new KeyHit$2(key, value));
        return value;
    }
    /**
     * Get the key from the Storage, or execute the given callback and store the result.
     *
     * @param { string } key
     * @param { Function } callback
     * @param { number | null } ttl
     *
     * @return { any }
     */
    static remember(key, callback, ttl = null) {
        const item = this.get(key);
        if (item === null) {
            this.set(key, callback, ttl !== null && ttl !== void 0 ? ttl : __classPrivateFieldGet$2(this, _a$2, "f", _LocalStorage_ttl));
        }
        return item !== null && item !== void 0 ? item : this.get(key);
    }
    /**
     * Retrieves all items from the Storage object.
     *
     * @return { { key: string, value: any }[] }
     */
    static all() {
        return this.keys().map((key) => {
            return { key, value: this.get(key) };
        });
    }
    /**
     * Remove the key from the Storage object.
     *
     * @param { string } key
     *
     * @return { boolean }
     */
    static remove(key) {
        if (this.has(key)) {
            __classPrivateFieldGet$2(this, _a$2, "f", _LocalStorage_storage).removeItem(key);
            this.emit(new KeyForgotten$2(key));
            return true;
        }
        else {
            this.emit(new KeyForgotFailed$2(key));
            return false;
        }
    }
    /**
     * Clear all keys stored in a given Storage object.
     *
     * @return { void }
     */
    static clear() {
        this.emit(new StorageFlushing$2());
        __classPrivateFieldGet$2(this, _a$2, "f", _LocalStorage_storage).clear();
        this.emit(new StorageFlushed$2());
    }
    /**
     * Determine if the key exists in the Storage object.
     *
     * @param { string } key
     *
     * @return { boolean }
     */
    static has(key) {
        return !!this.get(key);
    }
    /**
     * Determine if the key does not exist in the Storage object.
     *
     * @param { string } key
     *
     * @return { boolean }
     */
    static missing(key) {
        return !this.has(key);
    }
    /**
     * Determine if any of the keys exists in the Storage object.
     *
     * @param { string | string[] } keys
     *
     * @return { boolean }
     */
    static hasAny(...keys) {
        return keys.flat().some((key) => this.has(key));
    }
    /**
     * Determine if the Storage object is empty.
     *
     * @return { boolean }
     */
    static isEmpty() {
        return __classPrivateFieldGet$2(this, _a$2, "f", _LocalStorage_storage).length === 0;
    }
    /**
     * Determine if the Storage object is not empty.
     *
     * @return { boolean }
     */
    static isNotEmpty() {
        return !this.isEmpty();
    }
    /**
     * Retrieves all keys from the Storage object.
     *
     * @return { string[] }
     */
    static keys() {
        return Object.keys(__classPrivateFieldGet$2(this, _a$2, "f", _LocalStorage_storage));
    }
    /**
     * Returns the total number of items in the Storage object.
     *
     * @return { number }
     */
    static count() {
        return __classPrivateFieldGet$2(this, _a$2, "f", _LocalStorage_storage).length;
    }
    /**
     * Updates the item expiration time.
     *
     * @param { string } key
     * @param { number | null } ttl
     *
     * @return { boolean }
     */
    static touch(key, ttl = null) {
        const item = this.get(key);
        if (item === null) {
            return false;
        }
        return this.set(key, item, ttl !== null && ttl !== void 0 ? ttl : __classPrivateFieldGet$2(this, _a$2, "f", _LocalStorage_ttl));
    }
    /**
     * Returns the expiration date for a given key.
     *
     * @param { string } key
     *
     * @return { Date | null }
     */
    static expiry(key) {
        const storageItem = __classPrivateFieldGet$2(this, _a$2, "f", _LocalStorage_storage).getItem(key);
        if (storageItem === null) {
            return null;
        }
        try {
            const item = JSON.parse(storageItem);
            if (item === null || item.expiry === undefined || item.expiry === null) {
                return null;
            }
            return new Date(item.expiry);
        }
        catch (_b) {
            return null;
        }
    }
    /**
     * Dump the key from the Storage object.
     *
     * @param { string } key
     */
    static dump(key) {
        console.log(this.get(key));
    }
    /**
     * Replace the Local Storage instance with a fake.
     *
     * @return { void }
     */
    static fake() {
        __classPrivateFieldSet$2(this, _a$2, new LocalStorageFake(), "f", _LocalStorage_storage);
    }
    /**
     * Restore the Local Storage instance.
     *
     * @return { void }
     */
    static restore() {
        __classPrivateFieldSet$2(this, _a$2, localStorage, "f", _LocalStorage_storage);
    }
    /**
     * Determines whether a "fake" has been set as the Local Storage instance.
     *
     * @return { boolean }
     */
    static isFake() {
        return __classPrivateFieldGet$2(this, _a$2, "f", _LocalStorage_storage) instanceof LocalStorageFake;
    }
    static listen(events, listener = null) {
        events = typeof events === 'string' ? { [events]: listener } : events;
        for (const [event, listener] of Object.entries(events)) {
            addEventListener(`local-storage:${event}`, listener, { once: true });
        }
    }
    /**
     * Register a listener on "retrieving" event.
     *
     * @param { (event: RetrievingKey) => void } listener
     *
     * @return { void }
     */
    static onRetrieving(listener) {
        this.listen('retrieving', listener);
    }
    /**
     * Register a listener on "hit" event.
     *
     * @param { (event: KeyHit) => void } listener
     *
     * @return { void }
     */
    static onHit(listener) {
        this.listen('hit', listener);
    }
    /**
     * Register a listener on "missed" event.
     *
     * @param { (event: KeyMissed) => void } listener
     *
     * @return { void }
     */
    static onMissed(listener) {
        this.listen('missed', listener);
    }
    /**
     * Register a listener on "writing" event.
     *
     * @param { (event: WritingKey) => void } listener
     *
     * @return { void }
     */
    static onWriting(listener) {
        this.listen('writing', listener);
    }
    /**
     * Register a listener on "written" event.
     *
     * @param { (event: KeyWritten) => void } listener
     *
     * @return { void }
     */
    static onWritten(listener) {
        this.listen('written', listener);
    }
    /**
     * Register a listener on "failed" event.
     *
     * @param { (event: KeyWriteFailed) => void } listener
     *
     * @return { void }
     */
    static onWriteFailed(listener) {
        this.listen('write-failed', listener);
    }
    /**
     * Register a listener on "forgot" event.
     *
     * @param { (event: KeyForgotten) => void } listener
     *
     * @return { void }
     */
    static onForgot(listener) {
        this.listen('forgot', listener);
    }
    /**
     * Register a listener on "forgot-failed" event.
     *
     * @param { (event: KeyForgotFailed) => void } listener
     *
     * @return { void }
     */
    static onForgotFailed(listener) {
        this.listen('forgot-failed', listener);
    }
    /**
     * Register a listener on "flushing" event.
     *
     * @param { (event: StorageFlushing) => void } listener
     *
     * @return { void }
     */
    static onFlushing(listener) {
        this.listen('flushing', listener);
    }
    /**
     * Register a listener on "flushed" event.
     *
     * @param { (event: StorageFlushed) => void } listener
     *
     * @return { void }
     */
    static onFlushed(listener) {
        this.listen('flushed', listener);
    }
    /**
     * Emit an event for the Local Storage instance.
     *
     * @template { keyof LocalStorageEvents } K
     *
     * @param { LocalStorageEvent[K] } event
     *
     * @returns { void }
     */
    static emit(event) {
        dispatchEvent(event);
    }
}
_a$2 = LocalStorage;
/**
 * Current Storage instance.
 *
 * @type { Storage }
 */
_LocalStorage_storage = { value: localStorage };
/**
 * Item validity period in seconds.
 *
 * @type { number | null }
 */
_LocalStorage_ttl = { value: null };

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __classPrivateFieldGet$1(receiver, state, kind, f) {
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet$1(receiver, state, value, kind, f) {
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (f ? f.value = value : state.set(receiver, value)), value;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var _SessionStorageFake_used, _SessionStorageFake_quota;
class SessionStorageFake {
    /**
     * Create a new Storage instance.
     */
    constructor() {
        /**
         * Current used storage in bytes.
         *
         * @type { number }
         */
        _SessionStorageFake_used.set(this, 0);
        /**
         * Maximum storage quota (5MB for most modern browsers).
         *
         * @type { number }
         */
        _SessionStorageFake_quota.set(this, 5 * 1024 * 1024);
        __classPrivateFieldSet$1(this, _SessionStorageFake_used, this.space());
    }
    /**
     * Returns an integer representing the number of data items stored in the Storage object.
     *
     * @return { number }
     */
    get length() {
        return Object.keys(this).length;
    }
    /**
     * When passed a key name, will return that key's value.
     *
     * @param { string } keyName
     *
     * @return { any }
     */
    getItem(keyName) {
        return this[keyName] || null;
    }
    /**
     * When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
     *
     * @param { string } keyName
     * @param { string } keyValue
     *
     * @return { void }
     */
    setItem(keyName, keyValue) {
        const value = String(keyValue);
        if (this.exceeded(keyName, value)) {
            this.throw(keyName);
        }
        this[keyName] = value;
        __classPrivateFieldSet$1(this, _SessionStorageFake_used, this.space());
    }
    /**
     * When passed a key name, will remove that key from the storage.
     *
     * @param { string } keyName
     *
     * @return { void }
     */
    removeItem(keyName) {
        delete this[keyName];
        __classPrivateFieldSet$1(this, _SessionStorageFake_used, this.space());
    }
    /**
     * When invoked, will empty all keys out of the storage.
     *
     * @return { void }
     */
    clear() {
        for (const key of Object.keys(this)) {
            delete this[key];
        }
        __classPrivateFieldSet$1(this, _SessionStorageFake_used, this.space());
    }
    /**
     * When passed a number n, returns the name of the nth key in a given Storage object.
     *
     * @param { number } index
     *
     * @return { string | null }
     */
    key(index) {
        var _a;
        return (_a = Object.keys(this)[index]) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Calculate current used storage space in bytes.
     *
     * @return { number }
     */
    space() {
        __classPrivateFieldSet$1(this, _SessionStorageFake_used, 0);
        for (const key of Object.keys(this)) {
            __classPrivateFieldSet$1(this, _SessionStorageFake_used, __classPrivateFieldGet$1(this, _SessionStorageFake_used, "f") + this.size(key, this[key]));
        }
        return __classPrivateFieldGet$1(this, _SessionStorageFake_used, "f");
    }
    /**
     * Calculate the size a new item would take in bytes.
     *
     * @param { string } keyName
     * @param { string } keyValue
     *
     * @return { number }
     */
    size(keyName, keyValue) {
        return new Blob([keyName, keyValue]).size;
    }
    /**
     * Determine if the Storage quota is exceeded.
     *
     * @param { string } keyName
     * @param { string } keyValue
     *
     * @return { boolean }
     */
    exceeded(keyName, keyValue) {
        return this.size(keyName, keyValue) + __classPrivateFieldGet$1(this, _SessionStorageFake_used, "f") > __classPrivateFieldGet$1(this, _SessionStorageFake_quota, "f");
    }
    /**
     * Throws an error in case the Storage quota is exceeded.
     *
     * @param { string } keyName
     *
     * @return { void }
     */
    throw(keyName) {
        throw new DOMException(`Failed to execute 'setItem' on 'Storage': Setting the value of '${keyName}' exceeded the quota.`, 'QuotaExceededError');
    }
}
_SessionStorageFake_used = new WeakMap(), _SessionStorageFake_quota = new WeakMap();

var _StorageFlushing_key$1;
let StorageFlushing$1 = class StorageFlushing extends Event {
    /**
     * Create a new Storage Flushing Event instance.
     */
    constructor() {
        super('session-storage:flushing');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _StorageFlushing_key$1.set(this, void 0);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$1(this, _StorageFlushing_key$1, "f");
    }
};
_StorageFlushing_key$1 = new WeakMap();

var _StorageFlushed_key$1;
let StorageFlushed$1 = class StorageFlushed extends Event {
    /**
     * Create a new Storage Flushed Event instance.
     */
    constructor() {
        super('session-storage:flushed');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _StorageFlushed_key$1.set(this, void 0);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$1(this, _StorageFlushed_key$1, "f");
    }
};
_StorageFlushed_key$1 = new WeakMap();

var _RetrievingKey_key$1;
let RetrievingKey$1 = class RetrievingKey extends Event {
    /**
     * Create a new Retrieving Key Event instance.
     *
     * @param { string } key
     */
    constructor(key) {
        super('session-storage:retrieving');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _RetrievingKey_key$1.set(this, void 0);
        __classPrivateFieldSet$1(this, _RetrievingKey_key$1, key);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$1(this, _RetrievingKey_key$1, "f");
    }
};
_RetrievingKey_key$1 = new WeakMap();

var _KeyHit_key$1, _KeyHit_value$1;
let KeyHit$1 = class KeyHit extends Event {
    /**
     * Create a new Key Hit Event instance.
     *
     * @param { string } key
     * @param { string } value
     */
    constructor(key, value) {
        super('session-storage:hit');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyHit_key$1.set(this, void 0);
        /**
         * The value of the key.
         *
         * @type { string }
         */
        _KeyHit_value$1.set(this, void 0);
        __classPrivateFieldSet$1(this, _KeyHit_key$1, key);
        __classPrivateFieldSet$1(this, _KeyHit_value$1, value);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$1(this, _KeyHit_key$1, "f");
    }
    /**
     * Get the value of the key.
     *
     * @return { * }
     */
    get value() {
        return __classPrivateFieldGet$1(this, _KeyHit_value$1, "f");
    }
};
_KeyHit_key$1 = new WeakMap(), _KeyHit_value$1 = new WeakMap();

var _KeyMissed_key$1;
let KeyMissed$1 = class KeyMissed extends Event {
    /**
     * Create a new Key Missed Event instance.
     *
     * @param { string } key
     */
    constructor(key) {
        super('session-storage:missed');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyMissed_key$1.set(this, void 0);
        __classPrivateFieldSet$1(this, _KeyMissed_key$1, key);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$1(this, _KeyMissed_key$1, "f");
    }
};
_KeyMissed_key$1 = new WeakMap();

var _KeyWriteFailed_key$1, _KeyWriteFailed_value$1;
let KeyWriteFailed$1 = class KeyWriteFailed extends Event {
    /**
     * Create a new Key Write Failed Event instance.
     *
     * @param { string } key
     * @param { string } value
     */
    constructor(key, value) {
        super('session-storage:write-failed');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyWriteFailed_key$1.set(this, void 0);
        /**
         * The value of the key.
         *
         * @type { string }
         */
        _KeyWriteFailed_value$1.set(this, void 0);
        __classPrivateFieldSet$1(this, _KeyWriteFailed_key$1, key);
        __classPrivateFieldSet$1(this, _KeyWriteFailed_value$1, value);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$1(this, _KeyWriteFailed_key$1, "f");
    }
    /**
     * Get the value of the key.
     *
     * @return { * }
     */
    get value() {
        return __classPrivateFieldGet$1(this, _KeyWriteFailed_value$1, "f");
    }
};
_KeyWriteFailed_key$1 = new WeakMap(), _KeyWriteFailed_value$1 = new WeakMap();

var _KeyWritten_key$1, _KeyWritten_value$1;
let KeyWritten$1 = class KeyWritten extends Event {
    /**
     * Create a new Key Written Event instance.
     *
     * @param { string } key
     * @param { string } value
     */
    constructor(key, value) {
        super('session-storage:written');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyWritten_key$1.set(this, void 0);
        /**
         * The value of the key.
         *
         * @type { string }
         */
        _KeyWritten_value$1.set(this, void 0);
        __classPrivateFieldSet$1(this, _KeyWritten_key$1, key);
        __classPrivateFieldSet$1(this, _KeyWritten_value$1, value);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$1(this, _KeyWritten_key$1, "f");
    }
    /**
     * Get the value of the key.
     *
     * @return { * }
     */
    get value() {
        return __classPrivateFieldGet$1(this, _KeyWritten_value$1, "f");
    }
};
_KeyWritten_key$1 = new WeakMap(), _KeyWritten_value$1 = new WeakMap();

var _WritingKey_key$1, _WritingKey_value$1;
let WritingKey$1 = class WritingKey extends Event {
    /**
     * Create a new Writing Key Event instance.
     *
     * @param { string } key
     * @param { string } value
     */
    constructor(key, value) {
        super('session-storage:writing');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _WritingKey_key$1.set(this, void 0);
        /**
         * The value of the key.
         *
         * @type { string }
         */
        _WritingKey_value$1.set(this, void 0);
        __classPrivateFieldSet$1(this, _WritingKey_key$1, key);
        __classPrivateFieldSet$1(this, _WritingKey_value$1, value);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$1(this, _WritingKey_key$1, "f");
    }
    /**
     * Get the value of the key.
     *
     * @return { * }
     */
    get value() {
        return __classPrivateFieldGet$1(this, _WritingKey_value$1, "f");
    }
};
_WritingKey_key$1 = new WeakMap(), _WritingKey_value$1 = new WeakMap();

var _KeyForgotten_key$1;
let KeyForgotten$1 = class KeyForgotten extends Event {
    /**
     * Create a new Key Forgotten Event instance.
     *
     * @param { string } key
     */
    constructor(key) {
        super('session-storage:forgot');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyForgotten_key$1.set(this, void 0);
        __classPrivateFieldSet$1(this, _KeyForgotten_key$1, key);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$1(this, _KeyForgotten_key$1, "f");
    }
};
_KeyForgotten_key$1 = new WeakMap();

var _KeyForgotFailed_key$1;
let KeyForgotFailed$1 = class KeyForgotFailed extends Event {
    /**
     * Create a new Key Forgot Failed Event instance.
     *
     * @param { string } key
     */
    constructor(key) {
        super('session-storage:forgot-failed');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyForgotFailed_key$1.set(this, void 0);
        __classPrivateFieldSet$1(this, _KeyForgotFailed_key$1, key);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet$1(this, _KeyForgotFailed_key$1, "f");
    }
};
_KeyForgotFailed_key$1 = new WeakMap();

var _a$1, _SessionStorage_storage;
class SessionStorage {
    /**
     * Set the key to the Storage object.
     *
     * @param { string } key
     * @param { * } value
     *
     * @return { boolean }
     */
    static set(key, value) {
        const item = {
            data: typeof value === 'function' ? value() : value,
        };
        this.emit(new WritingKey$1(key, item.data));
        try {
            __classPrivateFieldGet$1(this, _a$1, "f", _SessionStorage_storage).setItem(key, JSON.stringify(item));
            this.emit(new KeyWritten$1(key, item.data));
        }
        catch (_b) {
            this.emit(new KeyWriteFailed$1(key, item.data));
            return false;
        }
        return true;
    }
    /**
     * Get the key from the Storage object.
     *
     * @param { string } key
     * @param { string | Function | null } fallback
     *
     * @return { * }
     */
    static get(key, fallback = null) {
        var _b;
        this.emit(new RetrievingKey$1(key));
        const storageItem = __classPrivateFieldGet$1(this, _a$1, "f", _SessionStorage_storage).getItem(key);
        if (storageItem === null) {
            this.emit(new KeyMissed$1(key));
            return typeof fallback === 'function' ? fallback() : fallback;
        }
        let value;
        try {
            const item = JSON.parse(storageItem);
            value = (_b = item.data) !== null && _b !== void 0 ? _b : item;
        }
        catch (_c) {
            value = storageItem;
        }
        this.emit(new KeyHit$1(key, value));
        return value;
    }
    /**
     * Get the key from the Storage, or execute the given callback and store the result.
     *
     * @param { string } key
     * @param { Function } callback
     *
     * @return { any }
     */
    static remember(key, callback) {
        const item = this.get(key);
        if (item === null) {
            this.set(key, callback);
        }
        return item !== null && item !== void 0 ? item : this.get(key);
    }
    /**
     * Retrieves all items from the Storage object.
     *
     * @return { { key: string, value: any }[] }
     */
    static all() {
        return this.keys().map((key) => {
            return { key, value: this.get(key) };
        });
    }
    /**
     * Remove the key from the Storage object.
     *
     * @param { string } key
     *
     * @return { boolean }
     */
    static remove(key) {
        if (this.has(key)) {
            __classPrivateFieldGet$1(this, _a$1, "f", _SessionStorage_storage).removeItem(key);
            this.emit(new KeyForgotten$1(key));
            return true;
        }
        else {
            this.emit(new KeyForgotFailed$1(key));
            return false;
        }
    }
    /**
     * Clear all keys stored in a given Storage object.
     *
     * @return { void }
     */
    static clear() {
        this.emit(new StorageFlushing$1());
        __classPrivateFieldGet$1(this, _a$1, "f", _SessionStorage_storage).clear();
        this.emit(new StorageFlushed$1());
    }
    /**
     * Determine if the key exists in the Storage object.
     *
     * @param { string } key
     *
     * @return { boolean }
     */
    static has(key) {
        return !!this.get(key);
    }
    /**
     * Determine if the key does not exist in the Storage object.
     *
     * @param { string } key
     *
     * @return { boolean }
     */
    static missing(key) {
        return !this.has(key);
    }
    /**
     * Determine if any of the keys exists in the Storage object.
     *
     * @param { string | string[] } keys
     *
     * @return { boolean }
     */
    static hasAny(...keys) {
        if (keys.length === 1) {
            if (Array.isArray(keys[0])) {
                keys = keys[0];
            }
            else {
                keys = [keys[0]];
            }
        }
        return keys.some((key) => this.has(key));
    }
    /**
     * Determine if the Storage object is empty.
     *
     * @return { boolean }
     */
    static isEmpty() {
        return __classPrivateFieldGet$1(this, _a$1, "f", _SessionStorage_storage).length === 0;
    }
    /**
     * Determine if the Storage object is not empty.
     *
     * @return { boolean }
     */
    static isNotEmpty() {
        return !this.isEmpty();
    }
    /**
     * Retrieves all keys from the Storage object.
     *
     * @return { string[] }
     */
    static keys() {
        return Object.keys(__classPrivateFieldGet$1(this, _a$1, "f", _SessionStorage_storage));
    }
    /**
     * Returns the total number of items in the Storage object.
     *
     * @return { number }
     */
    static count() {
        return __classPrivateFieldGet$1(this, _a$1, "f", _SessionStorage_storage).length;
    }
    /**
     * Dump the key from the Storage object.
     *
     * @param { string } key
     */
    static dump(key) {
        console.log(this.get(key));
    }
    /**
     * Replace the Session Storage instance with a fake.
     *
     * @return { void }
     */
    static fake() {
        __classPrivateFieldSet$1(this, _a$1, new SessionStorageFake(), "f", _SessionStorage_storage);
    }
    /**
     * Restore the Session Storage instance.
     *
     * @return { void }
     */
    static restore() {
        __classPrivateFieldSet$1(this, _a$1, sessionStorage, "f", _SessionStorage_storage);
    }
    /**
     * Determines whether a "fake" has been set as the Session Storage instance.
     *
     * @return { boolean }
     */
    static isFake() {
        return __classPrivateFieldGet$1(this, _a$1, "f", _SessionStorage_storage) instanceof SessionStorageFake;
    }
    static listen(events, listener = null) {
        events = typeof events === 'string' ? { [events]: listener } : events;
        for (const [event, listener] of Object.entries(events)) {
            addEventListener(`session-storage:${event}`, listener, { once: true });
        }
    }
    /**
     * Register a listener on "retrieving" event.
     *
     * @param { (event: RetrievingKey) => void } listener
     *
     * @return { void }
     */
    static onRetrieving(listener) {
        this.listen('retrieving', listener);
    }
    /**
     * Register a listener on "hit" event.
     *
     * @param { (event: KeyHit) => void } listener
     *
     * @return { void }
     */
    static onHit(listener) {
        this.listen('hit', listener);
    }
    /**
     * Register a listener on "missed" event.
     *
     * @param { (event: KeyMissed) => void } listener
     *
     * @return { void }
     */
    static onMissed(listener) {
        this.listen('missed', listener);
    }
    /**
     * Register a listener on "writing" event.
     *
     * @param { (event: WritingKey) => void } listener
     *
     * @return { void }
     */
    static onWriting(listener) {
        this.listen('writing', listener);
    }
    /**
     * Register a listener on "written" event.
     *
     * @param { (event: KeyWritten) => void } listener
     *
     * @return { void }
     */
    static onWritten(listener) {
        this.listen('written', listener);
    }
    /**
     * Register a listener on "failed" event.
     *
     * @param { (event: KeyWriteFailed) => void } listener
     *
     * @return { void }
     */
    static onWriteFailed(listener) {
        this.listen('write-failed', listener);
    }
    /**
     * Register a listener on "forgot" event.
     *
     * @param { (event: KeyForgotten) => void } listener
     *
     * @return { void }
     */
    static onForgot(listener) {
        this.listen('forgot', listener);
    }
    /**
     * Register a listener on "forgot-failed" event.
     *
     * @param { (event: KeyForgotFailed) => void } listener
     *
     * @return { void }
     */
    static onForgotFailed(listener) {
        this.listen('forgot-failed', listener);
    }
    /**
     * Register a listener on "flushing" event.
     *
     * @param { (event: StorageFlushing) => void } listener
     *
     * @return { void }
     */
    static onFlushing(listener) {
        this.listen('flushing', listener);
    }
    /**
     * Register a listener on "flushed" event.
     *
     * @param { (event: StorageFlushed) => void } listener
     *
     * @return { void }
     */
    static onFlushed(listener) {
        this.listen('flushed', listener);
    }
    /**
     * Emit an event for the Session Storage instance.
     *
     * @template { keyof SessionStorageEvents } K
     *
     * @param { SessionStorageEvent[K] } event
     *
     * @returns { void }
     */
    static emit(event) {
        dispatchEvent(event);
    }
}
_a$1 = SessionStorage;
/**
 * Current Storage instance.
 *
 * @type { Storage }
 */
_SessionStorage_storage = { value: sessionStorage };

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (f ? f.value = value : state.set(receiver, value)), value;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var _CookieFake_cookies, _CookieFake_location, _CookieFake_quota;
class CookieFake {
    /**
     * Crete a new Cookie Fake instance.
     *
     * @param { CookieFakeLocation | undefined } location
     */
    constructor(location) {
        /**
         * List of all cookies.
         */
        _CookieFake_cookies.set(this, []);
        /**
         * Location of the Cookie Fake instance.
         */
        _CookieFake_location.set(this, void 0);
        /**
         * Cookie quota in bytes.
         */
        _CookieFake_quota.set(this, 4 * 1024);
        __classPrivateFieldSet(this, _CookieFake_location, location || {
            host: typeof globalThis === 'undefined' ? 'localhost' : globalThis.location.host,
            pathname: typeof globalThis === 'undefined' ? '/' : globalThis.location.pathname
        });
    }
    /**
     * Get all cookies.
     */
    get cookie() {
        let cookies = [];
        const domain = `.${__classPrivateFieldGet(this, _CookieFake_location, "f").host.replace('www.', '')}`;
        const path = __classPrivateFieldGet(this, _CookieFake_location, "f").pathname.replace(/\/$/, '');
        for (const cookie of __classPrivateFieldGet(this, _CookieFake_cookies, "f")) {
            const index = __classPrivateFieldGet(this, _CookieFake_cookies, "f").indexOf(cookie);
            if (cookie.domain !== domain) {
                continue;
            }
            if (cookie.path !== path && cookie.path !== '/') {
                continue;
            }
            if (cookie.expires !== null && Date.parse(cookie.expires) < Date.now()) {
                __classPrivateFieldGet(this, _CookieFake_cookies, "f").splice(index, 1);
                continue;
            }
            cookies.push(cookie.value === null ? cookie.key : `${cookie.key}=${cookie.value}`);
        }
        return cookies.join('; ');
    }
    /**
     * Set a cookie.
     */
    set cookie(cookie) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const keyValue = (_a = cookie.split(';')[0]) !== null && _a !== void 0 ? _a : '';
        if (keyValue === '') {
            return;
        }
        const key = keyValue.split('=')[0];
        const value = (_b = keyValue.split('=')[1]) !== null && _b !== void 0 ? _b : null;
        const ttl = (_d = (_c = cookie.match(/max-age=([^;]*)/i)) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : null;
        let expires = (_f = (_e = cookie.match(/expires=([^;]+)/)) === null || _e === void 0 ? void 0 : _e[1]) !== null && _f !== void 0 ? _f : null;
        const domain = '.' + ((_h = (_g = cookie.match(/domain=([^;]*)/i)) === null || _g === void 0 ? void 0 : _g[1]) !== null && _h !== void 0 ? _h : __classPrivateFieldGet(this, _CookieFake_location, "f").host.replace('www.', ''));
        const path = (_k = (_j = cookie.match(/path=([^;]*)/i)) === null || _j === void 0 ? void 0 : _j[1]) !== null && _k !== void 0 ? _k : __classPrivateFieldGet(this, _CookieFake_location, "f").pathname.replace(/\/$/, '');
        const secure = /secure/i.test(cookie);
        const sameSite = (_m = (_l = cookie.match(/samesite=([^;]*)/i)) === null || _l === void 0 ? void 0 : _l[1]) !== null && _m !== void 0 ? _m : null;
        if (ttl !== null) {
            expires = new Date(Date.now() + ttl * 1000).toUTCString();
        }
        const existing = __classPrivateFieldGet(this, _CookieFake_cookies, "f").findIndex((cookie) => cookie.key === key && cookie.path === path && cookie.domain === domain);
        const expired = expires !== null && Date.parse(expires) < Date.now();
        const data = {
            key,
            value,
            expires,
            domain,
            path,
            secure,
            sameSite,
        };
        if (data.value !== null && this.exceeded(data.value)) {
            return;
        }
        if (existing >= 0) {
            if (expired) {
                __classPrivateFieldGet(this, _CookieFake_cookies, "f").splice(existing, 1);
            }
            else {
                __classPrivateFieldGet(this, _CookieFake_cookies, "f")[existing] = data;
            }
        }
        else {
            __classPrivateFieldGet(this, _CookieFake_cookies, "f").push(data);
        }
    }
    /**
     * Set the new Location of the Cookie Fake instance.
     *
     * @param { CookieFakeLocation } location
     *
     * @return { void }
     */
    location(location) {
        __classPrivateFieldSet(this, _CookieFake_location, location);
    }
    /**
     * Calculate the size a new item would take in bytes.
     *
     * @param { string } cookie
     *
     * @return { number }
     */
    size(cookie) {
        return new Blob([cookie]).size;
    }
    /**
     * Determine if the Storage quota is exceeded.
     *
     * @param { string } cookie
     *
     * @return { boolean }
     */
    exceeded(cookie) {
        return this.size(cookie) >= __classPrivateFieldGet(this, _CookieFake_quota, "f");
    }
}
_CookieFake_cookies = new WeakMap(), _CookieFake_location = new WeakMap(), _CookieFake_quota = new WeakMap();

var _StorageFlushing_key;
class StorageFlushing extends Event {
    /**
     * Create a new Storage Flushing Event instance.
     */
    constructor() {
        super('cookie:flushing');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _StorageFlushing_key.set(this, void 0);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet(this, _StorageFlushing_key, "f");
    }
}
_StorageFlushing_key = new WeakMap();

var _StorageFlushed_key;
class StorageFlushed extends Event {
    /**
     * Create a new Storage Flushed Event instance.
     */
    constructor() {
        super('cookie:flushed');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _StorageFlushed_key.set(this, void 0);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet(this, _StorageFlushed_key, "f");
    }
}
_StorageFlushed_key = new WeakMap();

var _RetrievingKey_key;
class RetrievingKey extends Event {
    /**
     * Create a new Retrieving Key Event instance.
     *
     * @param { string } key
     */
    constructor(key) {
        super('cookie:retrieving');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _RetrievingKey_key.set(this, void 0);
        __classPrivateFieldSet(this, _RetrievingKey_key, key);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet(this, _RetrievingKey_key, "f");
    }
}
_RetrievingKey_key = new WeakMap();

var _KeyHit_key, _KeyHit_value;
class KeyHit extends Event {
    /**
     * Create a new Key Hit Event instance.
     *
     * @param { string } key
     * @param { string } value
     */
    constructor(key, value) {
        super('cookie:hit');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyHit_key.set(this, void 0);
        /**
         * The value of the key.
         *
         * @type { string }
         */
        _KeyHit_value.set(this, void 0);
        __classPrivateFieldSet(this, _KeyHit_key, key);
        __classPrivateFieldSet(this, _KeyHit_value, value);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet(this, _KeyHit_key, "f");
    }
    /**
     * Get the value of the key.
     *
     * @return { * }
     */
    get value() {
        return __classPrivateFieldGet(this, _KeyHit_value, "f");
    }
}
_KeyHit_key = new WeakMap(), _KeyHit_value = new WeakMap();

var _KeyMissed_key;
class KeyMissed extends Event {
    /**
     * Create a new Key Missed Event instance.
     *
     * @param { string } key
     */
    constructor(key) {
        super('cookie:missed');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyMissed_key.set(this, void 0);
        __classPrivateFieldSet(this, _KeyMissed_key, key);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet(this, _KeyMissed_key, "f");
    }
}
_KeyMissed_key = new WeakMap();

var _KeyWriteFailed_key, _KeyWriteFailed_value, _KeyWriteFailed_expiry;
class KeyWriteFailed extends Event {
    /**
     * Create a new Key Write Failed Event instance.
     *
     * @param { string } key
     * @param { string } value
     * @param { number | null } expiry
     */
    constructor(key, value, expiry = null) {
        super('cookie:write-failed');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyWriteFailed_key.set(this, void 0);
        /**
         * The value of the key.
         *
         * @type { string }
         */
        _KeyWriteFailed_value.set(this, void 0);
        /**
         * The validity period in seconds since Unix Epoch.
         *
         * @type { number | number }
         */
        _KeyWriteFailed_expiry.set(this, void 0);
        __classPrivateFieldSet(this, _KeyWriteFailed_key, key);
        __classPrivateFieldSet(this, _KeyWriteFailed_value, value);
        __classPrivateFieldSet(this, _KeyWriteFailed_expiry, expiry);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet(this, _KeyWriteFailed_key, "f");
    }
    /**
     * Get the value of the key.
     *
     * @return { * }
     */
    get value() {
        return __classPrivateFieldGet(this, _KeyWriteFailed_value, "f");
    }
    /**
     * Get the validity period in milliseconds since Unix Epoch.
     *
     * @return { number | null }
     */
    get expiry() {
        return __classPrivateFieldGet(this, _KeyWriteFailed_expiry, "f");
    }
}
_KeyWriteFailed_key = new WeakMap(), _KeyWriteFailed_value = new WeakMap(), _KeyWriteFailed_expiry = new WeakMap();

var _KeyWritten_key, _KeyWritten_value, _KeyWritten_expiry;
class KeyWritten extends Event {
    /**
     * Create a new Key Written Event instance.
     *
     * @param { string } key
     * @param { string } value
     * @param { number | null} expiry
     */
    constructor(key, value, expiry = null) {
        super('cookie:written');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyWritten_key.set(this, void 0);
        /**
         * The value of the key.
         *
         * @type { string }
         */
        _KeyWritten_value.set(this, void 0);
        /**
         * The validity period in seconds since Unix Epoch.
         *
         * @type { number | number }
         */
        _KeyWritten_expiry.set(this, void 0);
        __classPrivateFieldSet(this, _KeyWritten_key, key);
        __classPrivateFieldSet(this, _KeyWritten_value, value);
        __classPrivateFieldSet(this, _KeyWritten_expiry, expiry);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet(this, _KeyWritten_key, "f");
    }
    /**
     * Get the value of the key.
     *
     * @return { * }
     */
    get value() {
        return __classPrivateFieldGet(this, _KeyWritten_value, "f");
    }
    /**
     * Get the validity period in milliseconds since Unix Epoch.
     *
     * @return { number | null }
     */
    get expiry() {
        return __classPrivateFieldGet(this, _KeyWritten_expiry, "f");
    }
}
_KeyWritten_key = new WeakMap(), _KeyWritten_value = new WeakMap(), _KeyWritten_expiry = new WeakMap();

var _WritingKey_key, _WritingKey_value, _WritingKey_expiry;
class WritingKey extends Event {
    /**
     * Create a new Writing Key Event instance.
     *
     * @param { string } key
     * @param { string } value
     * @param { number | null} expiry
     */
    constructor(key, value, expiry = null) {
        super('cookie:writing');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _WritingKey_key.set(this, void 0);
        /**
         * The value of the key.
         *
         * @type { string }
         */
        _WritingKey_value.set(this, void 0);
        /**
         * The validity period in seconds since Unix Epoch.
         *
         * @type { number | number }
         */
        _WritingKey_expiry.set(this, void 0);
        __classPrivateFieldSet(this, _WritingKey_key, key);
        __classPrivateFieldSet(this, _WritingKey_value, value);
        __classPrivateFieldSet(this, _WritingKey_expiry, expiry);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet(this, _WritingKey_key, "f");
    }
    /**
     * Get the value of the key.
     *
     * @return { * }
     */
    get value() {
        return __classPrivateFieldGet(this, _WritingKey_value, "f");
    }
    /**
     * Get the validity period in milliseconds since Unix Epoch.
     *
     * @return { number | null }
     */
    get expiry() {
        return __classPrivateFieldGet(this, _WritingKey_expiry, "f");
    }
}
_WritingKey_key = new WeakMap(), _WritingKey_value = new WeakMap(), _WritingKey_expiry = new WeakMap();

var _KeyForgotten_key;
class KeyForgotten extends Event {
    /**
     * Create a new Key Forgotten Event instance.
     *
     * @param { string } key
     */
    constructor(key) {
        super('cookie:forgot');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyForgotten_key.set(this, void 0);
        __classPrivateFieldSet(this, _KeyForgotten_key, key);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet(this, _KeyForgotten_key, "f");
    }
}
_KeyForgotten_key = new WeakMap();

var _KeyForgotFailed_key;
class KeyForgotFailed extends Event {
    /**
     * Create a new Key Forgot Failed Event instance.
     *
     * @param { string } key
     */
    constructor(key) {
        super('cookie:forgot-failed');
        /**
         * The key of the event.
         *
         * @type { string }
         */
        _KeyForgotFailed_key.set(this, void 0);
        __classPrivateFieldSet(this, _KeyForgotFailed_key, key);
    }
    /**
     * Get the key of the event.
     *
     * @return { string }
     */
    get key() {
        return __classPrivateFieldGet(this, _KeyForgotFailed_key, "f");
    }
}
_KeyForgotFailed_key = new WeakMap();

var _a, _Cookie_document, _Cookie_ttl, _Cookie_stringify, _Cookie_expires;
class Cookie {
    /**
     * Set the default item validity period in seconds.
     *
     * @param { number | null } value
     */
    static ttl(value) {
        __classPrivateFieldSet(this, _a, value, "f", _Cookie_ttl);
    }
    /**
     * Set the key to the Cookie.
     *
     * @param { string } key
     * @param { * } value
     * @param { CookieAttributes } attributes
     *
     * @returns { string }
     */
    static set(key, value, attributes = {}) {
        var _b, _c, _d, _e, _f;
        let cookie = `${key}=${__classPrivateFieldGet(this, _a, "m", _Cookie_stringify).call(this, value)}`;
        (_b = attributes.ttl) !== null && _b !== void 0 ? _b : (attributes.ttl = __classPrivateFieldGet(this, _a, "f", _Cookie_ttl));
        attributes.expires = __classPrivateFieldGet(this, _a, "m", _Cookie_expires).call(this, attributes.expires);
        if (attributes.ttl && !attributes.expires) {
            attributes.expires = new Date(Date.now() + attributes.ttl * 1000);
        }
        if (attributes.expires) {
            cookie += `; expires=${attributes.expires.toUTCString()}`;
        }
        this.emit(new WritingKey(key, value, (_c = attributes.expires) === null || _c === void 0 ? void 0 : _c.getTime()));
        if (attributes.path) {
            cookie += `; path=${attributes.path}`;
        }
        if (attributes.domain) {
            cookie += `; domain=${attributes.domain}`;
        }
        if (attributes.sameSite) {
            cookie += `; SameSite=${attributes.sameSite}`;
        }
        if (attributes.sameSite === 'None' || attributes.secure) {
            cookie += '; Secure';
        }
        if (attributes.sameSite === 'None' && !attributes.secure) {
            this.emit(new KeyWriteFailed(key, value, (_d = attributes.expires) === null || _d === void 0 ? void 0 : _d.getTime()));
            throw new Error('The "secure" attribute must be set to "true" if "sameSite" is set to "None".');
        }
        if (new Blob([value]).size >= 4 * 1024) {
            this.emit(new KeyWriteFailed(key, value, (_e = attributes.expires) === null || _e === void 0 ? void 0 : _e.getTime()));
            throw new Error('The "value" must be less than 4KB.');
        }
        __classPrivateFieldGet(this, _a, "f", _Cookie_document).cookie = cookie;
        this.emit(new KeyWritten(key, value, (_f = attributes.expires) === null || _f === void 0 ? void 0 : _f.getTime()));
        return cookie;
    }
    /**
     * Get the key from the Cookie.
     *
     * @param { string } key
     * @param { * } fallback
     *
     * @returns { * }
     */
    static get(key, fallback = null) {
        this.emit(new RetrievingKey(key));
        const cookies = new RegExp(`(^|; )${(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))}=([^;]*)`).exec(__classPrivateFieldGet(this, _a, "f", _Cookie_document).cookie);
        if (cookies === null) {
            this.emit(new KeyMissed(key));
            return typeof fallback === 'function' ? fallback() : fallback;
        }
        let value;
        const cookie = cookies[2];
        try {
            value = JSON.parse(cookie);
        }
        catch (_b) {
            value = cookie;
        }
        this.emit(new KeyHit(key, value));
        return value;
    }
    /**
     * Get the key from the Cookie, or execute the given callback and store the result.
     *
     * @param { string } key
     * @param { Function } callback
     * @param { object } attributes
     *
     * @return { any }
     */
    static remember(key, callback, attributes = {}) {
        const cookie = this.get(key);
        if (cookie === null) {
            return this.set(key, callback(), attributes);
        }
        return cookie;
    }
    /**
     * Return all items stored in the Cookie.
     *
     * @return { { key: string, value: any }[] }
     */
    static all() {
        if (__classPrivateFieldGet(this, _a, "f", _Cookie_document).cookie === '') {
            return [];
        }
        let cookies = [];
        for (const cookie of __classPrivateFieldGet(this, _a, "f", _Cookie_document).cookie.split('; ')) {
            const key = cookie.split('=')[0];
            cookies.push({ key, value: this.get(key) });
        }
        return cookies;
    }
    /**
     * Removes a key from the cookie.
     *
     * @param { string } key
     * @param { { path?: string } } attributes
     *
     * @return { boolean }
     */
    static remove(key, attributes = {}) {
        if (this.has(key)) {
            this.set(key, '', Object.assign(Object.assign({}, attributes), { expires: new Date(0) }));
            this.emit(new KeyForgotten(key));
            return true;
        }
        else {
            this.emit(new KeyForgotFailed(key));
            return false;
        }
    }
    /**
     * Clear all keys stored in the Cookie.
     *
     * @param { { path?: string } } attributes
     *
     * @return { void }
     */
    static clear(attributes = {}) {
        this.emit(new StorageFlushing());
        for (const cookie of this.all()) {
            this.remove(cookie.key, attributes);
        }
        this.emit(new StorageFlushed());
    }
    /**
     * Determine if the key exists in the Cookie.
     *
     * @param { string } key
     *
     * @return { boolean }
     */
    static has(key) {
        return !!this.get(key);
    }
    /**
     * Determine if the key does not exist in the Cookie.
     *
     * @param { string } key
     *
     * @return { boolean }
     */
    static missing(key) {
        return !this.has(key);
    }
    /**
     * Determine if any of the keys exists in the Cookie.
     *
     * @param { string | string[] } keys
     *
     * @return { boolean }
     */
    static hasAny(...keys) {
        return keys.flat().some((key) => this.has(key));
    }
    /**
     * Determine if the Cookie is empty.
     *
     * @return { boolean }
     */
    static isEmpty() {
        return __classPrivateFieldGet(this, _a, "f", _Cookie_document).cookie.length === 0;
    }
    /**
     * Determine if the Cookie is not empty.
     *
     * @return { boolean }
     */
    static isNotEmpty() {
        return !this.isEmpty();
    }
    /**
     * Retrieves all keys from the Cookie.
     *
     * @return { string[] }
     */
    static keys() {
        return this.all().map((cookie) => cookie.key);
    }
    /**
     * Returns the total number of items in the Cookie.
     *
     * @return { number }
     */
    static count() {
        return this.all().length;
    }
    /**
     * Updates the item expiration time.
     *
     * @param { string } key
     * @param { number | null } ttl
     * @param { { path?: string } } attributes
     *
     * @return { void | string }
     */
    static touch(key, ttl = null, attributes = {}) {
        const cookie = this.get(key);
        if (cookie === null) {
            return;
        }
        return this.set(key, cookie, Object.assign({ ttl: ttl !== null && ttl !== void 0 ? ttl : __classPrivateFieldGet(this, _a, "f", _Cookie_ttl) }, attributes));
    }
    /**
     * Dump the key from the Cookie.
     *
     * @param { string } key
     *
     * @return { void }
     */
    static dump(key) {
        console.log(this.get(key));
    }
    /**
     * Replace the Cookie instance with a fake.
     *
     * @return { void }
     */
    static fake(location) {
        __classPrivateFieldSet(this, _a, new CookieFake(location), "f", _Cookie_document);
    }
    /**
     * Restore the Cookie instance.
     *
     * @return { void }
     */
    static restore() {
        __classPrivateFieldSet(this, _a, document, "f", _Cookie_document);
    }
    /**
     * Determines whether a "fake" has been set as the Cookie instance.
     *
     * @return { boolean }
     */
    static isFake() {
        return __classPrivateFieldGet(this, _a, "f", _Cookie_document) instanceof CookieFake;
    }
    /**
     * Set the new Location of the Cookie Fake instance.
     *
     * @param { CookieFakeLocation } location
     *
     * @return { void }
     */
    static setFakeLocation(location) {
        if (!this.isFake()) {
            throw new Error('Cookie must be faked before setting location.');
        }
        __classPrivateFieldGet(this, _a, "f", _Cookie_document).location(location);
    }
    static listen(events, listener = null) {
        events = typeof events === 'string' ? { [events]: listener } : events;
        for (const [event, listener] of Object.entries(events)) {
            addEventListener(`cookie:${event}`, listener, { once: true });
        }
    }
    /**
     * Register a listener on "retrieving" event.
     *
     * @param { (event: RetrievingKey) => void } listener
     *
     * @return { void }
     */
    static onRetrieving(listener) {
        this.listen('retrieving', listener);
    }
    /**
     * Register a listener on "hit" event.
     *
     * @param { (event: KeyHit) => void } listener
     *
     * @return { void }
     */
    static onHit(listener) {
        this.listen('hit', listener);
    }
    /**
     * Register a listener on "missed" event.
     *
     * @param { (event: KeyMissed) => void } listener
     *
     * @return { void }
     */
    static onMissed(listener) {
        this.listen('missed', listener);
    }
    /**
     * Register a listener on "writing" event.
     *
     * @param { (event: WritingKey) => void } listener
     *
     * @return { void }
     */
    static onWriting(listener) {
        this.listen('writing', listener);
    }
    /**
     * Register a listener on "written" event.
     *
     * @param { (event: KeyWritten) => void } listener
     *
     * @return { void }
     */
    static onWritten(listener) {
        this.listen('written', listener);
    }
    /**
     * Register a listener on "failed" event.
     *
     * @param { (event: KeyWriteFailed) => void } listener
     *
     * @return { void }
     */
    static onWriteFailed(listener) {
        this.listen('write-failed', listener);
    }
    /**
     * Register a listener on "forgot" event.
     *
     * @param { (event: KeyForgotten) => void } listener
     *
     * @return { void }
     */
    static onForgot(listener) {
        this.listen('forgot', listener);
    }
    /**
     * Register a listener on "forgot-failed" event.
     *
     * @param { (event: KeyForgotFailed) => void } listener
     *
     * @return { void }
     */
    static onForgotFailed(listener) {
        this.listen('forgot-failed', listener);
    }
    /**
     * Register a listener on "flushing" event.
     *
     * @param { (event: StorageFlushing) => void } listener
     *
     * @return { void }
     */
    static onFlushing(listener) {
        this.listen('flushing', listener);
    }
    /**
     * Register a listener on "flushed" event.
     *
     * @param { (event: StorageFlushed) => void } listener
     *
     * @return { void }
     */
    static onFlushed(listener) {
        this.listen('flushed', listener);
    }
    /**
     * Emit an event for the Local Storage instance.
     *
     * @template { keyof CookieEvents } K
     *
     * @param { CookieEvent[K] } event
     *
     * @returns { void }
     */
    static emit(event) {
        dispatchEvent(event);
    }
}
_a = Cookie, _Cookie_stringify = function _Cookie_stringify(value) {
    if (value === null || value === undefined) {
        return '';
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return value.toString();
    }
    try {
        return JSON.stringify(value);
    }
    catch (_b) {
        return '';
    }
}, _Cookie_expires = function _Cookie_expires(expires) {
    if (!expires) {
        return undefined;
    }
    if (expires instanceof Date) {
        return expires;
    }
    const date = new Date(expires);
    return Number.isNaN(date.getTime()) ? undefined : date;
};
/**
 * Current Cookie instance.
 *
 * @type { Document | CookieFake }
 */
_Cookie_document = { value: document };
/**
 * Default item validity period in seconds.
 *
 * @type { number | null }
 */
_Cookie_ttl = { value: null };

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
    /**
     * Creates a new instance of the Cookie.
     *
     * @returns { typeof Cookie }
     */
    static cookie() {
        return Cookie;
    }
}
if (typeof globalThis !== 'undefined') {
    globalThis.Stash = Stash;
    globalThis.LocalStorage = LocalStorage;
    globalThis.SessionStorage = SessionStorage;
    globalThis.Cookie = Cookie;
}
if (typeof globalThis !== 'undefined') {
    globalThis.Stash = Stash;
    globalThis.LocalStorage = LocalStorage;
    globalThis.SessionStorage = SessionStorage;
    globalThis.Cookie = Cookie;
}

export { Cookie, LocalStorage, SessionStorage, Stash };
//# sourceMappingURL=main.esm.js.map
