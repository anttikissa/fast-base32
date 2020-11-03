
export function decode(input) {
	let inputLength = input.length
	let length = Math.floor(input.length * 5 / 8)
	let result = Buffer.alloc(length)

	let bits = 0
	let value = 0

	for (let i = 0; i < inputLength; i++) {
		bits += 5
		input.charCodeAt
	}

	for (let i = 0; i < length; i++) {
		result[i] = input.charCodeAt(i)
	}

	return result
}

console.log(decode('ahm6a83henmp6ts0c9s6yxve41k6yy10d9tptw3k41qqcsbj41t6gs90dhgqmy90chqpebg'))

