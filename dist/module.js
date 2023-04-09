function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $4ea248af39de15ad$exports = {};

$parcel$defineInteropFlag($4ea248af39de15ad$exports);

$parcel$export($4ea248af39de15ad$exports, "now36", () => $4ea248af39de15ad$export$5d7b9a9d7f7e6e8a);
$parcel$export($4ea248af39de15ad$exports, "randId", () => $4ea248af39de15ad$export$4332f11a4b07dc0b);
$parcel$export($4ea248af39de15ad$exports, "id", () => $4ea248af39de15ad$export$d560c7e4a29451c2);
$parcel$export($4ea248af39de15ad$exports, "uuid", () => $4ea248af39de15ad$export$31b40729666a4ae0);
$parcel$export($4ea248af39de15ad$exports, "default", () => $4ea248af39de15ad$export$2e2bcd8739ae039);
const { crypto: $4ea248af39de15ad$var$crypto  } = globalThis;
/*
  Polyfill for crypto.randomUUID, taken from here:
  https://github.com/uuidjs/randomUUID/blob/main/randomUUID.js
*/ class $4ea248af39de15ad$var$ERR_INVALID_ARG_TYPE extends TypeError {
    constructor(name, type, value){
        super(`${name} variable is not of type ${type} (value: '${value}')`);
        this.code = "ERR_INVALID_ARG_TYPE";
    }
}
//
// internal/validators
//
function $4ea248af39de15ad$var$validateBoolean(value, name) {
    if (typeof value !== "boolean") throw new $4ea248af39de15ad$var$ERR_INVALID_ARG_TYPE(name, "boolean", value);
}
function $4ea248af39de15ad$var$validateObject(value, name) {
    if (value === null || Array.isArray(value) || typeof value !== "object") throw new $4ea248af39de15ad$var$ERR_INVALID_ARG_TYPE(name, "Object", value);
}
//
// crypto
//
const $4ea248af39de15ad$var$randomFillSync = $4ea248af39de15ad$var$crypto.getRandomValues.bind($4ea248af39de15ad$var$crypto);
// Implements an RFC 4122 version 4 random UUID.
// To improve performance, random data is generated in batches
// large enough to cover kBatchSize UUID's at a time. The uuidData
// and uuid buffers are reused. Each call to randomUUID() consumes
// 16 bytes from the buffer.
const $4ea248af39de15ad$var$kHexDigits = [
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
const $4ea248af39de15ad$var$kBatchSize = 128;
let $4ea248af39de15ad$var$uuidData;
let $4ea248af39de15ad$var$uuidNotBuffered;
let $4ea248af39de15ad$var$_uuid;
let $4ea248af39de15ad$var$uuidBatch = 0;
function $4ea248af39de15ad$var$getBufferedUUID() {
    if ($4ea248af39de15ad$var$uuidData === undefined) $4ea248af39de15ad$var$uuidData = new Uint8Array(16 * $4ea248af39de15ad$var$kBatchSize);
    if ($4ea248af39de15ad$var$uuidBatch === 0) $4ea248af39de15ad$var$randomFillSync($4ea248af39de15ad$var$uuidData);
    $4ea248af39de15ad$var$uuidBatch = ($4ea248af39de15ad$var$uuidBatch + 1) % $4ea248af39de15ad$var$kBatchSize;
    return $4ea248af39de15ad$var$uuidData.slice($4ea248af39de15ad$var$uuidBatch * 16, $4ea248af39de15ad$var$uuidBatch * 16 + 16);
}
function $4ea248af39de15ad$var$randomUUID(options) {
    if (options !== undefined) $4ea248af39de15ad$var$validateObject(options, "options");
    const { disableEntropyCache: disableEntropyCache = false  } = {
        ...options
    };
    $4ea248af39de15ad$var$validateBoolean(disableEntropyCache, "options.disableEntropyCache");
    if ($4ea248af39de15ad$var$_uuid === undefined) {
        $4ea248af39de15ad$var$_uuid = new Uint8Array(36);
        $4ea248af39de15ad$var$_uuid[8] = $4ea248af39de15ad$var$_uuid[13] = $4ea248af39de15ad$var$_uuid[18] = $4ea248af39de15ad$var$_uuid[23] = "-".charCodeAt(0);
        $4ea248af39de15ad$var$_uuid[14] = 52 // '4', identifies the _uuid version
        ;
    }
    let uuidBuf;
    if (!disableEntropyCache) uuidBuf = $4ea248af39de15ad$var$getBufferedUUID();
    else {
        uuidBuf = $4ea248af39de15ad$var$uuidNotBuffered;
        if (uuidBuf === undefined) uuidBuf = $4ea248af39de15ad$var$uuidNotBuffered = new Uint8Array(16);
        $4ea248af39de15ad$var$randomFillSync(uuidBuf);
    }
    // Variant byte: 10xxxxxx (variant 1)
    uuidBuf[8] = uuidBuf[8] & 0x3f | 0x80;
    // This function is structured the way it is for performance.
    // The _uuid buffer stores the serialization of the random
    // bytes from uuidData.
    // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    let n = 0;
    $4ea248af39de15ad$var$_uuid[0] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[1] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    $4ea248af39de15ad$var$_uuid[2] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[3] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    $4ea248af39de15ad$var$_uuid[4] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[5] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    $4ea248af39de15ad$var$_uuid[6] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[7] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    // -
    $4ea248af39de15ad$var$_uuid[9] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[10] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    $4ea248af39de15ad$var$_uuid[11] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[12] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    // -
    // 4, _uuid[14] is set already...
    $4ea248af39de15ad$var$_uuid[15] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    $4ea248af39de15ad$var$_uuid[16] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[17] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    // -
    $4ea248af39de15ad$var$_uuid[19] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[20] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    $4ea248af39de15ad$var$_uuid[21] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[22] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    // -
    $4ea248af39de15ad$var$_uuid[24] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[25] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    $4ea248af39de15ad$var$_uuid[26] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[27] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    $4ea248af39de15ad$var$_uuid[28] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[29] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    $4ea248af39de15ad$var$_uuid[30] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[31] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    $4ea248af39de15ad$var$_uuid[32] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[33] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n++] & 0xf];
    $4ea248af39de15ad$var$_uuid[34] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] >> 4];
    $4ea248af39de15ad$var$_uuid[35] = $4ea248af39de15ad$var$kHexDigits[uuidBuf[n] & 0xf];
    return String.fromCharCode.apply(null, $4ea248af39de15ad$var$_uuid);
}
if (!$4ea248af39de15ad$var$crypto.randomUUID) $4ea248af39de15ad$var$crypto.randomUUID = $4ea248af39de15ad$var$randomUUID;
const $4ea248af39de15ad$export$5d7b9a9d7f7e6e8a = ()=>new Date(parseInt("1000000000", 36) + Date.now()).valueOf().toString(36).slice(1);
const $4ea248af39de15ad$export$4332f11a4b07dc0b = (length, base = 36)=>{
    const squared = base * base;
    const r = new Uint32Array(Math.ceil(length / 2));
    $4ea248af39de15ad$var$crypto.getRandomValues(r);
    return [
        ...r
    ].map((bytes)=>(squared + bytes % squared).toString(base)).slice(1).join("").substr(-length);
};
const $4ea248af39de15ad$export$d560c7e4a29451c2 = ()=>$4ea248af39de15ad$export$5d7b9a9d7f7e6e8a() + $4ea248af39de15ad$export$4332f11a4b07dc0b(11);
const $4ea248af39de15ad$export$31b40729666a4ae0 = $4ea248af39de15ad$var$crypto.randomUUID.bind($4ea248af39de15ad$var$crypto);
var $4ea248af39de15ad$export$2e2bcd8739ae039 = $4ea248af39de15ad$export$31b40729666a4ae0;




export {$4ea248af39de15ad$export$5d7b9a9d7f7e6e8a as now36, $4ea248af39de15ad$export$4332f11a4b07dc0b as randId, $4ea248af39de15ad$export$d560c7e4a29451c2 as id, $4ea248af39de15ad$export$31b40729666a4ae0 as uuid};
//# sourceMappingURL=module.js.map
