// Function to create a large object
function createLargeObject() {
	const obj = {};
	for (let i = 0; i < 100000; i++) {
		obj['key' + i] = 'value' + i;
	}
	return obj;
}

module.exports = createLargeObject;
