import Benchmark from 'benchmark'
import { encode, decode } from './index.js'

let suite = new Benchmark.Suite

let STR = 'The quick brown fox jumps over the lazy dog.'
let BUF = Buffer.from(STR)
let RESULT = encode(STR)

suite.add('encode string', () => {
	encode(STR)
})

suite.add('encode Buffer', () => {
	encode(BUF)
})

suite.add('decode', () => {
	decode(RESULT)
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
