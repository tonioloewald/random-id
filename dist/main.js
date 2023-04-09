function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $008863d45323089f$exports = {};

$parcel$defineInteropFlag($008863d45323089f$exports);

$parcel$export($008863d45323089f$exports, "now36", () => $008863d45323089f$export$5d7b9a9d7f7e6e8a);
$parcel$export($008863d45323089f$exports, "randId", () => $008863d45323089f$export$4332f11a4b07dc0b);
$parcel$export($008863d45323089f$exports, "id", () => $008863d45323089f$export$d560c7e4a29451c2);
$parcel$export($008863d45323089f$exports, "uuid", () => $008863d45323089f$export$31b40729666a4ae0);
$parcel$export($008863d45323089f$exports, "default", () => $008863d45323089f$export$2e2bcd8739ae039);
const { crypto: $008863d45323089f$var$crypto  } = globalThis;
/*
  Polyfill for crypto.randomUUID, taken from here:
  https://github.com/uuidjs/randomUUID/blob/main/randomUUID.js
*/ class $008863d45323089f$var$ERR_INVALID_ARG_TYPE extends TypeError {
    constructor(name, type, value){
        super(`${name} variable is not of type ${type} (value: '${value}')`);
        this.code = "ERR_INVALID_ARG_TYPE";
    }
}
//
// internal/validators
//
function $008863d45323089f$var$validateBoolean(value, name) {
    if (typeof value !== "boolean") throw new $008863d45323089f$var$ERR_INVALID_ARG_TYPE(name, "boolean", value);
}
function $008863d45323089f$var$validateObject(value, name) {
    if (value === null || Array.isArray(value) || typeof value !== "object") throw new $008863d45323089f$var$ERR_INVALID_ARG_TYPE(name, "Object", value);
}
//
// crypto
//
const $008863d45323089f$var$randomFillSync = $008863d45323089f$var$crypto.getRandomValues.bind($008863d45323089f$var$crypto);
// Implements an RFC 4122 version 4 random UUID.
// To improve performance, random data is generated in batches
// large enough to cover kBatchSize UUID's at a time. The uuidData
// and uuid buffers are reused. Each call to randomUUID() consumes
// 16 bytes from the buffer.
const $008863d45323089f$var$kHexDigits = [
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    97,
    98,
    99,
    100,
    101,
    102
];
const $008863d45323089f$var$kBatchSize = 128;
let $008863d45323089f$var$uuidData;
let $008863d45323089f$var$uuidNotBuffered;
let $008863d45323089f$var$_uuid;
let $008863d45323089f$var$uuidBatch = 0;
function $008863d45323089f$var$getBufferedUUID() {
    if ($008863d45323089f$var$uuidData === undefined) $008863d45323089f$var$uuidData = new Uint8Array(16 * $008863d45323089f$var$kBatchSize);
    if ($008863d45323089f$var$uuidBatch === 0) $008863d45323089f$var$randomFillSync($008863d45323089f$var$uuidData);
    $008863d45323089f$var$uuidBatch = ($008863d45323089f$var$uuidBatch + 1) % $008863d45323089f$var$kBatchSize;
    return $008863d45323089f$var$uuidData.slice($008863d45323089f$var$uuidBatch * 16, $008863d45323089f$var$uuidBatch * 16 + 16);
}
function $008863d45323089f$var$randomUUID(options) {
    if (options !== undefined) $008863d45323089f$var$validateObject(options, "options");
    const { disableEntropyCache: disableEntropyCache = false  } = {
        ...options
    };
    $008863d45323089f$var$validateBoolean(disableEntropyCache, "options.disableEntropyCache");
    if ($008863d45323089f$var$_uuid === undefined) {
        $008863d45323089f$var$_uuid = new Uint8Array(36);
        $008863d45323089f$var$_uuid[8] = $008863d45323089f$var$_uuid[13] = $008863d45323089f$var$_uuid[18] = $008863d45323089f$var$_uuid[23] = "-".charCodeAt(0);
        $008863d45323089f$var$_uuid[14] = 52 // '4', identifies the _uuid version
        ;
    }
    let uuidBuf;
    if (!disableEntropyCache) uuidBuf = $008863d45323089f$var$getBufferedUUID();
    else {
        uuidBuf = $008863d45323089f$var$uuidNotBuffered;
        if (uuidBuf === undefined) uuidBuf = $008863d45323089f$var$uuidNotBuffered = new Uint8Array(16);
        $008863d45323089f$var$randomFillSync(uuidBuf);
    }
    // Variant byte: 10xxxxxx (variant 1)
    uuidBuf[8] = uuidBuf[8] & 0x3f | 0x80;
    // This function is structured the way it is for performance.
    // The _uuid buffer stores the serialization of the random
    // bytes from uuidData.
    // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    let n = 0;
    $008863d45323089f$var$_uuid[0] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[1] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    $008863d45323089f$var$_uuid[2] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[3] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    $008863d45323089f$var$_uuid[4] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[5] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    $008863d45323089f$var$_uuid[6] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[7] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    // -
    $008863d45323089f$var$_uuid[9] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[10] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    $008863d45323089f$var$_uuid[11] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[12] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    // -
    // 4, _uuid[14] is set already...
    $008863d45323089f$var$_uuid[15] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    $008863d45323089f$var$_uuid[16] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[17] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    // -
    $008863d45323089f$var$_uuid[19] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[20] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    $008863d45323089f$var$_uuid[21] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[22] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    // -
    $008863d45323089f$var$_uuid[24] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[25] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    $008863d45323089f$var$_uuid[26] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[27] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    $008863d45323089f$var$_uuid[28] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[29] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    $008863d45323089f$var$_uuid[30] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[31] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    $008863d45323089f$var$_uuid[32] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[33] = $008863d45323089f$var$kHexDigits[uuidBuf[n++] & 0xf];
    $008863d45323089f$var$_uuid[34] = $008863d45323089f$var$kHexDigits[uuidBuf[n] >> 4];
    $008863d45323089f$var$_uuid[35] = $008863d45323089f$var$kHexDigits[uuidBuf[n] & 0xf];
    return String.fromCharCode.apply(null, $008863d45323089f$var$_uuid);
}
if (!$008863d45323089f$var$crypto.randomUUID) $008863d45323089f$var$crypto.randomUUID = $008863d45323089f$var$randomUUID;
const $008863d45323089f$export$5d7b9a9d7f7e6e8a = ()=>new Date(parseInt("1000000000", 36) + Date.now()).valueOf().toString(36).slice(1);
const $008863d45323089f$export$4332f11a4b07dc0b = (length, base = 36)=>{
    const squared = base * base;
    const r = new Uint32Array(Math.ceil(length / 2));
    $008863d45323089f$var$crypto.getRandomValues(r);
    return [
        ...r
    ].map((bytes)=>(squared + bytes % squared).toString(base)).slice(1).join("").substr(-length);
};
const $008863d45323089f$export$d560c7e4a29451c2 = ()=>$008863d45323089f$export$5d7b9a9d7f7e6e8a() + $008863d45323089f$export$4332f11a4b07dc0b(11);
const $008863d45323089f$export$31b40729666a4ae0 = $008863d45323089f$var$crypto.randomUUID.bind($008863d45323089f$var$crypto);
var $008863d45323089f$export$2e2bcd8739ae039 = $008863d45323089f$export$31b40729666a4ae0;


$parcel$exportWildcard(module.exports, $008863d45323089f$exports);


//# sourceMappingURL=main.js.map
