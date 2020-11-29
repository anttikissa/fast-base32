import test from 'ava'
import base32 from './index.js'

import optionsCrockford from './options.crockford.js'
import optionsRFC4648 from './options.rfc4648.js'
import optionsRFC4648Hex from './options.rfc4648-hex.js'

test('Crockford lowercase', (t) => {
	t.is(base32.encode('Hello world!'), '91jprv3f41vpywkccggg')
	t.is(base32.decode('91jprv3f41vpywkccggg').toString('ascii'), 'Hello world!')
	t.is(
		base32.decode('9IjP-rV3f-4lvp-ywkc-cGgG===Uu*~$').toString('ascii'),
		'Hello world!'
	)

	t.is(
		base32.encode('The quick brown fox jumps over the lazy dog.'),
		'ahm6a83henmp6ts0c9s6yxve41k6yy10d9tptw3k41qqcsbj41t6gs90dhgqmy90chqpebg'
	)
})

test('Crockford uppercase', (t) => {
	let CROCKFORD = base32.configure(optionsCrockford)
	t.is(CROCKFORD.encode('Hello world!'), '91JPRV3F41VPYWKCCGGG')
	t.is(
		CROCKFORD.decode('91JPRV3F41VPYWKCCGGG').toString('ascii'),
		'Hello world!'
	)
	t.is(
		CROCKFORD.decode('91jprv3f41vpywkccggg').toString('ascii'),
		'Hello world!'
	)
	t.is(
		CROCKFORD.decode('9IjP-rV3f-4lvp-ywkc-cGgG===Uu*~$').toString('ascii'),
		'Hello world!'
	)
})

test('RFC4648', (t) => {
	let rfc = base32.configure(optionsRFC4648)
	t.is(rfc.encode('Hello world!'), 'JBSWY3DPEB3W64TMMQQQ====')
	t.is(rfc.encode('foobar'), 'MZXW6YTBOI======')

	t.deepEqual(rfc.encode(''), '')
	t.deepEqual(rfc.encode('f'), 'MY======')
	t.deepEqual(rfc.encode('fo'), 'MZXQ====')
	t.deepEqual(rfc.encode('foo'), 'MZXW6===')
	t.deepEqual(rfc.encode('foob'), 'MZXW6YQ=')
	t.deepEqual(rfc.encode('fooba'), 'MZXW6YTB')
	t.deepEqual(rfc.encode('foobar'), 'MZXW6YTBOI======')

	t.deepEqual(rfc.decode('MZXW6YQ='), Buffer.from('foob'))
	t.deepEqual(rfc.decode('MZXW6YTB'), Buffer.from('fooba'))
	t.deepEqual(rfc.decode('MZXW6YTBOI======'), Buffer.from('foobar'))

	t.deepEqual(
		rfc.decode('JBSWY3DPEB3W64TMMQQQ===='),
		Buffer.from('Hello world!')
	)
	t.throws(() => rfc.decode('JBSWY3DPEB3W64TMMQQQ'), {
		message: 'Input length not divisible by 8: "JBSWY3DPEB3W64TMMQQQ"'
	})
	t.throws(() => rfc.decode('jbswy3dpeb3w64tmmqqq===='), {
		message: 'Invalid input: "jbswy3dpeb3w64tmmqqq===="'
	})

	let rfcDecodeNoVerify = rfc.decode.configure({
		...rfc.decode.options,
		verifyInput: false
	})

	t.deepEqual(
		rfcDecodeNoVerify('JBSWY3DPEB3W64TMMQQQ'),
		Buffer.from('Hello world!')
	)

	// Lowercase is fine as well (doesn't throw), decodes into 0s
	t.deepEqual(
		rfcDecodeNoVerify('jbswyxdpebxwxxtmmqqq===='),
		Buffer.from('000000000000000000000000', 'hex')
	)
})

test('RFC4648-HEX', (t) => {
	let rfcHex = base32.configure(optionsRFC4648Hex)

	t.is(rfcHex.encode('fo'), 'CPNG====')
	t.is(rfcHex.encode('foobar'), 'CPNMUOJ1E8======')
})

test('default verify()', (t) => {
	let base32Strict = base32.configure({
		alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
		decodeOptions: {
			verifyInput: true
		}
	})

	t.is(base32Strict.encode('Hello world!'), '91IMOR3F41RMUSJCCGGG')

	t.deepEqual(
		base32Strict.decode('91IMOR3F41RMUSJCCGGG'),
		Buffer.from('Hello world!')
	)

	t.throws(
		() => {
			base32Strict.decode('91IMOR3F41RMUSJCCGGZ')
		},
		{
			message: "unrecognized input character 'Z'"
		}
	)
})
