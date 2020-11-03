let alphabet = '0123456789abcdefghjkmnpqrstvwxyz'

/**
 * Base32-encode 'input'
 *
 * @param {string | Uint8Array | number[]} input
 * @returns {string}
 */
export function encode(input) {
	if (typeof input === 'string') {
		input = Buffer.from(input)
	}

	let length = input.length

	let result = ''
	let bits = 0
	let value = 0

	for (let i = 0; i < length; i++) {
		value = (value << 8) + input[i]
		bits += 8

		if ((bits -= 5) >= 5) {
			result += alphabet[(value >>> bits) & 31]
			bits -= 5
		}
		result += alphabet[(value >>> bits) & 31]
	}

	if (bits > 0) {
	    result += alphabet[(value << (5 - bits)) & 31]
	}

	return result
}
