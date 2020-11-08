
const SKIP = -1

// crockford
let alphabet = '0123456789abcdefghjkmnpqrstvwxyz'
let reverseAlphabet = getReverseAlphabet()

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

function getReverseAlphabet() {
	let result = Array(256)

	for (let i = 0; i < alphabet.length; i++) {
		result[alphabet.charCodeAt(i)] = i
	}

	for (let i = 0; i < 256; i++) {
		let char = String.fromCharCode(i)
		let sanitizedChar = sanitize(char)
		if (sanitizedChar === char) {
			continue
		}

		if (sanitizedChar === '') {
			result[i] = SKIP
		} else {
			let sanitizedCharCode = sanitizedChar.charCodeAt(0)
			if (sanitizedCharCode < 0 || sanitizedCharCode >= 256) {
				throw new Error(`sanitizer returned invalid character: '${sanitizedChar}'`)
			}
			result[i] = result[sanitizedCharCode]
		}
	}

	return result
}

let verifyInput = false

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
	if (verifyInput) {
		verify(input)
	}

	let inputLength = input.length
	let length = Math.floor((input.length * 5) / 8)
	let output = Buffer.alloc(length)

	let bits = 0
	let value = 0
	let resultPos = 0

	let skipped = 0

	for (let i = 0; i < inputLength; i++) {
		let undecoded = input.charCodeAt(i)
		let decoded = reverseAlphabet[undecoded]
		if (decoded === SKIP) {
			skipped++
			continue
		}
		bits += 5
		value = (value << 5) + decoded

		while (bits >= 8) {
			output[resultPos++] = (value >>> (bits - 8)) & 0xff
			bits -= 8
		}
	}

	if (skipped) {
		let actualLength = Math.floor(((input.length - skipped) * 5) / 8)
		output = output.slice(0, actualLength)
	}

	return output
}
