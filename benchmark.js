import Benchmark from 'benchmark'
import { encode, decode } from './index.js'
import base32encode from 'base32-encode'
import base32decode from 'base32-decode'

let suite = new Benchmark.Suite

let STR = 'The quick brown fox jumps over the lazy dog.'
let BUF = Buffer.from(STR)
let RESULT = encode(STR)

console.log('result', RESULT)

suite.add('encode', () => {
	encode(BUF)
})

suite.add('base32-encode', () => {
	base32encode(BUF, 'Crockford')
})

suite.add('decode', () => {
	decode(RESULT)
})

suite.add('base32-decode', () => {
	base32decode(RESULT, 'Crockford')
})

suite.add('encode string', () => {
	encode(STR)
})



suite.add('base32-encode string', () => {
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
