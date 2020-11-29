import test from 'ava'
import base32 from './index.js'

import optionsCrockford from './options.crockford.js'
import optionsRFC4648 from './options.rfc4648.js'

test('crockford', (t) => {
	t.is(base32.encode('Hello world!'), '91jprv3f41vpywkccggg')
	t.is(base32.decode('91jprv3f41vpywkccggg').toString('ascii'), 'Hello world!')
	t.is(
		base32.decode('9IjP-rV3f-4lvp-ywkc-cGgG===Uu*~$').toString('ascii'),
		'Hello world!'
	)
})

test('CROCKFORD', (t) => {
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
