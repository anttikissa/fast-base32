import Benchmark from 'benchmark'
import { encode, decode } from './index.js'
import base32encode from 'base32-encode'
import base32decode from 'base32-decode'

let [_1, _2, ...args] = process.argv

let suite = new Benchmark.Suite

let STR = 'The quick brown fox jumps over the lazy dog.'
let BUF = Buffer.from(STR)
let RESULT = encode(STR)

function addSuite(name, f) {
	if (args.length === 0 || args.some((arg) => name.match(RegExp(arg, 'i')))) {
		suite.add(name, f)
	}
}

addSuite('encode', () => {
	encode(BUF)
})

addSuite('decode', () => {
	decode(RESULT)
})

addSuite('base32-encode', () => {
	base32encode(BUF, 'Crockford')
})

addSuite('base32-decode', () => {
	base32decode(RESULT, 'Crockford')
})

addSuite('encode string', () => {
	encode(STR)
})



addSuite('base32-encode string', () => {
	base32encode(Buffer.from(STR), 'Crockford')
})




suite.on('error', function(err) {
	console.log('error', err)
})

suite.on('cycle', function(event) {
	console.log(String(event.target))
})

suite.on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').map('name'))
})

suite.run({ async: true })
