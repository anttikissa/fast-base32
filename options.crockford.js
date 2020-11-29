// Crockford's Base32 (https://www.crockford.com/base32.html)
// Check symbols are accepted (and ignored) but not checked.
export default {
	alphabet: '0123456789ABCDEFGHJKMNPQRSTVWXYZ',

	// Encode options

	padding: null,

	// Decode options

	sanitize: (input) => {
		return input.replace(/[a-zILO*~$=uU-]/g, (c) => {
			switch (c) {
				// Ignore hyphens and check symbols
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

				// The rest are transformed to upper case
				default:
					return c.toUpperCase()
			}
		})
	},

	// Verify input before decoding?
	verifyInput: false,
	verify: function (input) {
		if (!input.match(/^[0-9a-zA-Z*~$=]*$/)) {
			throw new Error(`Invalid input: "${input}"`)
		}
	}
}
