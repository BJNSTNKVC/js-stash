(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Stash = {}));
})(this, (function (exports) { 'use strict';

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
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var _a$1, _LocalStorage_ttl;
    class LocalStorage {
        /**
         * Set the default item validity period in seconds.
         *
         * @param { number | null } value
         */
        static ttl(value) {
            __classPrivateFieldSet(this, _a$1, value, "f", _LocalStorage_ttl);
        }
        /**
         * Set the key to the Storage object.
         *
         * @param { string } key String containing the name of the key you want to create.
         * @param { * } value Value you want to give the key you are creating.
         * @param { number | null } ttl Item validity period in seconds.
         */
        static set(key, value, ttl = null) {
            ttl = ttl !== null && ttl !== void 0 ? ttl : __classPrivateFieldGet(this, _a$1, "f", _LocalStorage_ttl);
            const item = {
                data: value instanceof Function ? value() : value,
                expiry: ttl ? Date.now() + ttl * 1000 : null
            };
            localStorage.setItem(key, JSON.stringify(item));
        }
        /**
         * Get the key from the Storage object.
         *
         * @param { string } key String containing the name of the key you want to create.
         * @param { string | Function | null } fallback String containing the fallback value.
         *
         * @return { * }
         */
        static get(key, fallback = null) {
            var _b;
            const storageItem = localStorage.getItem(key);
            if (storageItem === null) {
                return fallback instanceof Function ? fallback() : fallback !== null && fallback !== void 0 ? fallback : null;
            }
            try {
                const item = JSON.parse(storageItem);
                if (item.expiry && Date.now() > item.expiry) {
                    this.remove(key);
                    return null;
                }
                return (_b = item.data) !== null && _b !== void 0 ? _b : item;
            }
            catch (_c) {
                return storageItem;
            }
        }
        /**
         * Get the key from the Storage, or execute the given callback and store the result.
         *
         * @param { string } key String containing the name of the key you want to create.
         * @param { Function } callback Function you want to execute.
         * @param { number | null } ttl Item validity period in seconds.
         *
         * @return { any }
         */
        static remember(key, callback, ttl = null) {
            const item = this.get(key);
            if (item === null) {
                this.set(key, callback, ttl !== null && ttl !== void 0 ? ttl : __classPrivateFieldGet(this, _a$1, "f", _LocalStorage_ttl));
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
         * @param { string } key String containing the name of the key you want to delete.
         */
        static remove(key) {
            localStorage.removeItem(key);
        }
        /**
         * Clear all keys stored in a given Storage object.
         */
        static clear() {
            localStorage.clear();
        }
        /**
         * Determine if the key exists in the Storage object.
         *
         * @param { string } key String containing the name of the key you want to check against
         *
         * @return { boolean }
         */
        static has(key) {
            return !!this.get(key);
        }
        /**
         * Determine if any of the keys exists in the Storage object.
         *
         * @param { string | string[] } keys String containing the name of the key you want to check against
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
            return localStorage.length === 0;
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
            return Object.keys(localStorage);
        }
        /**
         * Returns the total number of items in the Storage object.
         *
         * @return { number }
         */
        static count() {
            return localStorage.length;
        }
        /**
         * Updates the item expiration time.
         *
         * @param { string } key String containing the name of the key you want to update.
         * @param { number | null } ttl Item validity period in seconds.
         */
        static touch(key, ttl = null) {
            const item = this.get(key);
            if (item === null) {
                return;
            }
            this.set(key, item, ttl !== null && ttl !== void 0 ? ttl : __classPrivateFieldGet(this, _a$1, "f", _LocalStorage_ttl));
        }
        /**
         * Returns the expiration date for a given key.
         *
         * @param { string } key String containing the name of the key you want to check against
         * @param { boolean } asDate If true, returns the expiration date as a Date object.
         *
         * @return { number | Date | null }
         */
        static expiry(key, asDate = false) {
            const storageItem = localStorage.getItem(key);
            if (storageItem === null) {
                return null;
            }
            try {
                const item = JSON.parse(storageItem);
                if (!(item === null || item === void 0 ? void 0 : item.hasOwnProperty('expiry')) || (item === null || item === void 0 ? void 0 : item.expiry) === null) {
                    return null;
                }
                return asDate ? new Date(item.expiry) : item.expiry;
            }
            catch (_b) {
                return null;
            }
        }
        /**
         * Dump the key from the Storage object.
         *
         * @param { string } key String containing the name of the key you want to dump.
         */
        static dump(key) {
            console.log(this.get(key));
        }
    }
    _a$1 = LocalStorage;
    /**
     * Default item validity period in seconds.
     *
     * @type { number | null }
     */
    _LocalStorage_ttl = { value: null };
    if (typeof window !== 'undefined') {
        window.LocalStorage = LocalStorage;
    }
    if (typeof global !== 'undefined') {
        global.LocalStorage = LocalStorage;
    }

    class SessionStorage {
        /**
         * Set the key to the Storage object.
         *
         * @param { string } key String containing the name of the key you want to create.
         * @param { * } value String containing the value of the key you want to create.
         */
        static set(key, value) {
            const item = {
                data: value instanceof Function ? value() : value,
            };
            sessionStorage.setItem(key, JSON.stringify(item));
        }
        /**
         * Get the key from the Storage object.
         *
         * @param { string } key String containing the name of the key you want to create.
         * @param { string | Function | null } fallback String containing the fallback value.
         *
         * @return { * }
         */
        static get(key, fallback = null) {
            var _a;
            const storageItem = sessionStorage.getItem(key);
            if (storageItem === null) {
                return fallback instanceof Function ? fallback() : fallback !== null && fallback !== void 0 ? fallback : null;
            }
            try {
                const item = JSON.parse(storageItem);
                return (_a = item.data) !== null && _a !== void 0 ? _a : item;
            }
            catch (_b) {
                return storageItem;
            }
        }
        /**
         * Get the key from the Storage, or execute the given callback and store the result.
         *
         * @param { string } key String containing the name of the key you want to create.
         * @param { Function } callback Function you want to execute.
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
         * @param { string } key String containing the name of the key you want to delete.
         */
        static remove(key) {
            sessionStorage.removeItem(key);
        }
        /**
         * Clear all keys stored in a given Storage object.
         */
        static clear() {
            sessionStorage.clear();
        }
        /**
         * Determine if the key exists in the Storage object.
         *
         * @param { string } key String containing the name of the key you want to check against
         *
         * @return { boolean }
         */
        static has(key) {
            return !!this.get(key);
        }
        /**
         * Determine if any of the keys exists in the Storage object.
         *
         * @param { string | string[] } keys String containing the name of the key you want to check against
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
            return sessionStorage.length === 0;
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
            return Object.keys(sessionStorage);
        }
        /**
         * Returns the total number of items in the Storage object.
         *
         * @return { number }
         */
        static count() {
            return sessionStorage.length;
        }
        /**
         * Dump the key from the Storage object.
         *
         * @param { string } key String containing the name of the key you want to dump.
         */
        static dump(key) {
            console.log(this.get(key));
        }
    }
    if (typeof window !== 'undefined') {
        window.SessionStorage = SessionStorage;
    }
    if (typeof global !== 'undefined') {
        global.SessionStorage = SessionStorage;
    }

    var _a, _Cookie_ttl, _Cookie_stringify, _Cookie_expires;
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
         * @param { string } key String containing the name of the key you want to create.
         * @param { * } value Value you want to give the key you are creating.
         * @param { CookieAttributes } attributes Cookie configuration options.
         *
         * @returns { string }
         */
        static set(key, value, attributes = {}) {
            var _b;
            let cookie = value === null || value === undefined
                ? `${key}`
                : `${key}=${__classPrivateFieldGet(this, _a, "m", _Cookie_stringify).call(this, value)}`;
            (_b = attributes.ttl) !== null && _b !== void 0 ? _b : (attributes.ttl = __classPrivateFieldGet(this, _a, "f", _Cookie_ttl));
            attributes.expires = __classPrivateFieldGet(this, _a, "m", _Cookie_expires).call(this, attributes.expires);
            if (attributes.ttl) {
                attributes.expires = new Date(Date.now() + attributes.ttl * 1000);
            }
            if (attributes.expires) {
                cookie += `; expires=${attributes.expires.toUTCString()}`;
            }
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
                throw new Error('The "secure" attribute must be set to "true" if "sameSite" is set to "None".');
            }
            document.cookie = cookie;
            return cookie;
        }
        /**
         * Get the key from the Cookie.
         *
         * @param { string } key String containing the name of the key you want to get.
         *
         * @returns { * }
         */
        static get(key, fallback = null) {
            // Escape special regex characters in the key.
            key = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const cookies = new RegExp(`(^|;\\s*)${key}=([^;]*)`).exec(document.cookie);
            if (cookies === null) {
                return fallback instanceof Function ? fallback() : fallback !== null && fallback !== void 0 ? fallback : null;
            }
            const cookie = cookies[2];
            try {
                return JSON.parse(cookie);
            }
            catch (_b) {
                return cookie;
            }
        }
        /**
         * Get the key from the Cookie, or execute the given callback and store the result.
         *
         * @param { string } key String containing the name of the key you want to create.
         * @param { Function } callback Function you want to execute.
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
         * @return { {key: string, value: any}[] }
         */
        static all() {
            let cookies = [];
            if (document.cookie === '') {
                return cookies;
            }
            document.cookie
                .split('; ')
                .forEach((cookie) => {
                if (cookie === '') {
                    return;
                }
                const key = cookie.split('=')[0];
                cookies.push({ key, value: this.get(key) });
            });
            return cookies;
        }
        /**
         * Removes a key from the cookie.
         *
         * @param { string } key The name of the cookie key to remove.
         * @param { object} attributes Optional cookie attributes (only `path` is allowed).
         */
        static remove(key, attributes = {}) {
            this.set(key, '', Object.assign(Object.assign({}, attributes), { expires: new Date(0) }));
        }
        /**
         * Clear all keys stored in the Cookie.
         *
         * @param { object } attributes Optional cookie attributes (only `path` is allowed).
         */
        static clear(attributes = {}) {
            this.all().forEach((cookie) => {
                this.remove(cookie.key, attributes);
            });
        }
        /**
         * Determine if the key exists in the Cookie.
         *
         * @param { string } key String containing the name of the key you want to check against
         *
         * @return { boolean }
         */
        static has(key) {
            return !!this.get(key);
        }
        /**
         * Determine if any of the keys exists in the Cookie.
         *
         * @param { string | string[] } keys String containing the name of the key you want to check against
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
         * Determine if the Cookie is empty.
         *
         * @return { boolean }
         */
        static isEmpty() {
            return document.cookie.length === 0;
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
         * @param { string } key String containing the name of the key you want to update.
         * @param { number | null } ttl Item validity period in seconds.
         * @param { object } attributes Optional cookie attributes (only `path` is allowed).
         */
        static touch(key, ttl = null, attributes = {}) {
            const cookie = this.get(key);
            if (cookie === null) {
                return;
            }
            ttl !== null && ttl !== void 0 ? ttl : (ttl = __classPrivateFieldGet(this, _a, "f", _Cookie_ttl));
            this.set(key, cookie, Object.assign({ ttl }, attributes));
        }
        /**
         * Dump the key from the Cookie.
         *
         * @param { string } key String containing the name of the key you want to dump.
         */
        static dump(key) {
            console.log(this.get(key));
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
        try {
            const date = new Date(expires);
            return isNaN(date.getTime()) ? undefined : date;
        }
        catch (_b) {
            return undefined;
        }
    };
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
    if (typeof window !== 'undefined') {
        window.Stash = Stash;
        window.LocalStorage = LocalStorage;
        window.SessionStorage = SessionStorage;
        window.Cookie = Cookie;
    }
    if (typeof global !== 'undefined') {
        global.Stash = Stash;
        global.LocalStorage = LocalStorage;
        global.SessionStorage = SessionStorage;
        global.Cookie = Cookie;
    }

    exports.Cookie = Cookie;
    exports.LocalStorage = LocalStorage;
    exports.SessionStorage = SessionStorage;
    exports.Stash = Stash;

}));
//# sourceMappingURL=main.umd.js.map
