import { blake2bHex } from 'blakejs';

export function formatTonAddress(publicKey: string) {
    const hexPublicKey = Array.prototype.map.call(publicKey, x => ('00' + x.toString(16)).slice(-2)).join('');
    const hash = blake2bHex(hexPublicKey, undefined, 32);

    const address = `UQC-${hash.substr(0, 6)}-${hash.substr(6, 6)}-${hash.substr(12, 6)}-${hash.substr(18, 6)}${hash.substr(24, 32)}`;

    return address;
}