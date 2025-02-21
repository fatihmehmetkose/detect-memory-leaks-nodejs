const express = require('express');
const expressMonitor = require('express-status-monitor');

const app = express();

app.use(expressMonitor());

const port = 3000;

const arrLeak = [];
app.get('/', (req, res) => {
	if (true) {
		const data = require('./largeData');
		arrLeak.push({ leak1: { ...data } });
	}
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`app is started on port ${port}...`);
});
