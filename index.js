import { encode as e } from './encode.js'
import { decode as d } from './decode.js'

export let encode = e
export let decode = d

function configure(options) {
	let { alphabet, encodeOptions, decodeOptions } = options

	return {
		encode: encode.configure({ alphabet, ...encodeOptions }),
		decode: decode.configure({ alphabet, ...decodeOptions })
	}
}

export default {
	encode,
	decode,
	configure
}
