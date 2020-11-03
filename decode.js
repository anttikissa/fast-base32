// crockford

let alphabet = '0123456789abcdefghjkmnpqrstvwxyz'
let reverseAlphabet = Array(256)
for (let i = 0; i < alphabet.length; i++) {
	reverseAlphabet[alphabet.charCodeAt(i)] = i
}

// Special lookup values
const SKIP = -1
const INVALID = -2

function sanitize(input) {
	return input.replace(/[A-Zilo*~$=uU-]/g, (c) => {
		switch (c) {
			// Ignore hyphens are check symbols
			case '-':
			case '*':
			case '~':
			case '$':
			case '=':
			case 'u':
			case 'U':
				return ''
			// Error correction
			case 'o':
			case 'O':
				return '0'
			case 'i':
			case 'I':
			case 'l':
			case 'L':
				return '1'

			// The rest are transformed to lower case
			default:
				return c.toLowerCase()
		}
	})
}

function verify(input) {
	if (!input.match(/^[0123456789abcdefghjkmnpqrstvwxyz]*$/)) {
		throw new Error(`Invalid input: "${input}"`)
	}
}

/**
 * Base32-decode 'input'
 *
 * @param {string} input
 * @returns {Buffer}
 */
export function decode(input) {
	input = sanitize(input)
	verify(input)

	let inputLength = input.length
	let length = Math.floor((input.length * 5) / 8)
	let output = Buffer.alloc(length)

	let bits = 0
	let value = 0
	let resultPos = 0

	for (let i = 0; i < inputLength; i++) {
		let undecoded = input.charCodeAt(i)
		// if (undecoded < 0 || undecoded >= 128) {
		// 	throw new Error(`invalid input ${input[i]} at pos ${i}`)
		// }
		let decoded = reverseAlphabet[undecoded]
		// if (decoded === INVALID) {
		// 	throw new Error(`invalid input ${input[i]} at pos ${i}`)
		// }
		// if (decoded === SKIP) {
		// 	continue
		// }
		bits += 5
		value = (value << 5) + decoded

		while (bits >= 8) {
			output[resultPos++] = (value >>> (bits - 8)) & 0xff
			bits -= 8
		}
	}

	return output
}
