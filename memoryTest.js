const v8 = require('v8');
const createLargeObject = require('./createLargeObject');

global.gc();

// Track initial memory usage
const initialMemoryUsage = v8.getHeapStatistics().used_heap_size;
console.log('Initial Memory Usage:', initialMemoryUsage);

// Create the large object
let largeObject = createLargeObject();

// Track memory usage after creating the large object
const memoryAfterCreation = v8.getHeapStatistics().used_heap_size;
console.log('Memory After Creation:', memoryAfterCreation);

// Remove the reference to the large object
largeObject = null;

// Manually run garbage collection (optional, only for testing purposes)
global.gc();

// Track memory usage after removing the reference
const memoryAfterGC = v8.getHeapStatistics().used_heap_size;
console.log('Memory After GC:', memoryAfterGC);

// Output the difference in memory usage to check if the object was garbage collected
const memoryFreed = memoryAfterCreation - memoryAfterGC;
console.log('Memory Freed:', memoryFreed);
