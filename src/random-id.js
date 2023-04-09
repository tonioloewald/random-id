const { crypto } = globalThis

/*
  Polyfill for crypto.randomUUID, taken from here:
  https://github.com/uuidjs/randomUUID/blob/main/randomUUID.js
*/
class ERR_INVALID_ARG_TYPE extends TypeError {
  constructor (name, type, value) {
    super(`${name} variable is not of type ${type} (value: '${value}')`)

    this.code = 'ERR_INVALID_ARG_TYPE'
  }
}

//
// internal/validators
//

function validateBoolean (value, name) {
  if (typeof value !== 'boolean') throw new ERR_INVALID_ARG_TYPE(name, 'boolean', value)
}

function validateObject (value, name) {
  if (value === null || Array.isArray(value) || typeof value !== 'object') {
    throw new ERR_INVALID_ARG_TYPE(name, 'Object', value)
  }
}

//
// crypto
//

const randomFillSync = crypto.getRandomValues.bind(crypto)

// Implements an RFC 4122 version 4 random UUID.
// To improve performance, random data is generated in batches
// large enough to cover kBatchSize UUID's at a time. The uuidData
// and uuid buffers are reused. Each call to randomUUID() consumes
// 16 bytes from the buffer.

const kHexDigits = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102]

const kBatchSize = 128
let uuidData
let uuidNotBuffered
let _uuid
let uuidBatch = 0

function getBufferedUUID () {
  if (uuidData === undefined) {
    uuidData = new Uint8Array(16 * kBatchSize)
  }

  if (uuidBatch === 0) randomFillSync(uuidData)
  uuidBatch = (uuidBatch + 1) % kBatchSize
  return uuidData.slice(uuidBatch * 16, uuidBatch * 16 + 16)
}

function randomUUID (options) {
  if (options !== undefined) validateObject(options, 'options')
  const { disableEntropyCache = false } = { ...options }

  validateBoolean(disableEntropyCache, 'options.disableEntropyCache')

  if (_uuid === undefined) {
    _uuid = new Uint8Array(36)
    _uuid[8] = _uuid[13] = _uuid[18] = _uuid[23] = '-'.charCodeAt(0)
    _uuid[14] = 52 // '4', identifies the _uuid version
  }

  let uuidBuf
  if (!disableEntropyCache) {
    uuidBuf = getBufferedUUID()
  } else {
    uuidBuf = uuidNotBuffered
    if (uuidBuf === undefined) uuidBuf = uuidNotBuffered = new Uint8Array(16)
    randomFillSync(uuidBuf)
  }

  // Variant byte: 10xxxxxx (variant 1)
  uuidBuf[8] = (uuidBuf[8] & 0x3f) | 0x80

  // This function is structured the way it is for performance.
  // The _uuid buffer stores the serialization of the random
  // bytes from uuidData.
  // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  let n = 0
  _uuid[0] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[1] = kHexDigits[uuidBuf[n++] & 0xf]
  _uuid[2] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[3] = kHexDigits[uuidBuf[n++] & 0xf]
  _uuid[4] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[5] = kHexDigits[uuidBuf[n++] & 0xf]
  _uuid[6] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[7] = kHexDigits[uuidBuf[n++] & 0xf]
  // -
  _uuid[9] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[10] = kHexDigits[uuidBuf[n++] & 0xf]
  _uuid[11] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[12] = kHexDigits[uuidBuf[n++] & 0xf]
  // -
  // 4, _uuid[14] is set already...
  _uuid[15] = kHexDigits[uuidBuf[n++] & 0xf]
  _uuid[16] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[17] = kHexDigits[uuidBuf[n++] & 0xf]
  // -
  _uuid[19] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[20] = kHexDigits[uuidBuf[n++] & 0xf]
  _uuid[21] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[22] = kHexDigits[uuidBuf[n++] & 0xf]
  // -
  _uuid[24] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[25] = kHexDigits[uuidBuf[n++] & 0xf]
  _uuid[26] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[27] = kHexDigits[uuidBuf[n++] & 0xf]
  _uuid[28] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[29] = kHexDigits[uuidBuf[n++] & 0xf]
  _uuid[30] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[31] = kHexDigits[uuidBuf[n++] & 0xf]
  _uuid[32] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[33] = kHexDigits[uuidBuf[n++] & 0xf]
  _uuid[34] = kHexDigits[uuidBuf[n] >> 4]
  _uuid[35] = kHexDigits[uuidBuf[n] & 0xf]

  return String.fromCharCode.apply(null, _uuid)
}

if (!crypto.randomUUID) {
  crypto.randomUUID = randomUUID
}

export const now36 = () => new Date(parseInt('1000000000', 36) + Date.now()).valueOf().toString(36).slice(1)

export const randId = (length, base = 36) => {
  const squared = base * base
  const r = new Uint32Array(Math.ceil(length / 2))
  crypto.getRandomValues(r)
  return [...r].map(bytes => (squared + bytes % squared).toString(base)).slice(1).join('').substr(-length)
}

export const id = () => now36() + randId(11)

export const uuid = crypto.randomUUID.bind(crypto)

export default uuid
