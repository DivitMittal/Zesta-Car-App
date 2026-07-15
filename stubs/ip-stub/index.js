'use strict';
// Stub for the deprecated `ip` package. cli-doctor and cli-hermes only use
// these at dev-tool time (e.g. `npx react-native doctor`); returning no-op
// values preserves their behavior without dragging in CVE-2024-29415.

function isV4Format() { return false; }
function isV6Format() { return false; }

module.exports = {
  address: () => '',
  cidr: () => ['', ''],
  toLong: () => 0,
  fromLong: () => '',
  toString: (v) => String(v == null ? '' : v),
  isV4Format,
  isV6Format,
  isPrivate: isV4Format,
  isPublic: isV6Format,
  loopback: () => '',
  ipv4: () => '',
  ipv6: () => '',
  mac: () => '',
  toBuffer: () => null,
  bufferToIp: () => '',
  version: '1.1.10-stub',
};