import optionsCrockfordLowercase from './options.crockfordLowercase.js'

const defaultOptions = {
	// Alphabet must always be specified, therefore no default
	// alphabet: ''

	/**
	 * Map input before decoding. Used to make decode() tolerant against errors
	 * in input and to strip unwanted input characters.
	 *
	 * For example, sanitize() could map:
	 *
	 * - 'I' => '1'
	 * - 'O' => '0',
	 * - '-' => ''
	 *
	 * making the input 'II23-O123' equivalent to '11230123'
	 *
	 * As an optimization, sanitize() will only be called once for every
	 * character in the ASCII character range and its result will be embedded in
	 * a lookup table used by decode().
	 *
	 * @param {String} c Input character
	 * @returns {String} Possible remapped character, or an empty string if it
	 * is to be removed
	 */
	sanitize: (c) => c,

	/**
	 * If true, call verify() before decoding
	 * @type {Boolean}
	 */
	verifyInput: false,

	/**
	 * Called with the input as its argument before decoding if verifyInput is
	 * true. 'this' is the options object.
	 *
	 * Should throw in case of invalid input.
	 *
	 * @param {String} input
	 */
	verify: (input) => {
		for (let c of input) {
			if (this.alphabet.indexOf(c) === -1) {
				throw new Error(`unrecognized input character '${c}'`)
			}
		}
	}
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
	const options = { ...defaultOptions, ...decodeOptions }
	const { verifyInput, verify } = options

	if (!options.alphabet) {
		throw new Error('configure: missing alphabet')
	}
	if (options.alphabet.length !== 32) {
		throw new Error('configure: alphabet length must be 32')
	}

	const reverseAlphabet = getReverseAlphabet(options)

	/**
	 * Base32-decode 'input'
	 *
	 * @param {string} input
	 * @returns {Buffer}
	 */
	function decode(input) {
		if (verifyInput) {
			verify.call(options, input)
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

const defaultDecodeOptions = {
	alphabet: optionsCrockfordLowercase.alphabet,
	...optionsCrockfordLowercase.decodeOptions
}

export const decode = configure(defaultDecodeOptions)
