import { test, expect } from 'bun:test'
const { uuid, now36, id } = await import('./random-id.js')

test('uuid() works', () => {
  expect(uuid().match(/[0-9a-f]+/g).length).toBe(5)
  expect(uuid().match(/[0-9a-f]+/g).map(s => s.length).join()).toBe('8,4,4,4,12')
  expect(uuid().length).toBe(36)
  expect(uuid()).not.toBe(uuid())
})

test('now36() works', () => {
  expect(now36().length).toBe(9)
  expect(Math.abs(parseInt(now36(), 36) - parseInt(now36(), 36)) > 1).toBe(false)
  expect(Math.abs(parseInt(now36(), 36) - Date.now()) > 1).toBe(false)
})

test('id() works', () => {
  expect(id().length).toBe(20)
  expect(id().match(/[a-z0-9]{20,20}/) == null).toBe(false)
})
