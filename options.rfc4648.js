// Base32 encoding according to https://tools.ietf.org/html/rfc4648
//
// By default, uses padding and is strict about what it can decode.
//
// To encode without padding, configure with encodeOptions:
//
// import base32 from 'fast-base32'
//
// let base32NoPadding = base32.configure({
//   ...optionsRfc4648,
//   padding: null
// })
//
// To be less strict (i.e. never throw on invalid input), configure with:
//
// let base32NotSoStrict = base32.configure({
//   ...optionsRfc4648,
//   verifyInput: false
// })

export default {
	alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',

	// Encode options

	padding: '=',

	// Decode options

	sanitize: (input) => {
		// Remove padding
		return input.replace(/=/g, '')
	},

	// Verify input before decoding?
	verifyInput: true,

	// Function to do that
	verify: function (input) {
		// Padding missing?
		if (input.length % 8) {
			throw new Error(`Input length not divisible by 8: "${input}"`)
		}

		// Invalid characters?
		if (!input.match(/^[ABCDEFGHIJKLMNOPQRSTUVWXYZ234567]*=*$/)) {
			throw new Error(`Invalid input: "${input}"`)
		}
	}
}
