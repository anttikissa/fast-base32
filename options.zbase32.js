// http://philzimmermann.com/docs/human-oriented-base-32-encoding.txt
export default {
	alphabet: 'ybndrfg8ejkmcpqxot1uwisza345h769',

	encodeOptions: {},

	decodeOptions: {
		sanitize: (input) => input.toLowerCase()
	}
}
