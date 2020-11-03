export function decode(encoded) {
	let length = Math.ceil(encoded.length * 5 / 8)
	let result = Buffer.alloc(length)

	// Just produce something stupid to see what's the performance cap
	for (let i = 0; i < length; i++) {
		result[i] = encoded.charCodeAt(i)
	}

	return result
}

console.log(decode('ahm6a83henmp6ts0c9s6yxve41k6yy10d9tptw3k41qqcsbj41t6gs90dhgqmy90chqpebg'))

