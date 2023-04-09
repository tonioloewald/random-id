# random-id

[npm](https://www.npmjs.com/package/random-id-base36) | [github](https://github.com/tonioloewald/random-id)

Generate random uuids and base-36 ids with ease and efficiency.

> ### Note
>
> This library was extracted from [b8rjs](https://b8rjs.com/?source=source/uuid.js).
>
> This library also polyfills `crypto.randomUUID()` when it's not otherwise available (i.e.
> when your app is being served via `http`). Note that all the cautions against using this
> stuff for crypto purposes unless you know what you're doing still applies, the goal of this
> code is to create robust random ids, e.g. for primary keys in sharded databases.

Random and non-random unique ids. All generated using `crypto.getRandomValues`, i.e. a
[cryptographically strong random number generator](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)

    import {uuid, unique, randId, now36, id} from 'path/to/uuid.js'

    // () => crypto.randomUUID()
    const myId = uuid()

Other ways of generating random / unique ids:

    // randpm string of digits in specified base
    const tenDigits = randId(10, 10)

    // default base is 36, this is a 20 digit string
    const uid = randId(20)

The convenience functions now36() and randId(length, base) can
be used to create very good ids

    // i.e. a unique id that is also going to sort into creation order
    // ms since epoch as 9-digit base 36 string + 11 digit base 36 digits
    // note that now36() will have a leading '0' until May 25th 2059
    const myId = now36() + randId(11)

    // or...
    const myId = id()

The nice thing about id() is that it's pretty efficient, and it's not
going to bite you if you use it as a database key.
*/

### Development Notes

Note that I use [bun](https://bun.sh) because it's faster than node and it
is really good for running tests.