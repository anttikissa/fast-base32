import optionsCrockfordLowercase from './options.crockfordLowercase.js'

const defaultOptions = {
	// Alphabet must always be specified, therefore no default
	// alphabet: ''

	/**
	 * If truthy, append to the encoded string until its length is divisible
	 * by 8.
	 * @type {?String}
	 */
	padding: null
}

// Buffer fallback for browsers
function stringToBuffer(input) {
	if (typeof Buffer !== 'undefined') {
		return Buffer.from(input)
	} else {
		return new TextEncoder('utf-8').encode(input)
	}
}

function configure(encodeOptions) {
	const options = { ...defaultOptions, ...encodeOptions }

	const { alphabet, padding } = options

	/**
	 * Base32-encode 'input'
	 *
	 * @param {string | Uint8Array | number[]} input
	 * @returns {string}
	 */
	function encode(input) {
		if (typeof input === 'string') {
			input = stringToBuffer(input)
		}

		let length = input.length

		let output = ''
		let bits = 0
		let value = 0

		for (let i = 0; i < length; i++) {
			value = (value << 8) + input[i]
			bits += 8

			if ((bits -= 5) >= 5) {
				output += alphabet[(value >>> bits) & 31]
				bits -= 5
			}
			output += alphabet[(value >>> bits) & 31]
		}

		if (bits > 0) {
			output += alphabet[(value << (5 - bits)) & 31]
		}

		if (padding) {
			while (output.length % 8) {
				output += padding
			}
		}
		return output
	}

	encode.configure = configure
	encode.options = options

	return encode
}

export const encode = configure(optionsCrockfordLowercase)
