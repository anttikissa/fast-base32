// http://philzimmermann.com/docs/human-oriented-base-32-encoding.txt
export default {
	alphabet: 'ybndrfg8ejkmcpqxot1uwisza345h769',

	// Decode options

	sanitize: (input) => input.toLowerCase()
}
