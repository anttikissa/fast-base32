// Base32 hex encoding according to https://tools.ietf.org/html/rfc4648
export default {
	alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',

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
