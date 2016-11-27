import test from 'ava'
import ip2buf, { v4, v6 } from './'

test('ip2buf', t => {
  t.is(Buffer.compare(ip2buf('127.0.0.1'), Buffer.from([0x7f, 0, 0, 1])), 0)

  t.throws(() => ip2buf('127.721'), 'expected ipv4 or ipv6 address')
  t.throws(() => ip2buf('::2001::'), 'expected ipv4 or ipv6 address')
})

test('v4', t => {
  t.is(Buffer.compare(v4('127.0.0.1'), Buffer.from([0x7f, 0, 0, 1])), 0)
  t.throws(() => v4('127.721'), 'expected ipv4 address')
})

test('v6', t => {
  const buf =  Buffer.alloc(16, 0)
  t.is(Buffer.compare(v6('::'), buf), 0)

  buf[buf.length - 1] = 0x1
  t.is(Buffer.compare(v6('::1'), buf), 0)

  buf[buf.length - 1] = 0
  buf.writeUInt16BE(parseInt('2001', 16), 0)
  t.is(Buffer.compare(v6('2001::'), buf), 0)

  const ip = '2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d'
  const ipbuf = [0x20, 0x1, 0x0d, 0xb8, 0x11, 0xa3, 0x09, 0xd7, 0x1f, 0x34, 0x8a, 0x2e, 0x07, 0xa0, 0x76, 0x5d]
  t.is(Buffer.compare(v6(ip), Buffer.from(ipbuf)), 0)

  buf.fill(0)
  buf[10] = 0xff
  buf[11] = 0xff
  buf[12] = 192
  buf[14] = 2
  buf[15] = 1
  t.is(Buffer.compare(v6('::ffff:192.0.2.1'), buf), 0)

  t.throws(() => v6('::2001::'), 'expected ipv6 address')
})
