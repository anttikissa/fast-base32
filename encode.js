let alphabet = '0123456789abcdefghjkmnpqrstvwxyz'

export function encode(buffer) {
	if (typeof buffer === 'string') {
		buffer = Buffer.from(buffer)
	}

	let length = buffer.length

	let result = ''
	let bits = 0
	let value = 0

	for (let i = 0; i < length; i++) {
		value = (value << 8) + buffer[i]
		bits += 8

		while (bits >= 5) {
			result += alphabet[(value >>> (bits - 5)) & 31]
			bits -= 5
		}
	}
	if (bits > 0) {
	    result += alphabet[(value << (5 - bits)) & 31]
	}

	return result
}

export function _encode(buffer) {
	if (typeof buffer === 'string') {
		buffer = Buffer.from(buffer)
	}
	let bits = buffer.length * 8
	let n = BigInt('0x' + (buffer.toString('hex') || 0))

	if (n !== 0n) {
		while (bits % 5) {
			n <<= 1n
			bits++
		}
	}

	let result = ''
	while (bits > 0) {
		result = alphabet[n & 31n] + result
		n >>= 5n
		bits -= 5
	}
	return result
}

console.log(encode(''))
console.log(encode('a'))
console.log(encode('ab'))
console.log(encode('abc'))
console.log(encode('abcd'))
console.log(encode('abcde'))
