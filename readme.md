# ip2buf
[![travis](https://travis-ci.org/ReklatsMasters/ip2buf.svg)](https://travis-ci.org/ReklatsMasters/ip2buf)
[![npm](https://img.shields.io/npm/v/ip2buf.svg)](https://npmjs.org/package/ip2buf)
[![license](https://img.shields.io/npm/l/ip2buf.svg)](https://npmjs.org/package/ip2buf)
[![downloads](https://img.shields.io/npm/dm/ip2buf.svg)](https://npmjs.org/package/ip2buf)

Convert ip address to buffer

## Usage

```js
const ip2buf = require('ip2buf')

ip2buf('8.8.8.8') // [0x8, 0x8, 0x8, 0x8]
ip2buf('2001::')  // [0x20, 0x01, 0, ...]
```

## API

* `[default] function(ip: string): Buffer`

convert ipv4 or ipv6 to buffer

* `v4(ip: string): Buffer`

convert ipv4 to buffer

* `v6(ip: string): Buffer`

convert ipv6 to buffer

## Related

* [date2buffer](https://github.com/ReklatsMasters/date2buffer) - convert Date to Buffer

## License
MIT, 2016 (c) Dmitry Tsvettsikh
