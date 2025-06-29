# Stash

A class that provides a wrapper for working with browser's Local and Session storage with a unified API.

## Installation & setup

### NPM

You can install the package via npm:

```bash
npm install @bjnstnkvc/stash
````

and then import it into your project

```javascript
import { Stash } from '@bjnstnkvc/stash';
```

### CDN

You can install the package via jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@bjnstnkvc/stash/lib/main.min.js"></script>
```

## Usage

### driver

Creates a new instance of the Stash for the given driver.

#### Parameters

- **driver** - String containing the name of the storage driver to be used (_**'local'**_ or _**'session'**_).

#### Example

```javascript
const local: typeof LocalStorage = Stash.driver('local');
```

```javascript
const session: typeof SessionStorage = Stash.driver('session');
```

>**Note:** Driver implementations can be found in [local-storage](https://github.com/BJNSTNKVC/js-local-storage) and [session-storage](https://github.com/BJNSTNKVC/js-session-storage) repositories respectively.

### local

Creates a new instance of the Local Storage.

#### Example

```javascript
const local: typeof LocalStorage = Stash.local();
````

### session

Creates a new instance of the Session Storage.

#### Example

```javascript
const local: typeof SessionStorage = Stash.session();
````