import { encode } from './encode.js'
import { decode } from './decode.js'

export {
	encode,
	decode
}

import optionsCrockford from './options.crockford.js'
import optionsCrockfordLowercase from './options.crockfordLowercase.js'
import optionsRfc4648 from './options.rfc4648.js'
import optionsRfc4648Hex from './options.rfc4648-hex.js'
import optionsZbase32 from './options.zbase32.js'

export {
	optionsCrockford,
	optionsCrockfordLowercase,
	optionsRfc4648,
	optionsRfc4648Hex,
	optionsZbase32
}

let options = {
	optionsCrockford,
	optionsCrockfordLowercase,
	optionsRfc4648,
	optionsRfc4648Hex,
	optionsZbase32
}

function configure(options) {
	let {
		alphabet,
		padding,
		sanitize,
		verifyInput,
		verify
	} = options

	// What follows could be smarter
	let encodeOptions = {
	}

	if (padding !== undefined) {
		encodeOptions.padding = padding
	}

	let decodeOptions = {
	}

	if (sanitize !== undefined) {
		decodeOptions.sanitize = sanitize
	}

	if (verifyInput !== undefined) {
		decodeOptions.verifyInput = verifyInput
	}

	if (verify !== undefined) {
		decodeOptions.verify = verify
	}

	return {
		encode: encode.configure({ alphabet, ...encodeOptions }),
		decode: decode.configure({ alphabet, ...decodeOptions })
	}
}

export default {
	encode,
	decode,
	configure,
	options
}
