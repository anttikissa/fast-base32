import test from 'ava'
import base32 from './index.js'

test('crockford', (t) => {
	t.is(base32.encode('Hello world!'), '91jprv3f41vpywkccggg')
	t.is(base32.decode('91jprv3f41vpywkccggg').toString('ascii'), 'Hello world!')
	t.is(base32.decode('9IjP-rV3f-4lvp-ywkc-cGgG===Uu').toString('ascii'), 'Hello world!')
})
