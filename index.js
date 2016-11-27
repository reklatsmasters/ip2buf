'use strict'

var net = require('net')
var Buffer = require('safe-buffer').Buffer

/**
 * encode ip address to buffer
 * @param ip {String}
 * @returns {Buffer}
 */
exports = module.exports = function (ip) {
  if (net.isIPv4(ip)) {
    return v4(ip)
  } else if (net.isIPv6(ip)) {
    return v6(ip)
  } else {
    throw new TypeError('expected ipv4 or ipv6 address')
  }
}

/**
 * encode ip v4 to buffer
 * @param ip {String}
 * @returns {Buffer}
 */
exports.v4 = function (ip) {
  if (!net.isIPv4(ip)) {
    throw new TypeError('expected ipv4 address')
  }

  return v4(ip)
}

/**
 * encode ip v4 to buffer
 * @param ip {String}
 * @returns {Buffer}
 */
function v4(ip) {
  var octets = ip.split('.')
  var buf = Buffer.allocUnsafe(4)

  for(var i = 0; i < octets.length; ++i) {
    buf[i] = +octets[i]
  }

  return buf
}

/**
 * encode ip v4 to buffer
 * @param ip {String}
 * @returns {Buffer}
 */
exports.v6 = function (ip) {
  if (!net.isIPv6(ip)) {
    throw new TypeError('expected ipv6 address')
  }

  return v6(ip)
}

/**
 * encode ip v6 to buffer
 * @param ip {String}
 * @returns {Buffer}
 */
function v6(ip) {
  if (ip == '::') {
    return Buffer.alloc(16, 0)
  }

  var buf = Buffer.allocUnsafe(16)  
  var groups = ip.split(':')
  var holes = 0 // empty octets
  var i = 0

  // ::1
  // 2001::  
  if (!groups[0] || !groups[groups.length - 1]) {
    holes = 8 - (groups.length - 2) // ::1 => ['', '', 1]
    
    if (!groups[0]) {
      buf.fill(0, 0, holes * 2)

      for (i = 2; i < groups.length; ++i) {
        // ::ffff:192.0.2.1
        if (i == (groups.length - 1)) {
          if (net.isIPv4(groups[i])) {
            v4(groups[i]).copy(buf, 12)
            continue
          }
        }

        buf.writeUInt16BE(parseInt(groups[i], 16), holes * 2 + (i - 2) * 2)
      }
    } else {
      buf.fill(0, 16 - holes * 2)

      for (i = 0; i < (8 - holes); ++i) {
        buf.writeUInt16BE(parseInt(groups[i], 16), i * 2)
      }
    }

    return buf
  }

  // 2001:db8::ae21:ad12  
  for (i = 0; i < groups.length; ++i) {
    if (!groups[i]) {
      holes = 8 - groups.length - 1
      buf.fill(0, i * 2, i * 2 + holes * 2)
      
      continue
    }

    buf.writeUInt16BE(parseInt(groups[i], 16), (i + holes) * 2)
  }

  return buf
}
