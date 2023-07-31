const v8 = require('v8');

// Function to create a large object
function createLargeObject() {
	const obj = {};
	for (let i = 0; i < 100000; i++) {
		obj['key' + i] = 'value' + i;
	}
	return obj;
}

global.gc();

// Track initial memory usage
const initialMemoryUsage = v8.getHeapStatistics().used_heap_size;
console.log('Initial Memory Usage:', initialMemoryUsage);

function closureTest() {
	// Create the large object
	let largeObject = createLargeObject();
	function innerFunction() {
		const temp = largeObject;
		console.log('temp.len :>> ', temp.length);
	}
	function innerFunctionReset() {
		largeObject = null;
	}
	return {
		innerFunction,
		innerFunctionReset,
	};
}

const ret = closureTest();

// Track memory usage after creating the large object
const memoryAfterCreation = v8.getHeapStatistics().used_heap_size;
console.log('Memory After Creation:', memoryAfterCreation);

// Remove the reference to the large object
ret.innerFunction();
// ret.innerFunctionReset();

// Manually run garbage collection (optional, only for testing purposes)
global.gc();

// Track memory usage after removing the reference
const memoryAfterGC = v8.getHeapStatistics().used_heap_size;
console.log('Memory After GC:', memoryAfterGC);

// Output the difference in memory usage to check if the object was garbage collected
const memoryFreed = memoryAfterCreation - memoryAfterGC;
console.log('Memory Freed:', memoryFreed);
