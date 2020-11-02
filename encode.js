let alphabet = '0123456789abcdefghjkmnpqrstvwxyz'

export function encode(buffer) {
	if (typeof buffer === 'string') {
		buffer = Buffer.from(buffer)
	}
	let bits = buffer.length * 8
	let n = BigInt('0x' + (buffer.toString('hex') || 0))

	if (n !== 0) {
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
