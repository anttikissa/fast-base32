let alphabet = '0123456789abcdefghjkmnpqrstvwxyz'
let reverseAlphabet = Array(256)
for (let i = 0; i < alphabet.length; i++) {
	reverseAlphabet[alphabet.charCodeAt(i)] = i
}

/**
 * Base32-decode 'input'
 *
 * @param {string} input
 * @returns {Buffer}
 */
export function decode(input) {
	let inputLength = input.length
	let length = Math.floor(input.length * 5 / 8)
	let result = Buffer.alloc(length)

	let bits = 0
	let value = 0
	let resultPos = 0

	for (let i = 0; i < inputLength; i++) {
		bits += 5

		value = (value << 5) + reverseAlphabet[input.charCodeAt(i)]

		while (bits >= 8) {
			result[resultPos++] = (value >>> (bits - 8)) & 0xff
			bits -= 8
		}
	}

	return result
}

