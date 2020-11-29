import defaultOptions from './options.crockfordLowercase.js'

let defaultDecodeOptions = {
	alphabet: defaultOptions.alphabet,
	...defaultOptions.decodeOptions
}

const SKIP = -1

function getReverseAlphabet({ alphabet, sanitize }) {
	let result = Array(128)

	// By default, map all characters to their indexes in alphabet.
	// If they don't exist in the alphabet, map them to 0.
	for (let i = 0; i < 128; i++) {
		let idx = alphabet.indexOf(String.fromCharCode(i))
		result[i] = idx !== -1 ? idx : 0
	}

	// Then patch the reverse alphabet so that for every character c, c maps to the
	// same value as sanitize(c). While at it, check the sanity of the sanitizer.
	for (let i = 0; i < 128; i++) {
		let char = String.fromCharCode(i)
		let sanitizedChar = sanitize(char)
		if (alphabet.indexOf(char) !== -1) {
			if (sanitizedChar !== char) {
				throw new Error(
					`sanitize mapped valid input '${char}' to '${sanitizedChar}'`
				)
			}
		}

		if (sanitizedChar === '') {
			result[i] = SKIP
		} else {
			let sanitizedCharCode = sanitizedChar.charCodeAt(0)

			if (sanitizedCharCode < 0 || sanitizedCharCode >= 128) {
				throw new Error(
					`sanitize('${char}' (${i})) returned an invalid character: ` +
						`'${sanitizedChar}' (${sanitizedCharCode})`
				)
			}
			result[i] = result[sanitizedCharCode]
		}
	}

	return result
}

function configure(decodeOptions) {
	const options = { ...defaultDecodeOptions, ...decodeOptions }

	const { verifyInput, verify } = options
	const reverseAlphabet = getReverseAlphabet(options)

	/**
	 * Base32-decode 'input'
	 *
	 * @param {string} input
	 * @returns {Buffer}
	 */
	function decode(input) {
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

	decode.configure = configure
	decode.options = options
	return decode
}

export const decode = configure(defaultOptions)
