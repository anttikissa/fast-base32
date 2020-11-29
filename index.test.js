import test from 'ava'
import base32 from './index.js'

import optionsCROCKFORD from './options.crockford.js'

test('crockford', (t) => {
	t.is(base32.encode('Hello world!'), '91jprv3f41vpywkccggg')
	t.is(base32.decode('91jprv3f41vpywkccggg').toString('ascii'), 'Hello world!')
	t.is(base32.decode('9IjP-rV3f-4lvp-ywkc-cGgG===Uu*~$').toString('ascii'), 'Hello world!')
})

test('CROCKFORD', (t) => {
	let CROCKFORD = base32.configure(optionsCROCKFORD)
	t.is(CROCKFORD.encode('Hello world!'), '91JPRV3F41VPYWKCCGGG')
	t.is(CROCKFORD.decode('91JPRV3F41VPYWKCCGGG').toString('ascii'), 'Hello world!')
	t.is(CROCKFORD.decode('91jprv3f41vpywkccggg').toString('ascii'), 'Hello world!')
	t.is(CROCKFORD.decode('9IjP-rV3f-4lvp-ywkc-cGgG===Uu*~$').toString('ascii'), 'Hello world!')
})
