function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $260201019569f290$exports = {};

$parcel$defineInteropFlag($260201019569f290$exports);

$parcel$export($260201019569f290$exports, "now36", () => $260201019569f290$export$5d7b9a9d7f7e6e8a);
$parcel$export($260201019569f290$exports, "randId", () => $260201019569f290$export$4332f11a4b07dc0b);
$parcel$export($260201019569f290$exports, "id", () => $260201019569f290$export$d560c7e4a29451c2);
$parcel$export($260201019569f290$exports, "uuid", () => $260201019569f290$export$31b40729666a4ae0);
$parcel$export($260201019569f290$exports, "default", () => $260201019569f290$export$2e2bcd8739ae039);
const { crypto: $260201019569f290$var$crypto  } = globalThis;
/*
  Polyfill for crypto.randomUUID, taken from here:
  https://github.com/uuidjs/randomUUID/blob/main/randomUUID.js
*/ class $260201019569f290$var$ERR_INVALID_ARG_TYPE extends TypeError {
    constructor(name, type, value){
        super(`${name} variable is not of type ${type} (value: '${value}')`);
        this.code = "ERR_INVALID_ARG_TYPE";
    }
}
//
// internal/validators
//
function $260201019569f290$var$validateBoolean(value, name) {
    if (typeof value !== "boolean") throw new $260201019569f290$var$ERR_INVALID_ARG_TYPE(name, "boolean", value);
}
function $260201019569f290$var$validateObject(value, name) {
    if (value === null || Array.isArray(value) || typeof value !== "object") throw new $260201019569f290$var$ERR_INVALID_ARG_TYPE(name, "Object", value);
}
//
// crypto
//
const $260201019569f290$var$randomFillSync = $260201019569f290$var$crypto.getRandomValues.bind($260201019569f290$var$crypto);
// Implements an RFC 4122 version 4 random UUID.
// To improve performance, random data is generated in batches
// large enough to cover kBatchSize UUID's at a time. The uuidData
// and uuid buffers are reused. Each call to randomUUID() consumes
// 16 bytes from the buffer.
const $260201019569f290$var$kHexDigits = [
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
const $260201019569f290$var$kBatchSize = 128;
let $260201019569f290$var$uuidData;
let $260201019569f290$var$uuidNotBuffered;
let $260201019569f290$var$_uuid;
let $260201019569f290$var$uuidBatch = 0;
function $260201019569f290$var$getBufferedUUID() {
    if ($260201019569f290$var$uuidData === undefined) $260201019569f290$var$uuidData = new Uint8Array(16 * $260201019569f290$var$kBatchSize);
    if ($260201019569f290$var$uuidBatch === 0) $260201019569f290$var$randomFillSync($260201019569f290$var$uuidData);
    $260201019569f290$var$uuidBatch = ($260201019569f290$var$uuidBatch + 1) % $260201019569f290$var$kBatchSize;
    return $260201019569f290$var$uuidData.slice($260201019569f290$var$uuidBatch * 16, $260201019569f290$var$uuidBatch * 16 + 16);
}
function $260201019569f290$var$randomUUID(options) {
    if (options !== undefined) $260201019569f290$var$validateObject(options, "options");
    const { disableEntropyCache: disableEntropyCache = false  } = {
        ...options
    };
    $260201019569f290$var$validateBoolean(disableEntropyCache, "options.disableEntropyCache");
    if ($260201019569f290$var$_uuid === undefined) {
        $260201019569f290$var$_uuid = new Uint8Array(36);
        $260201019569f290$var$_uuid[8] = $260201019569f290$var$_uuid[13] = $260201019569f290$var$_uuid[18] = $260201019569f290$var$_uuid[23] = "-".charCodeAt(0);
        $260201019569f290$var$_uuid[14] = 52 // '4', identifies the _uuid version
        ;
    }
    let uuidBuf;
    if (!disableEntropyCache) uuidBuf = $260201019569f290$var$getBufferedUUID();
    else {
        uuidBuf = $260201019569f290$var$uuidNotBuffered;
        if (uuidBuf === undefined) uuidBuf = $260201019569f290$var$uuidNotBuffered = new Uint8Array(16);
        $260201019569f290$var$randomFillSync(uuidBuf);
    }
    // Variant byte: 10xxxxxx (variant 1)
    uuidBuf[8] = uuidBuf[8] & 0x3f | 0x80;
    // This function is structured the way it is for performance.
    // The _uuid buffer stores the serialization of the random
    // bytes from uuidData.
    // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    let n = 0;
    $260201019569f290$var$_uuid[0] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[1] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    $260201019569f290$var$_uuid[2] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[3] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    $260201019569f290$var$_uuid[4] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[5] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    $260201019569f290$var$_uuid[6] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[7] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    // -
    $260201019569f290$var$_uuid[9] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[10] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    $260201019569f290$var$_uuid[11] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[12] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    // -
    // 4, _uuid[14] is set already...
    $260201019569f290$var$_uuid[15] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    $260201019569f290$var$_uuid[16] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[17] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    // -
    $260201019569f290$var$_uuid[19] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[20] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    $260201019569f290$var$_uuid[21] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[22] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    // -
    $260201019569f290$var$_uuid[24] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[25] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    $260201019569f290$var$_uuid[26] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[27] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    $260201019569f290$var$_uuid[28] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[29] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    $260201019569f290$var$_uuid[30] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[31] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    $260201019569f290$var$_uuid[32] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[33] = $260201019569f290$var$kHexDigits[uuidBuf[n++] & 0xf];
    $260201019569f290$var$_uuid[34] = $260201019569f290$var$kHexDigits[uuidBuf[n] >> 4];
    $260201019569f290$var$_uuid[35] = $260201019569f290$var$kHexDigits[uuidBuf[n] & 0xf];
    return String.fromCharCode.apply(null, $260201019569f290$var$_uuid);
}
if (!$260201019569f290$var$crypto.randomUUID) $260201019569f290$var$crypto.randomUUID = $260201019569f290$var$randomUUID;
const $260201019569f290$export$5d7b9a9d7f7e6e8a = ()=>new Date(parseInt("1000000000", 36) + Date.now()).valueOf().toString(36).slice(1);
const $260201019569f290$export$4332f11a4b07dc0b = (length, base = 36)=>{
    const squared = base * base;
    const r = new Uint32Array(Math.ceil(length / 2));
    $260201019569f290$var$crypto.getRandomValues(r);
    return [
        ...r
    ].map((bytes)=>(squared + bytes % squared).toString(base)).slice(1).join("").substr(-length);
};
const $260201019569f290$export$d560c7e4a29451c2 = ()=>$260201019569f290$export$5d7b9a9d7f7e6e8a() + $260201019569f290$export$4332f11a4b07dc0b(11);
const $260201019569f290$export$31b40729666a4ae0 = $260201019569f290$var$crypto.randomUUID.bind($260201019569f290$var$crypto);
var $260201019569f290$export$2e2bcd8739ae039 = $260201019569f290$export$31b40729666a4ae0;




export {$260201019569f290$export$5d7b9a9d7f7e6e8a as now36, $260201019569f290$export$4332f11a4b07dc0b as randId, $260201019569f290$export$d560c7e4a29451c2 as id, $260201019569f290$export$31b40729666a4ae0 as uuid};
//# sourceMappingURL=index.js.map
