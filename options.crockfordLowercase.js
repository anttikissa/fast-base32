// A lowercase variant of Crockford's Base32
// (https://www.crockford.com/base32.html), used as the default.
//
// Why use this over the uppercase Crockford?
//
// - Encoded strings are a more compact when using a variable-width font,
//   important when embedded in URLs
// - I find lowercase a bit more readable combined with numbers: the
//   alternating height of glyphs creates a rhythm that is easier for the
//   eye to follow
// - Removes a source of potential confusion: G6 becomes g6
// - And it's compatible with the normal Crockford encoding - either variant
//   will identically decode strings produced by the other
//
// Examples of some strings encoded in lowercase and uppercase Crockford:
//
// "Hello world!":
//
// 91jprv3f41vpywkccggg
// 91JPRV3F41VPYWKCCGGG
//
// A 48-bit timestamp combined with 80 bits of random:
//
// 05v18n7v97w9j2pvfa19c5y9tm
// 05V18N7V97W9J2PVFA19C5Y9TM
//
// 05v18ncb3rsmv5j9z62r0cd6pc
// 05V18NCB3RSMV5J9Z62R0CD6PC
//
// Some random strings:
//
// ts9yzqc3trqxzjhn1847cv
// TS9YZQC3TRQXZJHN1847CV
//
// 6yacc2ar0yj0gt9
// 6YACC2AR0YJ0GT9
//
// a0w2n1detqkn54mwgm49
// A0W2N1DETQKN54MWGM49
//
// pjmz0hb6p0e6r4v8h7e9etbz584n905fg133623ypv9zb
// PJMZ0HB6P0E6R4V8H7E9ETBZ584N905FG133623YPV9ZB
//
// Check symbols are accepted (and ignored) but not checked.
export default {
	alphabet: '0123456789abcdefghjkmnpqrstvwxyz',

	encodeOptions: {
		padding: null
	},

	decodeOptions: {
		sanitize: (input) => {
			return input.replace(/[A-Zilo*~$=uU-]/g, (c) => {
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

					// The rest are transformed to lower case
					default:
						return c.toLowerCase()
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
}
